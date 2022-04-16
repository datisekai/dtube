
import { createSlice } from "@reduxjs/toolkit";

const initialState = { display:false};

const sidebarReducer = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
   setDisplaySidebar:(state, action) => {
       return {...state, display:action.payload}
   }
  },
});

export const { setDisplaySidebar } = sidebarReducer.actions;
export default sidebarReducer.reducer;
