/**
 * Title: Write a program using JavaScript on UserUpdate
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

import { useUpdateUserMutation } from "@/services/user/userApi";
import React, { useEffect } from "react";
import Spinner from "../shared/Spinner";
import User from "../icons/User";

const UserUpdate = ({ user }) => {
  const [
    updateUser,
    {
      isLoading: userUpdating,
      data: updateUserResponse,
      isError: updateUserResponseError,
    },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (updateUserResponse) {
      alert(updateUserResponse?.description);
    }
    if (updateUserResponseError?.data) {
      alert(updateUserResponseError?.data?.description);
    }
  }, [updateUserResponse, updateUserResponseError]);

  return (
    <button
      className="bg-red-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
      onClick={() =>
        updateUser({
          id: user?._id,
          body: {
            role:
              (user?.role === "buyer" && "seller") ||
              (user?.role === "seller" && "admin"),
          },
        })
      }
    >
      {(user?.role === "buyer" || user?.role === "seller") &&
        (userUpdating ? <Spinner /> : <User />)}
    </button>
  );
};

export default UserUpdate;
