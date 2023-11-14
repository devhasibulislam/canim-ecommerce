/**
 * Title: Write a program using JavaScript on AppWrapper
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
 * Date: 14, November 2023
 */

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addUser } from "@/features/auth/authSlice";

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData, isError: userError } = usePersistLoginQuery();
  const user = userData?.data || {};

  useEffect(() => {
    if (!userError) {
      dispatch(addUser(user));
    }
  }, [userData, userError]);

  return <>{children}</>;
};

export default AppWrapper;
