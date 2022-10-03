import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductDataService from "../services/product.service";

const initialState = [];

export const createProduct = createAsyncThunk(
  "Products/create",
  async ({ title, description }) => {
    const res = await ProductDataService.create({ title, description });
    return res.data;
  }
);

export const retrieveProducts = createAsyncThunk(
  "Products/retrieve",
  async () => {
    const res = await ProductDataService.getAll();
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "Products/update",
  async ({ id, data }) => {
    const res = await ProductDataService.update(id, data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "Products/delete",
  async ({ id }) => {
    await ProductDataService.delete(id);
    return { id };
  }
);

export const deleteAllProducts = createAsyncThunk(
  "Products/deleteAll",
  async () => {
    const res = await ProductDataService.deleteAll();
    return res.data;
  }
);

export const findProductsByTitle = createAsyncThunk(
  "Products/findByTitle",
  async ({ title }) => {
    const res = await ProductDataService.findByTitle(title);
    return res.data;
  }
);

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  extraReducers: {
    [createProduct.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [retrieveProducts.fulfilled]: (state, action) => {
      console.log(action.payload)
      return [...action.payload];
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.findIndex(Product => Product.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      let index = state.findIndex(({ id }) => id === action.payload.id);
      state.splice(index, 1);
    },
    [deleteAllProducts.fulfilled]: (state, action) => {
      return [];
    },
    [findProductsByTitle.fulfilled]: (state, action) => {
      return [...action.payload];
    },
  },
});

const { reducer } = ProductSlice;
export default reducer;
