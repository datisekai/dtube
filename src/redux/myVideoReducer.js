
import { createSlice } from "@reduxjs/toolkit";

const initialState = { videos:[]};

const myVideoReducer = createSlice({
  name: "myVideo",
  initialState,
  reducers: {
    setVideo:(state, action) => {
        state.videos = action.payload
    }
  },
});

export const { setVideo } = myVideoReducer.actions;
export default myVideoReducer.reducer;
