
import { createSlice } from "@reduxjs/toolkit";

const initialState = { display:false, id:''};

const modalUpdateVideoReducer = createSlice({
  name: "modalUpdateVideo",
  initialState,
  reducers: {
   setDisplayUpdate:(state, action) => {
      state.display = action.payload;
   },
   setIdUpdate:(state, action) =>{
     state.id = action.payload;
   }
  },
});

export const { setDisplayUpdate,setIdUpdate } = modalUpdateVideoReducer.actions;
export default modalUpdateVideoReducer.reducer;
