import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { likeCount: 0, isLike: false, isDislike: false };

export const addlike = createAsyncThunk("/like/addlike", async (idVideo) => {
  const res = await axios.post(`/video/like/${idVideo}`);
  return res.data;
});

export const dislike = createAsyncThunk("/like/dislike", async (idVideo) => {
  const res = await axios.post(`/video/dislike/${idVideo}`);
  return res.data;
});

const likeReducer = createSlice({
  name: "like",
  initialState,
  reducers: {
    resetLike: (state, action) => {
      state.isLike = false;
    },
    setLike: (state, action) => {
      state.likeCount = action.payload;
    },
    setStateLike: (state, action) => {
      state.isLike = action.payload;
    },
    setStateDisLike: (state, action) => {
      state.isDislike = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addlike.pending, (state) => {
      if(!state.isDislike && !state.isLike) // chưa dislike, chưa like
      {
        state.isLike  = true;
        state.likeCount += 1;
      }else if(!state.isDislike && state.isLike) // chưa dislike, đã like
      {
        state.isLike = false;
        state.likeCount  -= 1;
      }else if(state.isDislike && !state.isLike) //  đã dislike, chưa like
      {
        state.isDislike = false;
        state.isLike = true;
        state.likeCount += 1;
      }
    });

    builder.addCase(dislike.pending, (state) => {
      if(!state.isDislike && !state.isLike)
      {
        state.isDislike = true;
      }else if(state.isDislike && !state.isLike){
        state.isDislike = false;
      }else if(!state.isDislike && state.isLike)
      {
        state.isDislike = true;
        state.isLike = false;
        state.likeCount -= 1;
      }
    });
  },
});
export const { resetLike, setLike, setStateLike, setStateDisLike } =
  likeReducer.actions;
export default likeReducer.reducer;
