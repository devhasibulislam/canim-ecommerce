import apiSlice from "../api/apiSlice";
import { setGallery, setPhoto } from "./updateSlice";

const updateApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // single photo update
    updatePhoto: builder.mutation({
      query: ({ public_id, photo, route }) => ({
        url: `api/${route}?public_id=${public_id}`,
        method: "PATCH",
        body: photo,
      }),
      invalidatesTags: ["Photo"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const photoData = await queryFulfilled;
          photoData.data.acknowledgement
            ? dispatch(
                setPhoto({
                  url: photoData.data.data.path,
                  public_id: photoData.data.data.filename,
                })
              )
            : console.log(photoData);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    // gallery photos update
    updateGallery: builder.mutation({
      query: ({ gallery, pid }) => ({
        url: `api/product/gallery?pid=${pid}`,
        method: "PATCH",
        body: gallery,
      }),
      invalidatesTags: ["Photo"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const galleryData = await queryFulfilled;
          const galleryInformation = [];

          for (let i = 0; i < galleryData.data.data.length; i++) {
            galleryInformation.push({
              url: galleryData.data.data[i].path,
              public_id: galleryData.data.data[i].filename,
            });
          }

          galleryData.data.acknowledgement
            ? dispatch(setGallery(galleryInformation))
            : console.log(galleryData);
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useUpdatePhotoMutation, useUpdateGalleryMutation } = updateApi;
