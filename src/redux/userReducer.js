import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { user: undefined, loading: false };

export const getUser = createAsyncThunk("/user/getUser", async () => {
  const res = await axios.get("/auth/user");
  return res.data.user;
});

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem("token");
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
  },
});
export const { logout } = userReducer.actions;
export default userReducer.reducer;
