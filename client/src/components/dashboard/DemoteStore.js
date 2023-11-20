/**
 * Title: Write a program using JavaScript on DemoteStore
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

"use client";

import { useUpdateStoreMutation } from "@/services/store/storeApi";
import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import Spinner from "../shared/Spinner";

const DemoteStore = ({ store }) => {
  const [
    updateStore,
    {
      isLoading: storeUpdating,
      data: updateStoreResponse,
      error: updateStoreResponseError,
    },
  ] = useUpdateStoreMutation();

  useEffect(() => {
    if (updateStoreResponse) {
      alert(updateStoreResponse?.description);
    }
    if (updateStoreResponseError?.data) {
      alert(updateStoreResponseError?.data?.description);
    }
  }, [updateStoreResponse, updateStoreResponseError]);

  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
      onClick={() => updateStore({ id: store?._id, body: { trashable: true } })}
    >
      {storeUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteStore;
