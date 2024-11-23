import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

const initialState = {
  products: [],
  product: {},
  detailProduct: {},
  isUpdated: false,
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {
    if (!id) return;
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    if (!id) return;
    await axios.delete(`${API_URL}/${id}`);
    return id;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const response = await axios.put(`${API_URL}/${product.id}`, product);
    return response.data;
  }
);

export const patchProduct = createAsyncThunk(
  "products/patchProduct",
  async (product) => {
    const response = await axios.patch(`${API_URL}/${product.id}`, {
      stock: product.stock,
    });
    return response.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    currentProduct: (state, action) => {
      state.isUpdated = true;
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch products
    builder.addCase(fetchProducts.pending),
      (state) => {
        (state.detailProduct = {}),
          (state.product = {}),
          (state.isLoading = true),
          (state.error = null);
      };
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Something went wrong";
    });

    // fetch product by id
    builder.addCase(fetchProductById.pending, (state) => {
      (state.detailProduct = {}),
        (state.product = {}),
        (state.isLoading = true),
        (state.error = null);
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.detailProduct = action.payload;
    });
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch product details";
    });

    //  add product
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });

    //  delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });

    //  update product
    builder.addCase(updateProduct.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isUpdated = false;
      state.error = null;
    });

    builder.addCase(updateProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isUpdated = false;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });

    //  patch product
    builder.addCase(patchProduct.pending, (state) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.error = null;
    });
    builder.addCase(patchProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(patchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default productSlice.reducer;
export const { currentProduct } = productSlice.actions;
