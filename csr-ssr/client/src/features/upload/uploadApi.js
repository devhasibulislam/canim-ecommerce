import apiSlice from "../api/apiSlice";
import { setGallery, setPhoto } from "./uploadSlice";

const uploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // single photo upload
    uploadPhoto: builder.mutation({
      query: ({ route, photo }) => ({
        url: `api/${route}`,
        method: "POST",
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

    // gallery photos upload
    uploadGallery: builder.mutation({
      query: (data) => ({
        url: `api/product/gallery`,
        method: "POST",
        body: data,
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

export const { useUploadPhotoMutation, useUploadGalleryMutation } = uploadApi;

/**
 * Uploading multiple files via formData using JavaScript
 * https://www.freecodecamp.org/news/formdata-explained/
 */
