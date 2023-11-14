import apiSlice from "../api/apiSlice";

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new brand
    createBrand: builder.mutation({
      query: (data) => ({
        url: "api/brand/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brand"],
    }),

    // get all brands
    displayBrands: builder.query({
      query: ({ page, limit }) => ({
        url:
          page && limit
            ? `api/brand/all?page=${page}&limit=${limit}`
            : `api/brand/all`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    // get brand
    displayBrand: builder.query({
      query: (id) => ({
        url: `api/brand/${id}`,
        method: "GET",
      }),
      providesTags: ["Brand"],
    }),

    // update brand
    updateBrand: builder.mutation({
      query: ({ bid, brandData }) => ({
        url: `api/brand/${bid}`,
        method: "PATCH",
        body: brandData,
      }),
      invalidatesTags: ["Brand"],
    }),

    // delete brand
    removeBrand: builder.mutation({
      query: (id) => ({
        url: `api/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useDisplayBrandsQuery,
  useDisplayBrandQuery,
  useUpdateBrandMutation,
  useRemoveBrandMutation,
} = brandApi;
