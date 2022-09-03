import React, { useState } from 'react';
import './App.css';
import Title from './components/Title';
import Swap from './components/Swap';
import styled from 'styled-components';
import Modal from './components/Modal';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`;

const Flexbox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const Main = styled.div`
  padding: 0px 8px;
  max-width: 480px;
  width: 100%;
`;

const Button = styled.button`
  padding: 16px;
  width: 100%;
  outline: none;
  border: 1px solid transparent;
  text-align: center;
  border-radius: 10px;
`;

function App() {
  const [visible, setVisible] = useState(false);
  const [finish, setFinish] = useState(false);
  const [curModalSymbol, setCurModalSymbol] = useState('');

  return (
    <Container>
      <Flexbox>
        <Main>
          <Title />
          <Swap
            openFunc={() => {
              setVisible(!visible);
            }}
            modalInfo={setCurModalSymbol}
            finish={finish}
            setFinish={setFinish}
          />
          <div
            style={{
              padding: '16px',
            }}
          >
            {/* 금액 입력이 끝났을 때 버튼 활성화 */}
            <Button
              onClick={() => {
                alert('준비 중입니다.');
              }}
              disabled={!finish}
            >
              {finish ? '스왑' : '금액을 입력하세요'}
            </Button>
          </div>
          <Modal
            visible={visible}
            from={curModalSymbol}
            onClose={() => {
              setVisible(!visible);
            }}
          ></Modal>
        </Main>
      </Flexbox>
    </Container>
  );
}

export default App;
