import React, { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';

export type SwapProps = {
  modalOpen: boolean;
  openFunc: () => void;
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
`;

const Input = styled.input`
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: elipsis;
`;

const ArrowDown = styled(MdKeyboardArrowDown)``;

function Swap({ modalOpen, openFunc }: SwapProps) {
  const [inputVal, setInputVal] = useState('');
  return (
    <Container>
      {/* <input></input> */}
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
          }
        }}
        type="text"
        value={inputVal}
      ></Input>
      <ModalButton onClick={openFunc}>
        <span>코인</span>
        <ArrowDown />
      </ModalButton>
    </Container>
  );
}

export default Swap;
