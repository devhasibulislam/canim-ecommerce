/**
 * Title: Write a program using JavaScript on UserApi
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
 * Date: 12, November 2023
 */

const { cisecoApi } = require("../ciseco");

const userApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all users
    getUsers: builder.query({
      query: () => ({
        url: "/user/list-users",
        method: "GET",
      }),

      providesTags: ["User"],
    }),

    // update user
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/update-user/${id}`,
        method: "PATCH",
        body,
      }),

      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery, useUpdateUserMutation } = userApi;
