import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleUpdateCart: (state, action) => {
      state.cart = action.payload;
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const index = state.cart.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        state.cart[index].quantity = quantity;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.productId !== productId);
    },
  },
});

export const { handleUpdateCart, updateQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
