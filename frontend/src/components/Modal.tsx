import { ReactNode, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { MdClose } from 'react-icons/md';

export type ModalBaseProps = {
  children?: ReactNode;
  visible: boolean;
  onClose: () => void;
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
  border-radius: 1;
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
`;

const ModalFrame = styled.div<{ visible: boolean }>`
  display: flex;
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 1);
  padding: 16px;
  flex-direction: column;
  border-radius: 10px;
  ${(props) => modalSettings(props.visible)}
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const SearchInput = styled.input`
  outline: none;
`;

function Modal({ children, visible, onClose }: ModalBaseProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        <TitleDiv>
          <div>토큰 선택</div>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </TitleDiv>
        <div>{children}</div>
      </ModalFrame>
    </>
  );
}

export default Modal;
