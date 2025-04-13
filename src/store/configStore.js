import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice.js";
import categoriesSlice from "./slice/categories.slice.js";
import cartSlice from "./slice/cart.slice.js";

export const store = configureStore({
  reducer: {
    userSlice,
    categoriesSlice,
    cartSlice,
  },
});

store.subscribe(() => {
  const { cart } = store.getState().cartSlice;
  localStorage.setItem("cart", JSON.stringify(cart));
});
