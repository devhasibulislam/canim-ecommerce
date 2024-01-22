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

import React, { useEffect, useMemo, useState } from "react";
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
import { toast } from "react-hot-toast";
import Modal from "../shared/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setBrand } from "@/features/brand/brandSlice";
import { setCategory } from "@/features/category/categorySlice";
import { setStore } from "@/features/store/storeSlice";

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
          {selectedNiche === "Brand" && <DisplayBrands />}
          {selectedNiche === "Category" && <DisplayCategories />}
          {selectedNiche === "Store" && <DisplayStores />}
        </div>
      </section>
    </Container>
  );
};

function DisplayBrands() {
  const {
    data: brandsData,
    error: brandsError,
    isLoading: fetchingBrands,
  } = useGetBrandsQuery();

  const brands = useMemo(() => brandsData?.data || [], [brandsData]);
  const [isOpen, setIsOpen] = useState();
  const dispatch = useDispatch();
  const brand = useSelector((state) => state.brand.brand);

  useEffect(() => {
    if (brandsError) {
      toast.error(brandsError?.data?.description, {
        id: "brands-data",
      });
    }
  }, [brandsError]);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {fetchingBrands || brands?.length === 0 ? (
          <>
            {[1, 2, 3].map((_, index) => (
              <Niche key={index} />
            ))}
          </>
        ) : (
          <>
            {brands?.slice(0, 6)?.map((brand, index) => (
              <div
                key={index}
                className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
                onClick={() => {
                  dispatch(setBrand(brand));
                  setIsOpen(true);
                }}
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
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-3/4 w-full h-96 overflow-y-auto scrollbar-hide"
        >
          <div className="h-full w-full flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1 items-center">
              <Image
                src={brand?.creator?.avatar?.url}
                alt={brand?.creator?.avatar?.public_id}
                width={50}
                height={50}
                className="rounded-full h-[50px] w-[50px] object-cover"
              />
              <h1 className="text-lg">{brand?.creator?.name}</h1>
              <p className="text-sm">{brand?.creator?.email}</p>
              <p className="text-xs">{brand?.creator?.phone}</p>
            </div>

            <hr />

            <div className="flex flex-col gap-y-2 w-full">
              {brand?.products?.map((product) => (
                <div
                  key={product?._id}
                  className="flex flex-row justify-between items-center bg-slate-50 rounded p-2 w-full"
                >
                  <div
                    className="flex flex-row gap-x-2 items-start cursor-pointer"
                    onClick={() =>
                      window.open(
                        `/product?product_id=${
                          product?._id
                        }&product_title=${product?.title
                          .replace(/ /g, "-")
                          .toLowerCase()}}`,
                        "_self"
                      )
                    }
                  >
                    <Image
                      src={product?.thumbnail?.url}
                      alt={product?.thumbnail?.public_id}
                      width={30}
                      height={30}
                      className="rounded-full h-[30px] w-[30px] object-cover"
                    />
                    <article className="flex flex-col gap-y-1">
                      <h2 className="text-base line-clamp-2">
                        {product?.title}
                      </h2>
                      <p className="text-xs line-clamp-3">
                        By {product?.summary}
                      </p>
                      <span className="text-sm mt-2 bg-teal-100 border-teal-900 text-teal-950 rounded-secondary w-fit px-2">
                        ${product?.price}
                      </span>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function DisplayCategories() {
  const {
    data: categoriesData,
    error: categoriesError,
    isLoading: fetchingCategories,
  } = useGetCategoriesQuery();

  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData]
  );
  const [isOpen, setIsOpen] = useState();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    if (categoriesError) {
      toast.error(categoriesError?.data?.description, {
        id: "categories-data",
      });
    }
  }, [categoriesError]);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {fetchingCategories || categories?.length === 0 ? (
          <>
            {[1, 2, 3].map((_, index) => (
              <Niche key={index} />
            ))}
          </>
        ) : (
          <>
            {categories?.slice(0, 6)?.map((category, index) => (
              <div
                key={index}
                className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
                onClick={() => {
                  dispatch(setCategory(category));
                  setIsOpen(true);
                }}
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
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-3/4 w-full h-96 overflow-y-auto scrollbar-hide"
        >
          <div className="h-full w-full flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1 items-center">
              <Image
                src={category?.creator?.avatar?.url}
                alt={category?.creator?.avatar?.public_id}
                width={50}
                height={50}
                className="rounded-full h-[50px] w-[50px] object-cover"
              />
              <h1 className="text-lg">{category?.creator?.name}</h1>
              <p className="text-sm">{category?.creator?.email}</p>
              <p className="text-xs">{category?.creator?.phone}</p>
            </div>

            <hr />

            <div className="flex flex-col gap-y-2 w-full">
              {category?.products?.map((product) => (
                <div
                  key={product?._id}
                  className="flex flex-row justify-between items-center bg-slate-50 rounded p-2 w-full"
                >
                  <div
                    className="flex flex-row gap-x-2 items-start cursor-pointer"
                    onClick={() =>
                      window.open(
                        `/product?product_id=${
                          product?._id
                        }&product_title=${product?.title
                          .replace(/ /g, "-")
                          .toLowerCase()}}`,
                        "_self"
                      )
                    }
                  >
                    <Image
                      src={product?.thumbnail?.url}
                      alt={product?.thumbnail?.public_id}
                      width={30}
                      height={30}
                      className="rounded-full h-[30px] w-[30px] object-cover"
                    />
                    <article className="flex flex-col gap-y-1">
                      <h2 className="text-base line-clamp-2">
                        {product?.title}
                      </h2>
                      <p className="text-xs line-clamp-3">
                        By {product?.summary}
                      </p>
                      <span className="text-sm mt-2 bg-teal-100 border-teal-900 text-teal-950 rounded-secondary w-fit px-2">
                        ${product?.price}
                      </span>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function DisplayStores() {
  const {
    data: storesData,
    error: storesError,
    isLoading: fetchingStores,
  } = useGetStoresQuery();

  const stores = useMemo(() => storesData?.data || [], [storesData]);
  const [isOpen, setIsOpen] = useState();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.store.store);

  useEffect(() => {
    if (storesError) {
      toast.error(storesError?.data?.description, {
        id: "stores-data",
      });
    }
  }, [storesError]);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {fetchingStores || stores?.length === 0 ? (
          <>
            {[1, 2, 3].map((_, index) => (
              <Niche key={index} />
            ))}
          </>
        ) : (
          <>
            {stores?.slice(0, 6)?.map((store, index) => (
              <div
                key={index}
                className="group border p-4 rounded-lg flex flex-col gap-y-4 hover:border-black transition-colors bg-white relative cursor-pointer"
                onClick={() => {
                  dispatch(setStore(store));
                  setIsOpen(true);
                }}
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
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-6 lg:w-1/3 md:w-3/4 w-full h-96 overflow-y-auto scrollbar-hide"
        >
          <div className="h-full w-full flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-1 items-center">
              <Image
                src={store?.owner?.avatar?.url}
                alt={store?.owner?.avatar?.public_id}
                width={50}
                height={50}
                className="rounded-full h-[50px] w-[50px] object-cover"
              />
              <h1 className="text-lg">{store?.owner?.name}</h1>
              <p className="text-sm">{store?.owner?.email}</p>
              <p className="text-xs">{store?.owner?.phone}</p>
            </div>

            <hr />

            <div className="flex flex-col gap-y-2 w-full">
              {store?.products?.map((product) => (
                <div
                  key={product?._id}
                  className="flex flex-row justify-between items-center bg-slate-50 rounded p-2 w-full"
                >
                  <div
                    className="flex flex-row gap-x-2 items-start cursor-pointer"
                    onClick={() =>
                      window.open(
                        `/product?product_id=${
                          product?._id
                        }&product_title=${product?.title
                          .replace(/ /g, "-")
                          .toLowerCase()}}`,
                        "_self"
                      )
                    }
                  >
                    <Image
                      src={product?.thumbnail?.url}
                      alt={product?.thumbnail?.public_id}
                      width={30}
                      height={30}
                      className="rounded-full h-[30px] w-[30px] object-cover"
                    />
                    <article className="flex flex-col gap-y-1">
                      <h2 className="text-base line-clamp-2">
                        {product?.title}
                      </h2>
                      <p className="text-xs line-clamp-3">
                        By {product?.summary}
                      </p>
                      <span className="text-sm mt-2 bg-teal-100 border-teal-900 text-teal-950 rounded-secondary w-fit px-2">
                        ${product?.price}
                      </span>
                    </article>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default NicheExplorer;
