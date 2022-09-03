import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { updateModal } from '../modules/slices/symbolSlice';
import styled, { css } from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { getDollarPrice } from '../apis/apis';
import {
  setFirstQuantity,
  setSecondQuantity,
} from '../modules/slices/priceSlice';

export type SwapProps = {
  openFunc: () => void; // modal 여는 함수
  modalInfo: (str: string) => void; // modal을 열 때 어느 쪽에서 열었는지 modal에 알려줌
  finish: boolean; // 환전할 수량 입력이 끝났는지 체크
  setFinish: (finished: boolean) => void; // finish 값 설정하는 useState 함수
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const ModalButton = styled.button`
  display: flex;
  flex-flow: row;
  align-items: center;
  border: none;
  border-radius: 15px;
  margin-left: 8px;
`;

const Input = styled.input`
  color: rgb(0, 0, 0);
  width: 0px;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 4px;
  appearance: textfield;

  &:hover {
    border: 1px solid rgb(0, 0, 0);
    border-radius: 16px;
  }
`;

const PriceDiv = styled.div<{ finished: boolean }>`
  padding: 0px 16px 0px 16px;
  margin-top: 16px;

  ${(props) =>
    !props.finished &&
    css`
      display: none;
    `}
`;

const ArrowDown = styled(MdKeyboardArrowDown)``;

function Swap({ openFunc, modalInfo, finish, setFinish }: SwapProps) {
  const [inputVal, setInputVal] = useState('');
  const [inputVal2, setInputVal2] = useState('');
  const [dollarPrice, setDollarPrice] = useState('');

  const { firstSymbol, secondSymbol } = useAppSelector((state) => state.symbol);
  const dispatch = useAppDispatch();

  return (
    <div style={{ padding: '16px' }}>
      <div>
        <Container>
          <Input
            placeholder="0.0"
            inputMode="decimal"
            pattern="^[0-9]*[.,]?[0-9]{0,10}$"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // 정규식으로 소수점 10자리 필터링
              const regexp = /^[0-9]*[.,]?[0-9]{0,10}$/g;
              const { value } = e.target;

              if (regexp.test(value)) {
                setInputVal(value);
                dispatch(setFirstQuantity(Number(value)));
              }
            }}
            onKeyUp={() => {
              // 현재 토큰을 바탕으로 상대 토큰의 가격 계산
              const res = getDollarPrice(
                Number(inputVal),
                firstSymbol,
                secondSymbol
              );
              const getData = () => {
                res
                  .then((appData) => {
                    console.log('success');
                    console.log(appData);
                    setDollarPrice(appData[0].toString());
                    setInputVal2(appData[1].toString());
                    setFinish(true);
                  })
                  .catch((err) => {
                    console.log('fail');
                    console.log(err);
                    setDollarPrice('');
                    setFinish(false);
                  });
              };

              getData();
            }}
            type="text"
            value={inputVal}
          ></Input>
          <ModalButton
            onClick={() => {
              openFunc();
              modalInfo('first');
              dispatch(updateModal(firstSymbol));
            }}
          >
            <span>{firstSymbol}</span>
            <ArrowDown />
          </ModalButton>
        </Container>
        {dollarPrice !== '' && (
          <div
            style={{
              padding: '0px 16px 0px 16px',
              color: 'rgb(180, 180, 180)',
            }}
          >
            {'$' + dollarPrice}
          </div>
        )}
      </div>
      <div>
        <Container>
          <Input
            placeholder="0.0"
            inputMode="decimal"
            pattern="^[0-9]*[.,]?[0-9]{0,10}$"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // 정규식으로 소수점 10자리 필터링
              const regexp = /^[0-9]*[.,]?[0-9]{0,10}$/g;
              const { value } = e.target;

              if (regexp.test(value)) {
                setInputVal2(value);
                dispatch(setSecondQuantity(Number(value)));
              }
            }}
            onKeyUp={() => {
              // 현재 토큰을 바탕으로 상대 토큰의 가격 계산
              const res = getDollarPrice(
                Number(inputVal2),
                secondSymbol,
                firstSymbol
              );
              const getData = () => {
                res
                  .then((appData) => {
                    console.log('success');
                    console.log(appData);
                    setDollarPrice(appData[0].toString());
                    setInputVal(appData[1].toString());
                    setFinish(true);
                  })
                  .catch((err) => {
                    console.log('fail');
                    console.log(err);
                    setFinish(false);
                  });
              };

              getData();
            }}
            type="text"
            value={inputVal2}
          ></Input>
          <ModalButton
            onClick={() => {
              openFunc();
              modalInfo('second');
              dispatch(updateModal(secondSymbol));
            }}
          >
            <span>{secondSymbol}</span>
            <ArrowDown />
          </ModalButton>
        </Container>
        {dollarPrice !== '' && (
          <div
            style={{
              padding: '0px 16px 0px 16px',
              color: 'rgb(180, 180, 180)',
            }}
          >
            {'$' + dollarPrice}
          </div>
        )}
      </div>
      <PriceDiv finished={finish}>
        <div>
          {`1 ${firstSymbol} = ${(Number(inputVal2) / Number(inputVal)).toFixed(
            10
          )} ${secondSymbol}`}
        </div>
      </PriceDiv>
    </div>
  );
}

export default Swap;
