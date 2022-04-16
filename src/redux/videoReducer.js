
import { createSlice } from "@reduxjs/toolkit";

const initialState = { videos:[]};

const videoReducer = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideo:(state, action) => {
        state.videos = action.payload
    }
  },
});

export const { setVideo } = videoReducer.actions;
export default videoReducer.reducer;
