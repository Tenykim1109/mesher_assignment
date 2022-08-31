import React, { useState } from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowDown } from 'react-icons/md';

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

const ArrowDown = styled(MdKeyboardArrowDown)``;

function Swap() {
  return (
    <Container>
      <input></input>
      <ModalButton>
        <span>코인</span>
        <ArrowDown />
      </ModalButton>
    </Container>
  );
}

export default Swap;
