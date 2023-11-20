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

import DemoteStore from "@/components/dashboard/DemoteStore";
import Pencil from "@/components/icons/Pencil";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetStoresQuery } from "@/services/store/storeApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const ListStores = () => {
  const {
    data: storesData,
    error: storesError,
    isLoading,
  } = useGetStoresQuery();
  const stores = storesData?.data || [];
  const router = useRouter();

  useEffect(() => {
    if (storesError) {
      alert(storesError?.data?.description);
    }
  }, [storesError]);

  return (
    <Dashboard>
      {isLoading || stores.length === 0 ? (
        <DashboardLading />
      ) : (
        <div className="w-full grid grid-cols-3 gap-4">
          {stores.map((store) => (
            <div
              key={store?._id}
              className="flex flex-col gap-y-2 border p-4 rounded relative"
            >
              <Image
                src={store?.thumbnail?.url}
                alt={store?.thumbnail?.public_id}
                height={30}
                width={50}
                className="rounded h-[30px] w-[50px] object-cover"
              />
              <article className="flex flex-col gap-y-1">
                <h2 className="">{store?.title}</h2>
                <p className="text-xs line-clamp-2 mb-1.5">
                  {store?.description}
                </p>
                <p className="text-xs flex flex-col gap-y-2">
                  <p className="text-xs flex flex-row gap-2 overflow-x-auto scrollbar-hide">
                    {store?.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-100/50 border border-purple-500 text-purple-500 px-1.5 rounded whitespace-nowrap"
                      >
                        {`#${tag}`}
                      </span>
                    ))}
                  </p>
                  <span className="!text-xs bg-indigo-100/50 border border-indigo-500 text-indigo-500 rounded w-fit px-2 whitespace-nowrap">
                    {store?.products?.length} Products
                  </span>
                </p>
              </article>

              <div className="absolute top-2 right-2 flex flex-row gap-x-2">
                {!store?.trashable && <DemoteStore store={store} />}
                <button
                  className="bg-green-50 border border-green-900 p-0.5 rounded-secondary text-green-900"
                  onClick={() =>
                    router.push(`/dashboard/list-stores/${store?._id}`)
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

export default ListStores;
