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

const { canimApi } = require("../canim");

const categoryApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new category
    addCategory: builder.mutation({
      query: (category) => ({
        url: "/category/add-category",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: category,
      }),

      invalidatesTags: ["Category", "User"],
    }),

    // get all categories
    getCategories: builder.query({
      query: () => ({
        url: "/category/get-categories",
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/category/update-category/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Category", "User"],
    }),

    // get a category
    getCategory: builder.query({
      query: (id) => ({
        url: `/category/get-category/${id}`,
        method: "GET",
      }),

      providesTags: ["Category"],
    }),

    // delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/delete-category/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Category", "User"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
