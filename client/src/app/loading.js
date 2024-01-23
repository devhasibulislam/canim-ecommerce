/**
 * Title: Write a program using JavaScript on Loading
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
 * Date: 09, October 2023
 */

import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <section className="fixed top-0 left-0 h-screen w-screen overflow-hidden flex justify-center items-center bg-white z-50">
      <Image
        src="/loading.gif"
        alt="loading"
        height={540}
        width={960}
        className="max-w-full h-[400px] w-full object-contain"
      />
    </section>
  );
};

export default Loading;
