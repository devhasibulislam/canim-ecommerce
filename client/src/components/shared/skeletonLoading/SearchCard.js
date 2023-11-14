/**
 * Title: Write a program using JavaScript on SearchCard
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

import React from "react";

const SearchCard = () => {
  return (
    <section className="flex flex-row gap-x-2 w-full">
      <div className="h-[50px] w-[50px] rounded bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-y-2.5 w-full">
        <div className="h-5 w-full rounded-secondary bg-gray-200 animate-pulse" />
        <div className="h-3 w-1/2 rounded-secondary bg-gray-200 animate-pulse" />
        <div className="h-3 w-28 rounded-secondary bg-gray-200 animate-pulse" />
      </div>
    </section>
  );
};

export default SearchCard;
