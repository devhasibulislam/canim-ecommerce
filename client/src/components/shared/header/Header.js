/**
 * Title: Write a program using JavaScript on Header
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
import Container from "../Container";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Categories from "./Categories";
import Auth from "./Auth";
import Dashboard from "@/components/icons/Dashboard";
import SearchFilter from "./SearchFilter";
import MyCart from "./MyCart";

const Header = () => {
  const router = useRouter();

  return (
    <Container className="">
      <nav className="rounded-xl p-4 flex flex-row justify-between">
        <div className="flex flex-row gap-x-4 items-center relative">
          <Image
            src="/logo.png"
            alt="logo"
            width={141}
            height={40}
            className="h-[40px] object-contain md:block hidden cursor-pointer"
            onClick={() => router.push("/")}
          />

          <div className="border-l h-7 rounded" />

          <Categories />
        </div>
        <div className="flex flex-row gap-x-2 relative">
          <button
            className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
            onClick={() => router.push("/dashboard")}
          >
            <Dashboard className="h-6 w-6" />
          </button>
          <SearchFilter />
          <Auth />
          <MyCart />
        </div>
      </nav>
    </Container>
  );
};

export default Header;
