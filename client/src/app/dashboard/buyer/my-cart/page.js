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
 * Date: 14, January 2024
 */

"use client";

import Inform from "@/components/icons/Inform";
import Trash from "@/components/icons/Trash";
import Dashboard from "@/components/shared/layouts/Dashboard";
import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
import Image from "next/image";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  const user = useSelector((state) => state.auth.user);
  const [removeFromCart, { isLoading, data, error }] =
    useDeleteFromCartMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Removing item from cart...", { id: "removeFromCart" });
    }

    if (data) {
      toast.success(data?.description, { id: "removeFromCart" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "removeFromCart" });
    }
  }, [isLoading, data, error]);

  return (
    <Dashboard>
      {user?.cart?.length === 0 ? (
        <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
          <Inform /> No Products in Cart List!
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
                    Quantity
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
                    Sizes
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Colors
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Category
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
                {user?.cart?.map(({ product, quantity, _id }) => (
                  <tr
                    key={product?._id}
                    className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={product?.thumbnail?.url}
                        alt={product?.thumbnail?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap w-60 overflow-x-auto block scrollbar-hide text-sm">
                        {product?.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {product?.price * quantity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      <span className="flex flex-row gap-x-2 scrollbar-hide text-sm">
                        {product?.variations?.sizes?.map((size) => (
                          <span key={size} className="border px-1 py-0.5">
                            {size.toUpperCase()}
                          </span>
                        ))}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex flex-row gap-x-2 scrollbar-hide text-sm">
                        {product?.variations?.colors?.map((color) => (
                          <span
                            key={color}
                            style={{
                              backgroundColor: `#${color}`,
                              height: "20px",
                              width: "20px",
                            }}
                          />
                        ))}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {product?.category?.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {product?.brand?.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {product?.store?.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="submit"
                        className="bg-red-50 border border-red-900 p-0.5 rounded-secondary text-red-900"
                        onClick={() => removeFromCart(_id)}
                      >
                        <Trash />
                      </button>
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

export default Page;
