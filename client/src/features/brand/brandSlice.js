/**
 * Title: Write a program using JavaScript on BrandSlice
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
  brands: [],
  brand: {},
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    setBrands: (state, action) => {
      state.brands = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
  },
});

export const { setBrands, setBrand } = brandSlice.actions;
export default brandSlice.reducer;
