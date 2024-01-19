/**
 * Title: Write a program using JavaScript on BrandApi
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
 * Date: 11, November 2023
 */

const { canimApi } = require("../canim");

const brandApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new brand
    addBrand: builder.mutation({
      query: (body) => ({
        url: "/brand/add-brand",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Brand", "User"],
    }),

    // get all brands
    getBrands: builder.query({
      query: () => ({
        url: "/brand/get-brands",
        method: "GET",
      }),

      providesTags: ["Brand"],
    }),

    // update brand
    updateBrand: builder.mutation({
      query: ({ id, body }) => ({
        url: `/brand/update-brand/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Brand", "User"],
    }),

    // get a brand
    getBrand: builder.query({
      query: (id) => ({
        url: `/brand/get-brand/${id}`,
        method: "GET",
      }),

      providesTags: ["Brand"],
    }),

    // delete a brand
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/delete-brand/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Brand", "User"],
    }),
  }),
});

export const {
  useAddBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
  useGetBrandQuery,
  useDeleteBrandMutation,
} = brandApi;
