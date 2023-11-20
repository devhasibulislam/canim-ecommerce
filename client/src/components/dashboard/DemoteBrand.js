/**
 * Title: Write a program using JavaScript on DemoteBrand
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

import React, { useEffect } from "react";
import Trash from "../icons/Trash";
import { useUpdateBrandMutation } from "@/services/brand/brandApi";
import Spinner from "../shared/Spinner";

const DemoteBrand = ({ brand }) => {
  const [
    updateBrand,
    {
      isLoading: brandUpdating,
      data: updateBrandResponse,
      error: updateBrandResponseError,
    },
  ] = useUpdateBrandMutation();

  useEffect(() => {
    if (updateBrandResponse) {
      alert(updateBrandResponse?.description);
    }
    if (updateBrandResponseError?.data) {
      alert(updateBrandResponseError?.data?.description);
    }
  }, [updateBrandResponse, updateBrandResponseError]);

  return (
    <button
      className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
      onClick={() => updateBrand({ id: brand?._id, body: { trashable: true } })}
    >
      {brandUpdating ? <Spinner /> : <Trash />}
    </button>
  );
};

export default DemoteBrand;
