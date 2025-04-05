import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/user.slice.js";
import categoriesSlice from "./slice/categories.slice.js";
export const store = configureStore({
  reducer: {
    userSlice,
    categoriesSlice,
  },
});
