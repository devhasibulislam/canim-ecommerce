/**
 * Title: Write a program using JavaScript on CartButton
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
 * Date: 24, October 2023
 */

"use client";

import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Bag from "../icons/Bag";
import Spinner from "../shared/Spinner";
import { useAddToCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";

const CartButton = ({ product }) => {
  const [qty, setQty] = useState(1);

  const [
    addToCart,
    { isLoading: addingToCart, data: cartData, error: cartError },
  ] = useAddToCartMutation();

  useEffect(() => {
    if (addingToCart) {
      toast.loading("Adding to cart...", { id: "addToCart" });
    }

    if (cartData) {
      toast.success(cartData?.description, { id: "addToCart" });
      setQty(1);
    }
    if (cartError?.data) {
      toast.error(cartError?.data?.description, { id: "addToCart" });
    }
  }, [addingToCart, cartData, cartError]);

  return (
    <section className="flex flex-row items-center gap-x-4">
      <div className="flex flex-row gap-x-2 items-center border px-1 py-0.5 rounded-secondary h-full">
        <button
          className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
          onClick={() => setQty(qty - 1)}
          disabled={qty === 1}
        >
          <AiOutlineMinus className="w-4 h-4" />
        </button>
        <span className="px-2 py-0.5 rounded-primary border w-12 inline-block text-center">
          {qty}
        </span>
        <button
          className="border border-black/30 disabled:border-zinc-100 p-1.5 rounded-secondary"
          onClick={() => setQty(qty + 1)}
        >
          <AiOutlinePlus className="w-4 h-4" />
        </button>
      </div>
      <button
        className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit flex flex-row gap-x-2 items-center"
        disabled={qty === 0 || addingToCart}
        onClick={() => {
          addToCart({ product: product._id, quantity: qty });
        }}
      >
        {addingToCart ? (
          <Spinner />
        ) : (
          <>
            <Bag /> Add to Cart
          </>
        )}
      </button>
    </section>
  );
};

export default CartButton;
