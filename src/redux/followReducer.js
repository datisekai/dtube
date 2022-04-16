import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { followCount: 0, isFollow: false };

export const follow = createAsyncThunk("/follow/follow", async (userId) => {
  const res = await axios.put(`/auth/follow/${userId}`);
  return res.data.user;
});

export const unFollow = createAsyncThunk("/follow/unFollow", async (userId) => {
  const res = await axios.put(`/auth/unfollow/${userId}`);
  return res.data.user;
});

export const getFollow = createAsyncThunk(
  "/follow/getFollow",
  async ({ userId, id }) => {
    const res = await axios.get(`/auth/follow/${userId}`);
    return { follows: res.data.user.follows, id: id };
  }
);

const followReducer = createSlice({
  name: "follow",
  initialState,
  reducers: {
    resetFollow:(state, action) => {
      state.followCount = 0;
      state.isFollow = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFollow.fulfilled, (state, action) => {
      state.followCount = action.payload.follows.length;
      if (action.payload.follows.some((item) => item === action.payload.id)) {
        state.isFollow = true;
      }
    });
    builder.addCase(follow.pending, (state) => {
      state.followCount += 1;
      state.isFollow = true;
    });
    builder.addCase(follow.fulfilled, (state) => {
      state.isFollow = true;
    });
    builder.addCase(follow.rejected, (state) => {
      state.followCount -= 1;
      state.isFollow = false;
    });
    builder.addCase(unFollow.pending, (state) => {
      state.followCount -= 1;
      state.isFollow = false;
    });
    builder.addCase(unFollow.fulfilled, (state) => {
      state.isFollow = false;
    });
    builder.addCase(unFollow.rejected, (state) => {
      state.followCount += 1;
      state.isFollow = true;
    });
  },
});
export const {resetFollow} = followReducer.actions
export default followReducer.reducer;
