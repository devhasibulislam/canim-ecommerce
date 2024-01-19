/**
 * Title: Write a program using JavaScript on Page
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
 * Date: 14, January 2024
 */

"use client";

import Inform from "@/components/icons/Inform";
import Dashboard from "@/components/shared/layouts/Dashboard";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Dashboard>
      {user?.reviews?.length === 0 ? (
        <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
          <Inform /> Not Yet Reviewed any Products!
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {user?.reviews?.map((review) => (
            <div className="flex flex-col gap-y-4 border p-2 rounded h-40">
              <div className="flex flex-row items-center justify-between">
                <Image
                  src={review?.product?.thumbnail?.url}
                  alt={review?.product?.thumbnail?.public_id}
                  height={30}
                  width={30}
                  className="w-[30px] h-[30px] rounded-full object-cover"
                />
                <span className="text-xs">⭐ {review?.rating}</span>
              </div>
              <div className="h-full flex flex-col gap-y-1.5 overflow-y-auto scrollbar-hide">
                <p className="font-semibold text-xs">
                  {review?.product?.title}
                </p>
                <p className="text-xs">{review?.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Dashboard>
  );
};

export default Page;
