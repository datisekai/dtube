
import { createSlice } from "@reduxjs/toolkit";

const initialState = { cache:{}};

const cacheReducer = createSlice({
  name: "cache",
  initialState,
  reducers: {
  saveCache:(state, action) => {
      state.cache = {...state.cache,[action.payload.url]:action.payload.cache};
  },
  deleteCache:(state, action) => {
    delete state.cache[action.payload];
  }
  },
});

export const { saveCache,deleteCache } = cacheReducer.actions;
export default cacheReducer.reducer;
