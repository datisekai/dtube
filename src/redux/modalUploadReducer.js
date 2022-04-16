
import { createSlice } from "@reduxjs/toolkit";

const initialState = { display:false};

const modalUploadReducer = createSlice({
  name: "modalUpload",
  initialState,
  reducers: {
   setDisplayModal:(state, action) => {
      state.display = action.payload;
   }
  },
});

export const { setDisplayModal } = modalUploadReducer.actions;
export default modalUploadReducer.reducer;
