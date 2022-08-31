import React from 'react';
import './App.css';
import Title from './components/Title';
import Swap from './components/Swap';
import styled from 'styled-components';

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
  return (
    <Container>
      <Flexbox>
        <Main>
          <Title></Title>
          <div
            style={{
              padding: '16px',
            }}
          >
            <Swap></Swap>
            <Swap></Swap>
          </div>
          <div>
            <Button>입력</Button>
          </div>
        </Main>
      </Flexbox>
    </Container>
  );
}

export default App;
