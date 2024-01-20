/**
 * Title: Write a program using JavaScript on Sidebar
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
 * Date: 09, November 2023
 */

"use client";

import React from "react";
import Down from "../icons/Down";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const pathname = usePathname();
  const user = useSelector((state) => state.auth.user);

  let routes = [];

  if (user?.role === "buyer") {
    routes = [
      {
        name: "My Profile",
        paths: [
          {
            name: "View Profile",
            path: "/dashboard/buyer/my-profile",
          },
          {
            name: "View Purchases",
            path: "/dashboard/buyer/my-purchases",
          },
        ],
      },
      {
        name: "My Cart",
        paths: [
          {
            name: "View Cart",
            path: "/dashboard/buyer/my-cart",
          },
          {
            name: "View Wishlist",
            path: "/dashboard/buyer/my-wishlist",
          },
        ],
      },
      {
        name: "My Reviews",
        paths: [
          {
            name: "View Reviews",
            path: "/dashboard/buyer/my-reviews",
          },
        ],
      },
    ];
  }

  if (user?.role === "seller") {
    routes = [
      {
        name: "My Profile",
        paths: [
          {
            name: "View Profile",
            path: "/dashboard/seller/my-profile",
          },
        ],
      },
      {
        name: "My Assets",
        paths: [
          {
            name: "View brand",
            path: "/dashboard/seller/my-brand",
          },
          {
            name: "View Category",
            path: "/dashboard/seller/my-category",
          },
          {
            name: "View Store",
            path: "/dashboard/seller/my-store",
          },
        ],
      },
      {
        name: "My Products",
        paths: [
          {
            name: "Add Product",
            path: "/dashboard/seller/add-product",
          },
          {
            name: "List Products",
            path: "/dashboard/seller/list-products",
          },
        ],
      },
    ];
  }

  if (user?.role === "admin") {
    routes = [
      {
        name: "Retail Landscape",
        paths: [
          {
            name: "List Brands",
            path: "/dashboard/admin/list-brands",
          },
          {
            name: "List Categories",
            path: "/dashboard/admin/list-categories",
          },
          {
            name: "List Stores",
            path: "/dashboard/admin/list-stores",
          },
          {
            name: "List Products",
            path: "/dashboard/admin/list-products",
          },
        ],
      },
      {
        name: "Account Features",
        paths: [
          {
            name: "List Favorites",
            path: "/dashboard/admin/list-favorites",
          },
          {
            name: "List Cart",
            path: "/dashboard/admin/list-cart",
          },
          {
            name: "List Purchases",
            path: "/dashboard/admin/list-purchases",
          },
        ],
      },
      {
        name: "Account Manager",
        paths: [
          {
            name: "List Buyers",
            path: "/dashboard/admin/list-buyers",
          },
          {
            name: "List Sellers",
            path: "/dashboard/admin/list-sellers",
          },
          {
            name: "List Admins",
            path: "/dashboard/admin/list-admins",
          },
        ],
      },
      {
        name: "Additional Options",
        paths: [
          {
            name: "My Profile",
            path: "/dashboard/admin/my-profile",
          },
          {
            name: "Seller Requests",
            path: "/dashboard/admin/my-profile",
          },
          {
            name: "List Reviews",
            path: "/dashboard/admin/list-reviews",
          },
          {
            name: "List Purchases",
            path: "/dashboard/admin/list-purchases",
          },
        ]
      }
    ];
  }

  return (
    <section className="lg:col-span-3 md:col-span-4 col-span-12 overflow-hidden bg-white z-50 min-w-full max-w-lg px-2 overflow-y-auto md:block hidden">
      <div className="w-full h-full flex flex-col gap-y-4">
        {routes.map((route, index) => (
          <div
            key={index}
            className="bg-slate-50/50 p-2 rounded flex flex-col gap-y-2"
          >
            <h2 className="flex flex-row justify-between items-center">
              {route.name} <Down />
            </h2>

            <div className="flex flex-col gap-y-2 text-sm p-2 bg-slate-100/50 rounded">
              {route.paths.map((path, index) => (
                <Link
                  href={path.path}
                  key={index}
                  className={
                    "p-1 rounded flex flex-row gap-x-2" +
                    " " +
                    (pathname === path.path
                      ? "bg-purple-500 text-white"
                      : "bg-slate-200/50 text-black")
                  }
                >
                  <span></span>
                  {path.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <Link
          href="/"
          className="text-sm bg-slate-50/50 p-2 rounded mt-auto flex flex-row gap-x-1 items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default Sidebar;
