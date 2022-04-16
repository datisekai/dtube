
import { createSlice } from "@reduxjs/toolkit";

const initialState = { display:false};

const modalProfileReducer = createSlice({
  name: "modalProfile",
  initialState,
  reducers: {
   setDisPlayProfile:(state, action) => {
      state.display = action.payload;
   }
  },
});

export const { setDisPlayProfile } = modalProfileReducer.actions;
export default modalProfileReducer.reducer;
