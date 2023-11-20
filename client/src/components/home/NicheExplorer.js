/**
 * Title: Write a program using JavaScript on NicheExplorer
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
 * Date: 15, October 2023
 */

"use client";

import React, { useEffect, useState } from "react";
import Container from "../shared/Container";
import Brand from "../icons/Brand";
import Category from "../icons/Category";
import Store from "../icons/Store";
import Image from "next/image";
import { BsBoxSeam } from "react-icons/bs";
import { RiShareBoxFill } from "react-icons/ri";
import { useGetStoresQuery } from "@/services/store/storeApi";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import Niche from "../shared/skeletonLoading/Niche";

const NicheExplorer = () => {
  const niches = [
    {
      title: "Brand",
      icon: <Brand />,
    },
    {
      title: "Category",
      icon: <Category />,
    },
    {
      title: "Store",
      icon: <Store />,
    },
  ];

  const [selectedNiche, setSelectedNiche] = useState("Category");

  const {
    data: brandsData,
    error: brandsError,
    isLoading: fetchingBrands,
  } = useGetBrandsQuery();
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: fetchingCategories,
  } = useGetCategoriesQuery();
  const {
    data: storesData,
    error: storesError,
    isLoading: fetchingStores,
  } = useGetStoresQuery();

  const brands = brandsData?.data || [];
  const categories = categoriesData?.data || [];
  const stores = storesData?.data || [];

  useEffect(() => {
    if (brandsError || categoriesError || storesError) {
      alert(
        brandsError?.data?.description ||
          categoriesError?.data?.description ||
          storesError?.data?.description
      );
    }
  }, [brandsError, categoriesError, storesError]);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl">
          Top Exploring. <span className="">By Niche</span>
        </h1>

        <div className="bg-neutral-100/70 rounded-primary lg:p-24 md:p-12 p-6 flex flex-col gap-y-12">
          <div className="flex flex-row justify-center gap-x-4 overflow-x-auto">
            <div className="flex flex-row justify-center gap-x-4 border p-1 rounded-secondary bg-white overflow-x-auto scrollbar-hide">
              {niches.map((niche, index) => (
                <button
                  key={index}
                  className={
                    "text-sm text-black flex flex-row items-center gap-x-1 px-8 py-2 rounded-secondary border border-transparent" +
                    " " +
                    (selectedNiche === niche.title ? "bg-black text-white" : "")
                  }
                  onClick={() => setSelectedNiche(niche.title)}
                >
                  {niche.icon}
                  {niche.title}
                </button>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {selectedNiche === "Brand" &&
              (fetchingBrands || brands?.length === 0 ? (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <Niche key={index} />
                  ))}
                </>
              ) : (
                <>
                  {brands?.slice(0, 6)?.map((brand, index) => (
                    <div
                      key={index}
                      className="group border p-4 rounded-primary flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative"
                    >
                      <Image
                        src={brand?.logo?.url}
                        alt={brand?.logo?.public_id}
                        width={50}
                        height={50}
                        className="rounded h-[50px] w-[50px] object-cover"
                      />

                      <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl">{brand?.title}</h2>
                        <p className="flex flex-row gap-x-1 items-center rounded-primary">
                          <BsBoxSeam />{" "}
                          <span className="group-hover:text-indigo-500 text-xs">
                            {brand?.products?.length} Products
                          </span>
                        </p>
                      </div>

                      <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
                        {brand.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </>
              ))}

            {selectedNiche === "Category" &&
              (fetchingCategories || categories?.length === 0 ? (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <Niche key={index} />
                  ))}
                </>
              ) : (
                <>
                  {categories?.slice(0, 6)?.map((category, index) => (
                    <div
                      key={index}
                      className="group border p-4 rounded-primary flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative"
                    >
                      <Image
                        src={category?.thumbnail?.url}
                        alt={category?.thumbnail?.public_id}
                        width={50}
                        height={50}
                        className="rounded h-[50px] w-[50px] object-cover"
                      />

                      <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl">{category?.title}</h2>
                        <p className="flex flex-row gap-x-1 items-center rounded-primary">
                          <BsBoxSeam />{" "}
                          <span className="group-hover:text-indigo-500 text-xs transition-colors">
                            {category?.products?.length} Products
                          </span>
                        </p>
                      </div>

                      <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
                        {category.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </>
              ))}

            {selectedNiche === "Store" &&
              (fetchingStores || stores?.length === 0 ? (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <Niche key={index} />
                  ))}
                </>
              ) : (
                <>
                  {stores?.slice(0, 6)?.map((store, index) => (
                    <div
                      key={index}
                      className="group border p-4 rounded-primary flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative"
                    >
                      <Image
                        src={store?.thumbnail?.url}
                        alt={store?.thumbnail?.public_id}
                        width={50}
                        height={50}
                        className="rounded h-[50px] w-[50px] object-cover"
                      />

                      <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl">{store?.title}</h2>
                        <p className="flex flex-row gap-x-1 items-center rounded-primary">
                          <BsBoxSeam />{" "}
                          <span className="group-hover:text-indigo-500 text-xs transition-colors">
                            {store?.products?.length} Products
                          </span>
                        </p>
                      </div>

                      <p className="flex flex-row gap-1 overflow-x-auto scrollbar-hide">
                        {store.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="border text-xs px-1 py-0.5 rounded whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  ))}
                </>
              ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default NicheExplorer;
