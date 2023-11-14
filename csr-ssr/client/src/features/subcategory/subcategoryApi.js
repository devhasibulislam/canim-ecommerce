import apiSlice from "../api/apiSlice";

const subcategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({  
    // add new subcategory
    createSubcategory: builder.mutation({
      query: (data) => ({
        url: "api/subcategory/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    // get all subcategories
    displaySubcategories: builder.query({
      query: ({ page, limit }) => ({
        url:
          page && limit
            ? `api/subcategory/all?page=${page}&limit=${limit}`
            : `api/subcategory/all`,
        method: "GET",
      }),
      providesTags: ["Subcategory"],
    }),

    // get subcategory
    displaySubcategory: builder.query({
      query: (id) => ({
        url: `api/subcategory/${id}`,
        method: "GET",
      }),
      providesTags: ["Subcategory"],
    }),

    // update subcategory
    updateSubcategory: builder.mutation({
      query: ({ sid, subcategoryData }) => ({
        url: `api/subcategory/${sid}`,
        method: "PATCH",
        body: subcategoryData,
      }),
      invalidatesTags: ["Subcategory"],
    }),

    // delete subcategory
    removeSubcategory: builder.mutation({
      query: (id) => ({
        url: `api/subcategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subcategory"],
    }),
  }),
});

export const {
  useCreateSubcategoryMutation,
  useDisplaySubcategoriesQuery,
  useDisplaySubcategoryQuery,
  useUpdateSubcategoryMutation,
  useRemoveSubcategoryMutation,
} = subcategoryApi;
