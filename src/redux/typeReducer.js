import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { type: [], loading: false };

export const getType = createAsyncThunk("/type/getType", async () => {
  const data = await axios.get("/type/");
  return data.data.type;
});

const typeReducer = createSlice({
  name: "type",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getType.fulfilled, (state, action) => {
      state.type = action.payload;
      state.loading = false;
    });
    builder.addCase(getType.rejected, (state) => {
      console.log(1);
      state.loading = false;
    });
  },
});

export default typeReducer.reducer;
