/**
 * Title: Write a program using JavaScript on Dashboard
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

import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Down from "@/components/icons/Down";
import Link from "next/link";
import Logout from "@/components/icons/Logout";

const Dashboard = ({ children }) => {
  const user = useSelector((state) => state?.auth?.user);
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();

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
            name: "List Users",
            path: "/dashboard/admin/list-users",
          },
          {
            name: "Sellers Requests",
            path: "/dashboard/admin/seller-requests",
          },
        ],
      },
    ];
  }

  return (
    <main className="h-screen w-screen">
      <section className="max-w-5xl mx-auto h-full flex flex-col gap-y-2 p-2">
        <nav className="border px-4 py-2 rounded flex justify-between items-center flex-row">
          {showMenu ? (
            <button
              type="button"
              className="border p-1 rounded-secondary md:hidden"
              onClick={() => setShowMenu(!showMenu)}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className="border p-1 rounded-secondary md:hidden"
              onClick={() => setShowMenu(!showMenu)}
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
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          )}
          <div className="flex flex-col gap-y-0.5 md:items-start items-end">
            <h2 className="text-sm">{user?.name}</h2>
            <p className="text-xs">{user?.email}</p>
          </div>

          <button
            type="button"
            className="p-1 rounded-secondary border md:block hidden"
            title="Logout"
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.open("/", "_self");
            }}
          >
            <Logout />
          </button>
        </nav>

        <div className="grid grid-cols-12 gap-x-2 h-full relative">
          <Sidebar />
          <div className="md:col-span-8 col-span-12 overflow-y-auto rounded">
            {children}
          </div>

          {showMenu && (
            <div className="absolute top-0 left-0 h-full overflow-y-auto w-3/4 bg-white z-50">
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
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
