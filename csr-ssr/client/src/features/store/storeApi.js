import apiSlice from "../api/apiSlice";

const storeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // add new store
    createStore: builder.mutation({
      query: (data) => ({
        url: "api/store/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Store"],
    }),

    // get all stores
    displayStores: builder.query({
      query: ({ page, limit }) => ({
        url:
          page && limit
            ? `api/store/all?page=${page}&limit=${limit}`
            : `api/store/all`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),

    // get store
    displayStore: builder.query({
      query: (id) => ({
        url: `api/store/${id}`,
        method: "GET",
      }),
      providesTags: ["Store"],
    }),

    // update store
    updateStore: builder.mutation({
      query: ({ sid, storeData }) => ({
        url: `api/store/${sid}`,
        method: "PATCH",
        body: storeData,
      }),
      invalidatesTags: ["Store"],
    }),

    // delete store
    removeStore: builder.mutation({
      query: (id) => ({
        url: `api/store/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Store"],
    }),
  }),
});

export const {
  useCreateStoreMutation, // add new store
  useDisplayStoresQuery, // get all stores
  useDisplayStoreQuery, // get store
  useUpdateStoreMutation, // update store
  useRemoveStoreMutation, // delete store
} = storeApi;
