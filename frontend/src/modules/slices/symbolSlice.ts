import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token } from '../../data/Token';

const initialState = {
  firstSymbol: Token.DAI,
  secondSymbol: Token.USDC,
  modalSymbol: '',
};

export const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    updateFirst: (state, action: PayloadAction<string>) => {
      state.firstSymbol = action.payload as Token;
    },
    updateSecond: (state, action: PayloadAction<Token>) => {
      state.secondSymbol = action.payload;
    },
    updateModal: (state, action: PayloadAction<string>) => {
      state.modalSymbol = action.payload;
    },
  },
});

export const { updateFirst, updateSecond, updateModal } = symbolSlice.actions;
export default symbolSlice.reducer;
