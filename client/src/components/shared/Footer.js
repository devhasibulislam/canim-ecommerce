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
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();
  const year = new Date().getFullYear();

  return (
    <Container className="">
      <footer className="bg-slate-50 rounded-xl shadow my-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Image
                src="/logo.png"
                alt="logo"
                width={141}
                height={40}
                className="h-[40px] object-contain md:block hidden cursor-pointer"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap sr-only">
                Canim eCommerce
              </span>
            </Link>
            <button
              className="border p-1.5 rounded-secondary focus:border-black"
              onClick={() => router.push("https://bento.me/devhasibulislam")}
            >
              <IoAccessibilityOutline className="h-5 w-5" />
            </button>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto" />
          <span className="block text-sm text-gray-500 sm:text-center">
            © {year}{" "}
            <Link href="/" className="hover:underline">
              Canim eCommerce™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </Container>
  );
};

export default Footer;
