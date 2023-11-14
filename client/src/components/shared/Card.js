/**
 * Title: Write a program using JavaScript on Card
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
import { AiFillStar } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import Discount from "../icons/Discount";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Card = ({ index, product, ...rest }) => {
  const router = useRouter();

  const [isInCart, setIsInCart] = useState(
    localStorage?.getItem("cart")?.includes(product._id)
  );
  const cartItems = localStorage?.getItem("cart");

  useEffect(() => {
    setIsInCart(cartItems?.includes(product._id));
  }, [cartItems, product._id]);

  return (
    <div
      {...rest}
      className="flex-shrink-0 flex flex-col gap-y-6 group border hover:border-black transition-colors rounded-primary"
    >
      <div className="relative h-[200px] w-full rounded-primary">
        <Image
          src={product?.thumbnail?.url}
          alt={product?.thumbnail?.public_id}
          width={296}
          height={200}
          className="h-[200px] w-full rounded-t-primary object-cover"
        />
        <div className="flex flex-row gap-x-2.5 absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Logo
            src={product?.brand?.logo?.url}
            alt={product?.brand?.logo?.public_id}
          />
          <Logo
            src={product?.store?.thumbnail?.url}
            alt={product?.store?.thumbnail?.public_id}
          />
        </div>
        {product?.campaign && (
          <span className="text-xs bg-white/80 px-2.5 py-0.5 rounded-xl absolute bottom-4 right-4 cursor-not-allowed">
            {product?.campaign?.state === "discount" && (
              <span className="flex flex-row gap-x-0.5 items-center">
                <Discount /> {product?.campaign.title}
              </span>
            )}
            {product?.campaign?.state === "sold-out" && (
              <span className="flex flex-row gap-x-0.5 items-center">
                <SoldOut /> {product?.campaign.title}
              </span>
            )}
            {product?.campaign?.state === "arrival" && (
              <span className="flex flex-row gap-x-0.5 items-center">
                <Arrival /> {product?.campaign.title}
              </span>
            )}
            {product?.campaign?.state === "on-sale" && (
              <span className="flex flex-row gap-x-0.5 items-center">
                <Arrival /> {product?.campaign.title}
              </span>
            )}
          </span>
        )}
        <button
          className="border border-transparent bg-white hover:border-black shadow p-1 absolute bottom-4 left-4 rounded-secondary opacity-0 group-hover:opacity-100 transition-all"
          onClick={() => {
            if (localStorage?.getItem("cart") === null) {
              localStorage?.setItem("cart", JSON.stringify([]));
            }

            localStorage?.setItem(
              "cart",
              JSON.stringify([
                ...JSON.parse(localStorage?.getItem("cart")),
                product._id,
              ])
            );

            setIsInCart(true);

            // if (localStorage?.getItem("cart")?.includes(product._id)) {
            //   const cart = JSON.parse(localStorage?.getItem("cart")).filter(
            //     (item) => item !== product._id
            //   );
            //   localStorage?.setItem("cart", JSON.stringify(cart));
            // }
          }}
        >
          <MdFavorite
            className={`w-5 h-5 text-black ${isInCart ? "text-red-500" : ""}`}
          />
        </button>
      </div>
      <article className="flex flex-col gap-y-3.5 px-4">
        <div className="flex flex-row items-center gap-x-1.5">
          <Badge className="text-indigo-800 bg-indigo-100">
            {product?.variations?.colors + " " + "Colors"}
          </Badge>
          <div className="h-5 border-l w-[1px]"></div>
          <Badge className="text-purple-800 bg-purple-100">
            {product?.variations?.sizes + " " + "Sizes"}
          </Badge>
        </div>
        <div
          className="flex flex-col gap-y-4 cursor-pointer"
          onClick={() =>
            router.push(
              `/${product?._id}?product_title=${product?.title
                .replace(/ /g, "-")
                .toLowerCase()}}`
            )
          }
        >
          <h2 className="line-clamp-1">{product?.title}</h2>
          <div className="flex flex-row items-end justify-between">
            <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
              <span className="text-green-500 !leading-none">
                ${product?.price}.00
              </span>
            </span>
            <span className="flex flex-row items-center gap-x-0.5">
              <AiFillStar className="text-[#ffc242]" />
              <span className="text-sm">
                {Math.floor(Math.random() * (500 - 100 + 1)) + 100}
              </span>
            </span>
          </div>
        </div>
      </article>
      <div></div>
    </div>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "px-3 py-1 rounded-primary text-xs w-fit" +
        (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  );
}

function Logo({ src, alt, props, className }) {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={30}
      height={30}
      className={
        "w-[30px] h-[30px] object-cover rounded-[5px] shadow border border-transparent hover:border-black transition-colors cursor-help" +
        (className ? " " + className : "")
      }
    />
  );
}

export default Card;
