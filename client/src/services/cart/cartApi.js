/**
 * Title: Write a program using JavaScript on CartApi
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
 * Date: 19, January 2024
 */

const { canimApi } = require("../canim");

const cartApi = canimApi.injectEndpoints({
  endpoints: (build) => ({
    // add to cart
    addToCart: build.mutation({
      query: (body) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Cart", "User"],
    }),

    // delete from cart
    deleteFromCart: build.mutation({
      query: (id) => ({
        url: `/cart/delete-cart/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Cart", "User"],
    }),
  }),
});

export const { useAddToCartMutation, useDeleteFromCartMutation } = cartApi;
