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

import React, { useEffect, useMemo, useState } from "react";
import OutsideClick from "../OutsideClick";
import { BiCategory, BiChevronDown } from "react-icons/bi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CategoryCard from "../skeletonLoading/CategoryCard";
import { toast } from "react-hot-toast";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetStoresQuery } from "@/services/store/storeApi";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("categories");
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );
  const {
    isLoading: brandsLoading,
    error: brandsError,
    data: brandsData,
  } = useGetBrandsQuery();
  const brands = useMemo(() => brandsData?.data || [], [brandsData]);
  const {
    isLoading: storesLoading,
    data: storesData,
    error: storesError,
  } = useGetStoresQuery();
  const stores = useMemo(() => storesData?.data || [], [storesData]);

  const router = useRouter();

  useEffect(() => {
    if (categoriesError) {
      toast.error(categoriesError?.data?.description, {
        id: "categoriesData",
      });
    }

    if (brandsError) {
      toast.error(brandsError?.data?.description, {
        id: "brandsData",
      });
    }

    if (storesError) {
      toast.error(storesError?.data?.description, {
        id: "storesData",
      });
    }
  }, [categoriesError, brandsError, storesError]);

  return (
    <>
      <button
        className="border px-2.5 py-1.5 rounded flex flex-row items-center gap-x-0.5 hover:border-black transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <BiCategory className="h-6 w-6" />
        <BiChevronDown className="h-6 w-6" />
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full left-0 w-80 h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-4"
        >
          <section className="flex flex-col gap-y-4 h-full">
            <div className="flex flex-row gap-x-2">
              <button
                type="button"
                className={`text-xs px-2 py-1 border rounded ${
                  tab === "categories" ? "!bg-black !text-white" : ""
                }`}
                onClick={() => setTab("categories")}
              >
                Categories
              </button>
              <button
                type="button"
                className={`text-xs px-2 py-1 border rounded ${
                  tab === "brands" ? "!bg-black !text-white" : ""
                }`}
                onClick={() => setTab("brands")}
              >
                Brands
              </button>
              <button
                type="button"
                className={`text-xs px-2 py-1 border rounded ${
                  tab === "stores" ? "!bg-black !text-white" : ""
                }`}
                onClick={() => setTab("stores")}
              >
                Stores
              </button>
            </div>

            <div className="h-full overflow-y-auto scrollbar-hide">
              {tab === "categories" && (
                <>
                  {categoriesLoading || categories?.length === 0 ? (
                    <div className="flex flex-col gap-y-4">
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CategoryCard key={index} />
                      ))}
                    </div>
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
              {tab === "brands" && (
                <>
                  {brandsLoading || brands?.length === 0 ? (
                    <div className="flex flex-col gap-y-4">
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CategoryCard key={index} />
                      ))}
                    </div>
                  ) : (
                    <>
                      {brands.map((brand) => (
                        <div
                          key={brand?._id}
                          className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
                          onClick={() => {
                            router.push("/products/");
                            setIsOpen(false);
                          }}
                        >
                          <Image
                            src={brand?.logo?.url}
                            alt={brand?.logo?.public_id}
                            width={40}
                            height={40}
                            className="h-[40px] w-[40px] object-cover rounded"
                          />
                          <article className="whitespace-normal">
                            <h2 className="text-sm">{brand?.title}</h2>
                            <p className="text-xs line-clamp-2">
                              {brand?.description}
                            </p>
                            <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                              Products: {brand?.products?.length}
                            </span>
                          </article>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
              {tab === "stores" && (
                <>
                  {storesLoading || stores?.length === 0 ? (
                    <div className="flex flex-col gap-y-4">
                      {[1, 2, 3, 4, 5, 6].map((_, index) => (
                        <CategoryCard key={index} />
                      ))}
                    </div>
                  ) : (
                    <>
                      {stores.map((store) => (
                        <div
                          key={store?._id}
                          className="w-full flex flex-row items-start gap-x-2 p-2 border border-transparent hover:border-black rounded cursor-pointer"
                          onClick={() => {
                            router.push("/products/");
                            setIsOpen(false);
                          }}
                        >
                          <Image
                            src={store?.thumbnail?.url}
                            alt={store?.thumbnail?.public_id}
                            width={40}
                            height={40}
                            className="h-[40px] w-[40px] object-cover rounded"
                          />
                          <article className="whitespace-normal">
                            <h2 className="text-sm">{store?.title}</h2>
                            <p className="text-xs line-clamp-2">
                              {store?.description}
                            </p>
                            <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                              Products: {store?.products?.length}
                            </span>
                          </article>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          </section>
        </OutsideClick>
      )}
    </>
  );
};

export default Categories;
