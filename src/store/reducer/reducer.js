import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    user: null,
    expenses:[],
    budgets:[],
    categories:[]
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    addExpense: (state,action) => {
      state.expenses = [...state.expenses,action.payload];
    },
    addCategories: (state,action) => {
      state.categories = [...state.categories,action.payload];
    },
    setBudget: (state,action) => {
      state.budgets = action.payload;
    },
  },
});

export const {
  
  addUserInfo,
  logout,
  addExpense,
  setBudget,
  addCategories
  
} = generalSlice.actions;

export default generalSlice.reducer;
