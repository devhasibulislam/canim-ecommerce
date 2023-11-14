/**
 * Title: Write a program using JavaScript on Cart
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
 * Date: 13, November 2023
 */

import Cart from "@/components/icons/Cart";
import React, { useState } from "react";
import OutsideClick from "../OutsideClick";
import Image from "next/image";
import { useSelector } from "react-redux";

const MyCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <button
        className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cart className="h-6 w-6" />
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full right-0 w-80 max-h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-2.5"
        >
          <div className="w-full h-full flex flex-col gap-y-8">
            {user?.cart?.map(({ product, quantity }) => (
              <div
                key={product?._id}
                className="flex flex-row gap-x-2 cursor-pointer"
              >
                <Image
                  src={product?.thumbnail?.url}
                  alt={product?.thumbnail?.public_id}
                  width={50}
                  height={50}
                  className="rounded h-[50px] w-[50px] object-cover"
                />
                <article className="flex flex-col gap-y-2">
                  <div className="flex flex-col gap-y-0.5">
                    <h2 className="text-base">{product?.title}</h2>
                    <p className="text-xs line-clamp-2">{product?.summary}</p>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <span className="flex flex-row justify-between">
                      <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
                        $
                        <span className="text-sm text-black">
                          {product?.price}.00
                        </span>
                      </span>
                      <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
                        QTY
                        <span className="text-sm text-black">{quantity}</span>
                      </span>
                    </span>
                    <div className="flex flex-row gap-x-1">
                      <span className="text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                        {product?.store?.title}
                      </span>
                      <span className="text-[10px] bg-indigo-300/50 text-indigo-500 border border-indigo-500 px-1.5 rounded">
                        {product?.brand?.title}
                      </span>
                      <span className="text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
                        {product?.category?.title}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </OutsideClick>
      )}
    </>
  );
};

export default MyCart;
