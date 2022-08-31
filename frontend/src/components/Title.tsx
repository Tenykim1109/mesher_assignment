import React from 'react';
import styled from 'styled-components';
import { TbSettings } from 'react-icons/tb';

const DIV = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  margin-top: 24px;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 1;
`;

const SettingsIcon = styled(TbSettings)`
  color: black;
`;

function Title() {
  return (
    <div>
      <DIV>
        <div>스왑</div>
        <Button
          onClick={() => {
            alert('준비 중입니다');
          }}
        >
          <SettingsIcon />
        </Button>
      </DIV>
    </div>
  );
}

export default Title;
