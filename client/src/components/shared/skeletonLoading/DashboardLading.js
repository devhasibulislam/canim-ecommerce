/**
 * Title: Write a program using JavaScript on DashboardLading
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

import Image from "next/image";
import React from "react";

const DashboardLading = () => {
  return (
    <section className="!h-full !w-full flex justify-center items-center">
      <Image
        src="/loading.gif"
        alt="loading"
        height={540}
        width={960}
        className="max-w-full"
      />
    </section>
  );
};

export default DashboardLading;
