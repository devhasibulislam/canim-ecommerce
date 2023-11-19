/**
 * Title: Write a program using JavaScript on PrivateRoute
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
 * Date: 20, November 2023
 */

import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, allowedRoles }) => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      router.push("/auth/signin");
    } else {
      if (!allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
    }
  }, [user, allowedRoles, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
