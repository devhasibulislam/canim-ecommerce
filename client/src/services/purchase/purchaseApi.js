/**
 * Title: Write a program using JavaScript on PurchaseApi
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
 * Date: 20, January 2024
 */

const { canimApi } = require("../canim");

const purchaseApi = canimApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPurchases: build.query({
      query: () => ({
        url: "/purchase/get-all-purchases",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["Purchase"],
    }),

    updatePurchaseStatus: build.mutation({
      query: ({ id, body }) => ({
        url: `/purchase/update-purchase-status/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Purchase", "User"],
    }),
  }),
});

export const { useGetAllPurchasesQuery, useUpdatePurchaseStatusMutation } =
  purchaseApi;
