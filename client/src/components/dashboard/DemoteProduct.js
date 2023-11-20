/**
 * Title: Write a program using JavaScript on DemoteProduct
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

import { useUpdateProductMutation } from "@/services/product/productApi";
import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import Spinner from "../shared/Spinner";

const DemoteProduct = ({ product }) => {
  const [
    updateProduct,
    {
      isLoading: productUpdating,
      data: updateProductResponse,
      error: updateProductResponseError,
    },
  ] = useUpdateProductMutation();

  useEffect(() => {
    if (updateProductResponse) {
      alert(updateProductResponse?.description);
    }
    if (updateProductResponseError?.data) {
      alert(updateProductResponseError?.data?.description);
    }
  }, [updateProductResponse, updateProductResponseError]);

  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
      onClick={() =>
        updateProduct({ id: product?._id, body: { trashable: true } })
      }
    >
      {productUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteProduct;
