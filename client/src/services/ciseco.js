/**
 * Title: Write a program using JavaScript on Ciseco
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cisecoApi = createApi({
  reducerPath: "cisecoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.API_ENDPOINT}`,
  }),
  tagTypes: ["User", "Product", "Brand", "Category", "Store"],
  endpoints: () => ({}),
});
