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
 * Date: 08, November 2023
 */

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "@/components/shared/Spinner";
import Link from "next/link";
import { useSigninMutation } from "@/services/auth/authApi";

const Signin = () => {
  const router = useRouter();
  const [signin, { isLoading, data, error }] = useSigninMutation();

  useEffect(() => {
    if (data) {
      localStorage.setItem("accessToken", data?.accessToken);
      alert(data?.description);
      window.location.reload();
    }
    if (error?.data) {
      alert(error?.data?.description);
    }
  }, [data, error]);

  const handleSignin = async (e) => {
    e.preventDefault();

    signin({ email: e.target.email.value, password: e.target.password.value });
    e.target.reset();
  };

  return (
    <section className="w-screen h-screen flex justify-center items-center px-4">
      <div className="max-w-md w-full flex flex-col gap-y-4 border p-8 rounded-primary">
        <div className="flex flex-row items-center gap-x-2">
          <hr className="w-full" />
          <Image
            src="/logo.png"
            alt="logo"
            width={141}
            height={40}
            className="max-w-full cursor-pointer"
            onClick={() => router.push("/")}
          />
          <hr className="w-full" />
        </div>
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleSignin}
        >
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Email</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="i.e. devhasibulislam@gmail.com"
              className=""
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Password</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="i.e. Hasib@123"
              className=""
              required
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
          >
            {isLoading ? <Spinner /> : "Sign In"}
          </button>
        </form>
        <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
          <Link href="/auth/signup" className="">
            Sign Up
          </Link>
          <span className="h-4 border-l" />
          <Link href="/auth/forgot-password" className="">
            Forgot Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signin;
