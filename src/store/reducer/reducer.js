import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    user: null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const {
  
  addUserInfo,
  logout,
  
} = generalSlice.actions;

export default generalSlice.reducer;
