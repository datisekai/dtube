import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isSaveVideo:false };

export const saveVideo = createAsyncThunk('/saveVideo/saveVideo',async(idVideo) => {
    const res = await axios.get(`/auth/save/${idVideo}`);
    return res.data;
})

const saveVideoReducer = createSlice({
  name: "saveVideo",
  initialState,
  reducers: {
    resetSaveVideo:(state, action) => {
      state.isSaveVideo = false;
    },
    setSaveVideo:(state, action) => {
      state.isSaveVideo = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(saveVideo.pending,state => {
        state.isSaveVideo = !state.isSaveVideo;
    })
    builder.addCase(saveVideo.rejected,state => {
        state.isSaveVideo = false;
    })
  },
});
export const {resetSaveVideo, setSaveVideo} = saveVideoReducer.actions
export default saveVideoReducer.reducer;
