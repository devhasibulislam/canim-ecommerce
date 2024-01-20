/**
 * Title: Write a program using JavaScript on PurchaseSlice
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
  purchases: [],
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setPurchases: (state, action) => {
      state.purchases = action.payload;
    },
  },
});

export const { setPurchases } = purchaseSlice.actions;
export default purchaseSlice.reducer;
