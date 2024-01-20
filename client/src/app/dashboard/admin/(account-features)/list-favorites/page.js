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
 * Date: 20, January 2024
 */

"use client";

import Inform from "@/components/icons/Inform";
import View from "@/components/icons/View";
import Dashboard from "@/components/shared/layouts/Dashboard";
import { setFavorites } from "@/features/favorite/favoriteSlice";
import { useGetFavoritesQuery } from "@/services/favorite/favoriteApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";

const Page = () => {
  const { isLoading, data, error } = useGetFavoritesQuery();
  const favorites = useMemo(() => data?.data || [], [data]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Fetching Favorites...", { id: "favorites" });
    }

    if (data) {
      toast.success(data?.description, { id: "favorites" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "favorites" });
    }

    dispatch(setFavorites(favorites));
  }, [isLoading, data, error, dispatch, favorites]);

  return (
    <Dashboard>
      {favorites?.length === 0 ? (
        <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
          <Inform /> No Favorites Found!
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
                    Avatar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Name
                  </th>
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
                    Gallery
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite) => (
                  <tr
                    key={favorite?._id}
                    className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                  >
                    <td className="px-6 py-4">
                      <Image
                        src={favorite?.user?.avatar?.url}
                        alt={favorite?.user?.avatar?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap text-sm">
                        {favorite?.user?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Image
                        src={favorite?.product?.thumbnail?.url}
                        alt={favorite?.product?.thumbnail?.public_id}
                        height={30}
                        width={30}
                        className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="whitespace-nowrap w-60 overflow-x-auto block scrollbar-hide text-sm">
                        {favorite?.product?.title}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-4">
                        {favorite?.product?.gallery.map((thumbnail) => (
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
                      <span className="whitespace-nowrap scrollbar-hide text-sm">
                        {favorite?.product?.price}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/product?product_id=${
                          favorite?.product?._id
                        }&product_title=${favorite?.product?.title
                          .replace(/ /g, "-")
                          .toLowerCase()}}`}
                        target="_blank"
                        className="underline text-sm"
                      >
                        view
                      </Link>
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
