/**
 * Title: Write a program using JavaScript on Categories
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

import React, { useEffect, useState } from "react";
import OutsideClick from "../OutsideClick";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CategoryCard from "../skeletonLoading/CategoryCard";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const categories = categoriesData?.data || [];
  const router = useRouter();

  useEffect(() => {
    if (categoriesError) {
      alert(categoriesError?.data?.description);
    }
  }, [categoriesError]);

  return (
    <>
      <button
        className="border px-2.5 py-1.5 rounded-primary flex flex-row items-center gap-x-0.5 hover:border-black transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiCategory className="h-6 w-6" />
        <BiChevronDown className="h-6 w-6" />
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full left-0 w-80 max-h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-2.5"
        >
          {categories?.length === 0 ? (
            <>No Categories Found!</>
          ) : (
            <>
              {categoriesLoading ? (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <CategoryCard key={index} />
                  ))}
                </>
              ) : (
                <>
                  {categories.map((category) => (
                    <div
                      key={category?._id}
                      className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
                      onClick={() => {
                        router.push("/products/");
                        setIsOpen(false);
                      }}
                    >
                      <Image
                        src={category?.thumbnail?.url}
                        alt={category?.thumbnail?.public_id}
                        width={40}
                        height={40}
                        className="h-[40px] w-[40px] object-cover rounded"
                      />
                      <article className="whitespace-normal">
                        <h2 className="text-sm">{category?.title}</h2>
                        <p className="text-xs line-clamp-2">
                          {category?.description}
                        </p>
                        <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                          Products: {category?.products?.length}
                        </span>
                      </article>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </OutsideClick>
      )}
    </>
  );
};

export default Categories;
