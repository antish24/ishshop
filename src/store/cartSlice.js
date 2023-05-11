import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: []
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    incrementCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    decrementCart: (state, action) => {
      const indexToDelete = state.cartItems.findIndex((item) => item.name === action.payload);
      state.cartItems.splice(indexToDelete, 1);
    }
  }
});

export const { incrementCart, decrementCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
