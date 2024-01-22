/**
 * Title: Write a program using JavaScript on Signup
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

import Trash from "@/components/icons/Trash";
import Upload from "@/components/icons/Upload";
import Spinner from "@/components/shared/Spinner";
import { useSignUpMutation } from "@/services/auth/authApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Signup = () => {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [signup, { isLoading, data, error }] = useSignUpMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Signing up...", { id: "signup" });
    }

    if (data) {
      toast.success(data?.description, { id: "signup" });
      
      // open new tab
      setTimeout(() => {
        window.open("/auth/signin", "_self");
      }, 1000);
    }
    if (error?.data) {
      toast.error(error?.data?.description, { id: "signup" });
    }
  }, [isLoading, data, error, router]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (!avatarPreview) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);

    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);

    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,20}$/;

    if (!e.target.password.value.match(passwordRegex)) {
      alert(
        "Password must have at least 1 uppercase, 1 lowercase, 1 symbol, and 1 number. Password length should be between 8 and 20 characters."
      );
      return;
    }

    // Phone number validation regex
    const phoneRegex = /^\+88\d{11}$/;

    if (!e.target.phone.value.match(phoneRegex)) {
      alert(
        "Phone number must start with +88 and have a total length of 14 digits."
      );
      return;
    }

    formData.append("phone", e.target.phone.value);
    formData.append("password", e.target.password.value);

    signup(formData);

    e.target.reset();
    setAvatarPreview(null);
  };

  return (
    <section className="min-w-full min-h-screen flex justify-center items-center p-4">
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
          onSubmit={handleSignup}
        >
          <label
            htmlFor="avatar"
            className="flex flex-col gap-y-1 w-fit mx-auto items-center"
          >
            <div
              className={
                "h-[100px] w-[100px] rounded transition-colors flex flex-row justify-center items-center relative" +
                " " +
                (avatarPreview
                  ? ""
                  : "border-2 border-dashed hover:border-black")
              }
            >
              {avatarPreview ? (
                <div className="relative">
                  <Image
                    src={avatarPreview}
                    alt="avatar"
                    height={100}
                    width={100}
                    className="rounded h-[100px] w-[100px] object-cover"
                  />
                  <button
                    className="absolute bottom-0 -right-10 p-1 rounded bg-red-500 text-white shadow-2xl"
                    onClick={() => setAvatarPreview(null)}
                  >
                    <Trash />
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-xs flex flex-col justify-center items-center gap-y-2 text-center">
                    <Upload />
                    Add Avatar <br /> 300x300
                  </span>

                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    title="Dimension: 300x300"
                    accept=".jpg, .jpeg, .png"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleAvatarChange}
                    required
                  />
                </>
              )}
            </div>
          </label>
          <label htmlFor="name" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Name*</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="i.e. John Doe"
              className=""
              required
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Email*</span>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="i.e. example@gmail.com"
              className=""
              required
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Password*</span>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="i.e. Admin@123"
              className=""
              required
            />
          </label>
          <label htmlFor="phone" className="flex flex-col gap-y-1">
            <span className="text-sm">Enter Your Phone Number*</span>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="i.e. +8801906315901"
              className=""
              required
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm"
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
        <div className="flex flex-row justify-center items-center gap-x-2 text-xs">
          <Link href="/auth/signin" className="">
            Sign In
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

export default Signup;
