import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Tạo action để fetch danh mục
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await axios.get("http://localhost:8397/api/v1/product-type");

    return res.data.metaData.items;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
