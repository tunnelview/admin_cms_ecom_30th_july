import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
};
const paymentMethodSlice = createSlice({
  name: "paymentSlice",
  initialState,
  reducers: {
    setPaymentMethods: (state, { payload }) => {
      state.paymentMethods = payload;
    },
  },
});

const { reducer, actions } = paymentMethodSlice;

export const { setPaymentMethods } = actions;

export default reducer;
