import React from 'react';
import styled from 'styled-components';
import { TbSettings } from 'react-icons/tb';

const DIV = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 1;
`;

const Zap = styled(TbSettings)`
  color: black;
`;

function Title() {
  return (
    <DIV>
      <p>스왑</p>
      <Button
        onClick={() => {
          alert('준비 중입니다');
        }}
      >
        <Zap />
      </Button>
    </DIV>
  );
}

export default Title;
