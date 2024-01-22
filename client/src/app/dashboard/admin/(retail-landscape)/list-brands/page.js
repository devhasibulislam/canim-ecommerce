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

import DemoteBrand from "@/components/dashboard/DemoteBrand";
import Inform from "@/components/icons/Inform";
import Pencil from "@/components/icons/Pencil";
import Trash from "@/components/icons/Trash";
import User from "@/components/icons/User";
import Card from "@/components/shared/Card";
import Modal from "@/components/shared/Modal";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { setBrand, setBrands } from "@/features/brand/brandSlice";
import { setProduct } from "@/features/product/productSlice";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
} from "@/services/brand/brandApi";
import { useDeleteProductMutation } from "@/services/product/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const ListBrands = () => {
  const {
    data: brandsData,
    isLoading: brandsLoading,
    error: brandsError,
  } = useGetBrandsQuery();
  const brands = useMemo(() => brandsData?.data || [], [brandsData]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (brandsLoading) {
      toast.loading("Fetching Brands...", { id: "brandsData" });
    }

    if (brandsData) {
      toast.success(brandsData?.description, { id: "brandsData" });
    }

    if (brandsError) {
      toast.error(brandsError?.data?.description, { id: "brandsData" });
    }

    dispatch(setBrands(brands));
  }, [brandsError, brandsData, brandsLoading, dispatch, brands]);

  return (
    <Dashboard>
      {brands?.length === 0 ? (
        <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
          <Inform /> No Brands Found!
        </p>
      ) : (
        <section className="w-full h-full">
          <div className="overflow-x-auto w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Logo
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Total Products
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Creator
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Brand Tags
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Brand Features
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr
                    key={brand?._id}
                    className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={brand?.logo?.url}
                        alt={brand?.logo?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap overflow-x-auto block scrollbar-hide text-sm">
                        {brand?.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {brand?.products?.length}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {brand?.creator?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="w-52 overflow-x-auto scrollbar-hide text-sm flex flex-row gap-x-2">
                        {brand?.tags?.map((tag, index) => (
                          <span
                            key={index}
                            className="border px-1 py-0.5 rounded-sm whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {brand?.keynotes?.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-row gap-x-2 justify-end">
                        <DeleteBrand brand={brand} />
                        <BrandDetails brand={brand} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </Dashboard>
  );
};

function DeleteBrand({ brand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteBrand, { isLoading, data, error }] = useDeleteBrandMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting Brand...", { id: "deleteBrand" });
    }

    if (data) {
      toast.success(data?.description, { id: "deleteBrand" });
    }

    if (error) {
      toast.error(error?.data?.description, { id: "deleteBrand" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      <button
        type="submit"
        className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
        onClick={() => {
          setIsOpen(true);
          dispatch(setBrand(brand));
        }}
      >
        <Trash />
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-4 lg:w-1/5"
        >
          <article className="flex flex-col gap-y-4">
            <p className="text-xs bg-yellow-500/50 text-black px-2 py-0.5 rounded-sm text-center">
              Brand will be deleted permanently!
            </p>
            <div className="flex flex-col gap-y-2 items-start">
              <h1 className="text-xl">Are you sure?</h1>
              <p className="text-sm flex flex-col gap-y-2">
                You are about to unlisted from:
                <span className="flex flex-row gap-x-1 items-center text-xs">
                  <Inform /> {brand?.products?.length} Products
                </span>
              </p>
            </div>
            <div className="flex flex-row gap-x-4">
              <button
                className="text-white bg-slate-500 px-3 py-1.5 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </button>
              <button
                className="flex flex-row gap-x-2 items-center text-white bg-red-500 px-3 py-1.5 rounded text-sm"
                onClick={() => deleteBrand(brand?._id)}
              >
                <Trash /> Yes, delete
              </button>
            </div>
          </article>
        </Modal>
      )}
    </>
  );
}

function BrandDetails({ brand }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      <button
        type="submit"
        className="bg-green-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
        onClick={() => {
          setIsOpen(true);
          dispatch(setBrand(brand));
        }}
      >
        <User />
      </button>

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
                    className="flex flex-row gap-x-2 items-center cursor-pointer"
                    onClick={() =>
                      window.open(
                        `/product?product_id=${
                          product?._id
                        }&product_title=${product?.title
                          .replace(/ /g, "-")
                          .toLowerCase()}}`,
                        "_blank"
                      )
                    }
                  >
                    <Image
                      src={product?.thumbnail?.url}
                      alt={product?.thumbnail?.public_id}
                      width={20}
                      height={20}
                      className="rounded-full h-[20px] w-[20px] object-cover"
                    />
                    <p className="line-clamp-1 text-sm whitespace-normal text-left">
                      {product?.title}
                    </p>
                  </div>
                  <DeleteProduct product={product} />
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

function DeleteProduct({ product }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteProduct, { isLoading, data, error }] =
    useDeleteProductMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting Product...", { id: "deleteProduct" });
    }

    if (data) {
      toast.success(data?.description, { id: "deleteProduct" });
      setIsOpen(false);
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "deleteProduct" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      <button
        type="submit"
        className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
        onClick={() => {
          setIsOpen(true);
          dispatch(setProduct(product));
        }}
      >
        <Trash />
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-4 lg:w-1/5"
        >
          <article className="flex flex-col gap-y-4">
            <p className="text-xs bg-yellow-500/50 text-black px-2 py-0.5 rounded-sm text-center">
              Product will be deleted permanently!
            </p>
            <div className="flex flex-col items-start gap-y-2">
              <h1 className="text-xl">Are you sure?</h1>
              <p className="text-sm flex flex-col gap-y-2">
                You are about to unlisted from:
                <p className="flex flex-col gap-y-1.5">
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> Brand: {product?.brand?.title}
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> Category: {product?.category?.title}
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> Store: {product?.store?.title}
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> Lost {product?.buyers?.length} buyers
                  </span>
                  <span className="flex flex-row gap-x-1 items-center text-xs">
                    <Inform /> Lost {product?.reviews?.length} reviews
                  </span>
                </p>
              </p>
            </div>
            <div className="flex flex-row gap-x-4">
              <button
                className="text-white bg-slate-500 px-3 py-1.5 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </button>
              <button
                className="flex flex-row gap-x-2 items-center text-white bg-red-500 px-3 py-1.5 rounded text-sm"
                onClick={() => deleteProduct(product?._id)}
              >
                <Trash /> Yes, delete
              </button>
            </div>
          </article>
        </Modal>
      )}
    </>
  );
}

export default ListBrands;
