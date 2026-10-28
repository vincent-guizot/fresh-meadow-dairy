import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action) => {
      state.products.unshift(action.payload);
      state.loading = false;
    },
    updateProductInList: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
      state.loading = false;
    },
    removeProductFromList: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.loading = false;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearProductsError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProductsLoading,
  setProducts,
  setSelectedProduct,
  addProduct,
  updateProductInList,
  removeProductFromList,
  setProductsError,
  clearProductsError,
} = productSlice.actions;

export default productSlice.reducer;
