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
 * Date: 10, November 2023
 */

"use client";

import DemoteCategory from "@/components/dashboard/DemoteCategory";
import Pencil from "@/components/icons/Pencil";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ListCategories = () => {
  const {
    data: categoriesData,
    isError: categoriesError,
    isLoading,
  } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];
  const router = useRouter();

  useEffect(() => {
    if (categoriesError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [categoriesError]);

  return (
    <Dashboard>
      {isLoading || categories?.length === 0 ? (
        <DashboardLading />
      ) : (
        <div className="w-full grid grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category?._id}
              className="flex flex-col gap-y-2 border p-4 rounded relative"
            >
              <Image
                src={category?.thumbnail?.url}
                alt={category?.thumbnail?.public_id}
                height={30}
                width={50}
                className="rounded h-[30px] w-[50px] object-cover"
              />
              <article className="flex flex-col gap-y-1">
                <h2 className="">{category?.title}</h2>
                <p className="text-xs line-clamp-2 mb-1.5">
                  {category?.description}
                </p>
                <p className="text-xs flex flex-row flex-wrap gap-2">
                  {category?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-purple-100/50 border border-purple-500 text-purple-500 px-1 rounded"
                    >
                      {`#${tag}`}
                    </span>
                  ))}
                  <span className="!text-xs bg-indigo-100/50 border border-indigo-500 text-indigo-500 rounded w-fit px-2">
                    {category?.products?.length} Products
                  </span>
                </p>
              </article>

              <div className="absolute top-2 right-2 flex flex-row gap-x-2">
                {!category?.trashable && <DemoteCategory category={category} />}
                <button
                  className="bg-green-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
                  onClick={() =>
                    router.push(`/dashboard/list-categories/${category?._id}`)
                  }
                >
                  <Pencil />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Dashboard>
  );
};

export default ListCategories;
