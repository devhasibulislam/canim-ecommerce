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

import DemoteProduct from "@/components/dashboard/DemoteProduct";
import Pencil from "@/components/icons/Pencil";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetProductsQuery } from "@/services/product/productApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const ListProducts = () => {
  const {
    data: productsData,
    error: productsError,
    isLoading,
  } = useGetProductsQuery();
  const products = productsData?.data || [];

  useEffect(() => {
    if (productsError) {
      alert(productsError?.data?.description);
    }
  }, [productsError]);

  return (
    <Dashboard>
      {isLoading || products?.length === 0 ? (
        <DashboardLading />
      ) : (
        <div className="w-full h-full">
          <div className="overflow-x-auto h-full w-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-slate-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Thumbnail
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
                    Price ($)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Gallery
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Store
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
                {products.map((product) => (
                  <tr
                    key={product?._id}
                    className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                  >
                    <td className="px-6 py-4 text-gray-800">
                      <Image
                        src={product?.thumbnail?.url}
                        alt={product?.thumbnail?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-xs">
                      {product?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-xs">
                      {product?.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-xs">
                      <div className="flex -space-x-4">
                        {product?.gallery.map((thumbnail) => (
                          <Image
                            key={thumbnail?._id}
                            src={thumbnail?.url}
                            alt={thumbnail?.public_id}
                            height={30}
                            width={30}
                            className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                          />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-xs">
                      {product?.brand?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800 text-xs">
                      {product?.store?.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex flex-row gap-x-2 justify-end">
                        {!product?.trashable && (
                          <DemoteProduct product={product} />
                        )}
                        <Link
                          href={`/dashboard/list-products/${product?._id}`}
                          className="bg-green-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
                        >
                          <Pencil />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default ListProducts;
