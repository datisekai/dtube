import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { user: {} };

export const getUserChannel = createAsyncThunk(
  "/userChannel/getUserChannel",
  async (id) => {
    const res = await axios.get(`/auth/user/${id}`);
    return res.data.user;
  }
);

const userChannelReducer = createSlice({
  name: "userChannel",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserChannel.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const {setUser} = userChannelReducer.actions
export default userChannelReducer.reducer;