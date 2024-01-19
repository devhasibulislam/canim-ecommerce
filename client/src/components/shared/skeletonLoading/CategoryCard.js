/**
 * Title: Write a program using JavaScript on CategoryCard
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

const CategoryCard = () => {
  return (
    <section className="flex flex-row items-start gap-x-2.5 w-full">
      <div className="!h-8 !w-10 rounded bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-y-1 w-full">
        <div className="h-4 w-full rounded-secondary bg-gray-200 animate-pulse" />
        <div className="h-3 w-3/4 rounded-secondary bg-gray-200 animate-pulse" />
        <div className="h-2 w-1/2 rounded-secondary bg-gray-200 animate-pulse" />
      </div>
    </section>
  );
};

export default CategoryCard;
