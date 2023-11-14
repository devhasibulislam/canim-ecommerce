/**
 * Title: Write a program using JavaScript on Footer
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
 * Date: 17, October 2023
 */

"use client";

import React from "react";
import Container from "./Container";
import { IoAccessibilityOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <Container className="">
      <footer className="rounded-xl">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex items-center justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © {year} Canim™ . All Rights Reserved.
          </span>

          <button
            className="border p-1.5 rounded-secondary focus:border-black"
            onClick={() => router.push("https://bento.me/devhasibulislam")}
          >
            <IoAccessibilityOutline className="h-5 w-5" />
          </button>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
