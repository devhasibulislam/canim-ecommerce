/**
 * Title: Write a program using JavaScript on ProductFilterSlice
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
 * Date: 14, November 2023
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterCredentials: {},
};

const productFilter = createSlice({
  name: "productFilter",
  initialState,
  reducers: {
    addProductFilter: (state, { payload }) => {
      const [filterType, filterItems] = payload;
      state.filterCredentials = {
        ...state.filterCredentials,
        [filterType]: filterItems,
      };
    },

    clearProductFilter: (state) => {
      state.filterCredentials = {};
    },
  },
});

export const { addProductFilter, clearProductFilter } = productFilter.actions;
export default productFilter.reducer;
