/**
 * Title: Write a program using JavaScript on AuthApi
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
 * Date: 09, November 2023
 */

const { cisecoApi } = require("../ciseco");

const authApi = cisecoApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup
    signup: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signup",
        method: "POST",
        body: userInfo,
      }),

      invalidatesTags: ["User"],
    }),

    // signin
    signin: builder.mutation({
      query: (userInfo) => ({
        url: "/user/signin",
        method: "POST",
        body: userInfo,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/user/forgot-password",
        method: "PATCH",
        body: userInfo,
      }),
    }),

    // persist login
    persistLogin: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  usePersistLoginQuery,
} = authApi;
