import apiSlice from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new product
    createProduct: builder.mutation({
      query: (data) => ({
        url: "api/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // get all products
    displayProducts: builder.query({
      query: ({ page, limit }) => ({
        url: `api/product/all?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // get product
    displayProduct: builder.query({
      query: (id) => ({
        url: `api/product/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({pid, productData}) => ({
        url: `api/product/${pid}`,
        method: "PATCH",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    // delete product
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useDisplayProductsQuery,
  useDisplayProductQuery,
  useUpdateProductMutation,
  useRemoveProductMutation,
} = productApi;
