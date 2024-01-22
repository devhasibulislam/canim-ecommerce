/**
 * Title: Write a program using JavaScript on FilterSlice
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 22, January 2024
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  brand: null,
  store: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setStore: (state, action) => {
      state.store = action.payload;
    },

    clearFilter: (state) => {
      state.category = null;
      state.brand = null;
      state.store = null;
    },
  },
});

export const { setCategory, setBrand, setStore, clearFilter } =
  filterSlice.actions;
export default filterSlice.reducer;
