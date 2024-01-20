/**
 * Title: Write a program using JavaScript on Store
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
 * Date: 09, November 2023
 */

import { configureStore } from "@reduxjs/toolkit";
import { canimApi } from "../services/canim";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "@/features/auth/authSlice";
import productFilterSlice from "@/features/productFilter/productFilterSlice";
import brandSlice from "@/features/brand/brandSlice";
import productSlice from "@/features/product/productSlice";

export const store = configureStore({
  reducer: {
    [canimApi.reducerPath]: canimApi.reducer,
    auth: authSlice,
    brand: brandSlice,
    product: productSlice,
    productFilter: productFilterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(canimApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
