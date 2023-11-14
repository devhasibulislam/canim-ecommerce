/**
 * Title: Write a program using JavaScript on DemoteCategory
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

import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import Spinner from "../shared/Spinner";
import { useUpdateCategoryMutation } from "@/services/category/categoryApi";

const DemoteCategory = ({ category }) => {
  const [
    updateCategory,
    {
      isLoading: categoryUpdating,
      data: updateCategoryResponse,
      isError: updateCategoryResponseError,
    },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    if (updateCategoryResponse) {
      alert(updateCategoryResponse?.description);
    }
    if (updateCategoryResponseError?.data) {
      alert(updateCategoryResponseError?.data?.description);
    }
  }, [updateCategoryResponse, updateCategoryResponseError]);

  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
      onClick={() =>
        updateCategory({ id: category?._id, body: { trashable: true } })
      }
    >
      {categoryUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteCategory;
