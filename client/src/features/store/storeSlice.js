/**
 * Title: Write a program using JavaScript on StoreSlice
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
 * Date: 20, January 2024
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
  store: {},
};

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload;
    },
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStores, setStore } = storeSlice.actions;
export default storeSlice.reducer;
