/**
 * Title: Write a program using JavaScript on Auth
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

import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addUser } from "@/features/auth/authSlice";
import { toast } from "react-hot-toast";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const { data: userData, error: userError } = usePersistLoginQuery();
  const user = useMemo(() => userData?.data || {}, [userData]);

  useEffect(() => {
    if (userData && !userError) {
      toast.success(userData?.description, { id: "auth" });
      dispatch(addUser(user));
    }

    if (userError?.data) {
      toast.error(userError?.data?.description, { id: "auth" });
    }
  }, [userData, userError, dispatch, user]);

  return <>{children}</>;
};

export default Auth;
