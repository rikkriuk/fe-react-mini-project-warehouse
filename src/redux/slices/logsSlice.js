import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/logs";

const initialState = {
  logs: [],
  isLoading: false,
  error: null,
  isSuccess: false,
};

export const fetchLogs = createAsyncThunk(
  "logs/fetchLogs",
  async ({ product_id, type } = {}) => {
    const params = {};
    if (product_id) params.product_id = product_id;
    if (type) params.type = type;

    const response = await axios.get(API_URL, { params });
    return response.data;
  }
);

export const createLog = createAsyncThunk("logs/createLog", async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
});

const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // fetch logs
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logs = action.payload;
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });

    // create log
    builder
      .addCase(createLog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSuccess = false;
      })
      .addCase(createLog.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default logsSlice.reducer;
