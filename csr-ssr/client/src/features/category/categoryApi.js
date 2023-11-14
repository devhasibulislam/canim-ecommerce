import apiSlice from "../api/apiSlice";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "api/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // get all categories
    displayCategories: builder.query({
      query: ({ page, limit }) => ({
        url:
          page && limit
            ? `api/category/all?page=${page}&limit=${limit}`
            : `api/category/all`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // get category
    displayCategory: builder.query({
      query: (id) => ({
        url: `api/category/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    // update category
    updateCategory: builder.mutation({
      query: ({ cid, categoryData }) => ({
        url: `api/category/${cid}`,
        method: "PATCH",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
    }),

    // delete category
    removeCategory: builder.mutation({
      query: (id) => ({
        url: `api/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDisplayCategoriesQuery,
  useDisplayCategoryQuery,
  useUpdateCategoryMutation,
  useRemoveCategoryMutation,
} = categoryApi;
