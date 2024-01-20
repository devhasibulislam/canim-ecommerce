/**
 * Title: Write a program using JavaScript on FavoriteApi
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

const favoriteApi = canimApi.injectEndpoints({
  endpoints: (build) => ({
    addToFavorite: build.mutation({
      query: (body) => ({
        url: `/favorite/add-to-favorite`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Favorite", "User"],
    }),

    getFavorites: build.query({
      query: () => ({
        url: `/favorite/get-favorites`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Favorite"],
    }),

    removeFromFavorite: build.mutation({
      query: ({ id }) => ({
        url: `/favorite/delete-from-favorite/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Favorite", "User"],
    }),
  }),
});

export const {
  useAddToFavoriteMutation,
  useGetFavoritesQuery,
  useRemoveFromFavoriteMutation,
} = favoriteApi;
