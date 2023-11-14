/**
 * Title: Write a program using JavaScript on CategoryApi
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

const { cisecoApi } = require("../ciseco");

const categoryApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new category
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/category/add-category",
        method: "POST",
        body: category,
      }),
    }),

    // get all categories
    getCategories: builder.query({
      query: () => ({
        url: "/category/list-categories",
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["Category"],
    }),

    // get a category
    getCategory: builder.query({
      query: (id) => ({
        url: `/category/get-category/${id}`,
        method: "GET",
      }),

      providesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoryApi;
