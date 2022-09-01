import { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';
import { TokenList } from '../data/Token';
import { useAppDispatch, useAppSelector } from '../modules/store';
import { updateFirst, updateSecond } from '../modules/slices/symbolSlice';

export type ModalBaseProps = {
  visible: boolean;
  symbol: string;
  from: string; // 어느 컴포넌트에서 modal을 열었는지 확인
  onClose: () => void;
  setSymbol: (str: string) => void;
};

// css fade-in, fade-out 효과
const fadeIn = keyframes`
0% {
    opacity: 0;
}
100% {
    opacity: 1;
}`;

const fadeOut = keyframes`
0% {
    opacity: 1;
}
100% {
    opacity: 0;
}`;

const CloseIcon = styled(MdClose)``;

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 20px;

  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? 'visible' : 'hidden'};
  z-index: 15;
  animation: ${visible ? fadeIn : fadeOut} 0.15s ease-out;
  transition: visibility 0.15s ease-out;
`;

// modal 열었을 때 modal 외 다른 부분은 검게 처리
const Background = styled.div<{ visible: boolean }>`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  ${(props) => modalSettings(props.visible)}
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: ;
`;

const ModalFrame = styled.div<{ visible: boolean }>`
  display: flex;
  overflow: hidden;
  width: 400px;
  min-height: 80vh;
  max-height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  flex-direction: column;
  border-radius: 10px;
  ${(props) => modalSettings(props.visible)}
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 2rem;
  overflow: hidden auto;
  align-self: center;
  max-width: 420px;
  max-height: 80vh;
  min-height: 80vh;
`;

const GridFrame = styled.div`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 12px;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  display: flex;
  align-items: center;
  width: 100%;
  outline: none;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 16px;
  padding: 16px 16px 16px 40px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

const Chip = styled.div`
  display: flex;
  border: 1px solid rgb(225, 225, 225);
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  margin: 4px;

  &:hover {
    background-color: rgb(225, 225, 225);
  }
`;

const Borderline = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(225, 225, 225);
  margin: 0px 4px;
`;

const SymbolFrame = styled.div<{ same: boolean }>`
  padding: 4px 20px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);

  ${(props) =>
    !props.same &&
    css`
      cursor: pointer;
      &:hover {
        background-color: rgb(225, 225, 225);
      }
    `}
  gap: 16px;
  opacity: 1;
  height: 56px;
`;

const ButtonFrame = styled.div`
  border-radius: 0px 0px 20px 20px;
  padding: 20px;
  border-top: 1px solid rgb(225, 225, 225);
`;

const Button = styled.button`
  padding: 16px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;
  text-align: center;
  border-radius: 10px;
`;

function Modal({ visible, symbol, from, onClose, setSymbol }: ModalBaseProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { firstSymbol, secondSymbol, modalSymbol } = useAppSelector(
    (state) => state.symbol
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (visible) {
      setIsOpen(true);
    } else {
      timeoutId = setTimeout(() => setIsOpen(false), 150);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [visible]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Background visible={visible} onClick={onClose} />
      <ModalFrame visible={visible}>
        <ModalBody>
          <GridFrame style={{ padding: '20px' }}>
            <TitleDiv>
              <div>토큰 선택</div>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </TitleDiv>
            <SearchDiv>
              <SearchInput placeholder="이름 검색" />
            </SearchDiv>
            <GridFrame>
              <Wrapper>
                <Chip>
                  <div>ETP</div>
                </Chip>
                <Chip>
                  <div>ETP</div>
                </Chip>
              </Wrapper>
            </GridFrame>
          </GridFrame>
          <Borderline />
          <div style={{ flex: '1 1 0%', position: 'relative' }}>
            <div style={{ overflow: 'visible', height: '0px' }}>
              <div
                style={{
                  position: 'relative',
                  height: '500px',
                  width: '100%',
                  overflowX: 'hidden',
                  overflowY: 'scroll',
                  willChange: 'transform',
                  direction: 'ltr',
                }}
              >
                <div style={{ width: '100%' }}>
                  {TokenList.map((val, idx) => (
                    <SymbolFrame
                      key={idx}
                      tabIndex={0}
                      style={{ alignItems: 'center' }}
                      same={val === modalSymbol}
                      onClick={() => {
                        if (val !== modalSymbol) {
                          // from : modal을 오픈한 컴포넌트가 어디인지 파악하는 변수
                          switch (from) {
                            case 'first':
                              // 현재 선택한 토큰이 상대 토큰과 같다면 swap
                              if (val === secondSymbol) {
                                let tmp = val;
                                dispatch(updateSecond(firstSymbol));
                                dispatch(updateFirst(tmp));
                              } else {
                                dispatch(updateFirst(val));
                              }
                              break;
                            case 'second':
                              if (val === firstSymbol) {
                                let tmp = val;
                                dispatch(updateFirst(secondSymbol));
                                dispatch(updateSecond(tmp));
                              } else {
                                dispatch(updateSecond(val));
                              }
                              break;
                          }
                          onClose();
                        }
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>{val}</div>
                    </SymbolFrame>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <ButtonFrame>
            <Button
              onClick={() => {
                alert('준비 중입니다.');
              }}
            >
              토큰 목록 관리
            </Button>
          </ButtonFrame>
        </ModalBody>
      </ModalFrame>
    </>
  );
}

export default Modal;
