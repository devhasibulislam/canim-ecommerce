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
 * Date: 08, November 2023
 */

import Signup from "@/components/icons/Signup";
import Link from "next/link";
import React, { useState } from "react";
import OutsideClick from "../OutsideClick";
import User from "@/components/icons/User";
import Signin from "@/components/icons/Signin";
import ForgotPassword from "@/components/icons/ForgotPassword";
import Logout from "@/components/icons/Logout";
import { useSelector } from "react-redux";
import Image from "next/image";

const Auth = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <button
        className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User className="h-6 w-6" />
      </button>
      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full right-0 w-80 h-fit bg-white border rounded p-2 flex flex-col gap-y-2.5"
        >
          {Object.keys(user).length === 0 ? (
            <>
              <Link
                href="/auth/signup"
                className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
              >
                <span className="bg-sky-500/5 p-1 rounded">
                  <Signup />
                </span>
                <article className="whitespace-normal">
                  <h2 className="text-sm">Sign Up</h2>
                  <p className="text-xs">Register as a new user</p>
                </article>
              </Link>
              <Link
                href="/auth/signin"
                className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
              >
                <span className="bg-sky-500/5 p-1 rounded">
                  <Signin />
                </span>
                <article className="whitespace-normal">
                  <h2 className="text-sm">Sign In</h2>
                  <p className="text-xs">Login as an existing user</p>
                </article>
              </Link>
              <Link
                href="/auth/forgot-password"
                className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded"
              >
                <span className="bg-sky-500/5 p-1 rounded">
                  <ForgotPassword />
                </span>
                <article className="whitespace-normal">
                  <h2 className="text-sm">Forgot Password</h2>
                  <p className="text-xs">Reset your account credentials</p>
                </article>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-y-2">
              <div className="flex flex-row gap-x-2 p-2">
                <Image
                  src={user?.avatar?.url}
                  alt={user?.avatar?.public_id}
                  height={50}
                  width={50}
                  className="rounded object-cover h-[50px] w-[50px]"
                />
                <article className="grid grid-cols-1 gap-y-1">
                  <h2 className="line-clamp-1">{user?.name}</h2>
                  <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">{user?.email}</p>
                  <span className="text-xs border px-2 w-fit rounded">{user?.store?.title}</span>
                </article>
              </div>
              <hr />
              <div className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer">
                <span className="bg-sky-500/5 p-1 rounded">
                  <Logout />
                </span>
                <article
                  className="whitespace-nowrap"
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    window.location.reload();
                  }}
                >
                  <h2 className="text-sm">Logout</h2>
                  <p className="text-xs">Clear your current activities</p>
                </article>
              </div>
            </div>
          )}
        </OutsideClick>
      )}
    </>
  );
};

export default Auth;
