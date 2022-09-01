import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  firstQuantity: 0.0,
  firstPrice: 0.0,
  secondQuantity: 0.0,
  secondPrice: 0.0,
  finish: false,
};

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setFirstQuantity: (state, action: PayloadAction<number>) => {
      state.firstQuantity = action.payload;
    },
    setSecondQuantity: (state, action: PayloadAction<number>) => {
      state.secondQuantity = action.payload;
    },
    setFinish: (state) => {
      state.finish = !state.finish;
    },
  },
});

export const { setFirstQuantity, setSecondQuantity } = priceSlice.actions;
export default priceSlice.reducer;
