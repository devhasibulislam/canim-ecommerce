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
import React, { useEffect, useState } from "react";
import OutsideClick from "../OutsideClick";
import Image from "next/image";
import { useSelector } from "react-redux";
import Trash from "@/components/icons/Trash";
import { useDeleteFromCartMutation } from "@/services/cart/cartApi";
import { toast } from "react-hot-toast";
import Inform from "@/components/icons/Inform";
import { useCreatePaymentMutation } from "@/services/payment/paymentApi";

const MyCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
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
    <>
      <button
        className="p-2 rounded-secondary hover:bg-slate-100 transition-colors relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Cart className="h-6 w-6" />

        {user?.cart?.length > 0 && (
          <span className="h-2 w-2 bg-red-500 rounded-secondary absolute top-1 right-1"></span>
        )}
      </button>

      {isOpen && (
        <OutsideClick
          onOutsideClick={() => setIsOpen(false)}
          className="absolute top-full right-0 w-80 h-96 overflow-y-auto bg-white border rounded p-4 flex flex-col gap-y-2.5"
        >
          <div className="w-full h-full flex flex-col gap-y-8">
            {Object.keys(user).length === 0 || user?.cart?.length === 0 ? (
              <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
                <Inform /> No Products in Cart!
              </p>
            ) : (
              <div className="h-full w-full flex flex-col gap-y-4">
                <div className="h-full overflow-y-auto scrollbar-hide">
                  {user?.cart?.map(({ product, quantity, _id }) => (
                    <div
                      key={product?._id}
                      className="flex flex-row gap-x-2 transition-all border border-transparent p-2 rounded hover:border-black group relative"
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
                          <h2 className="text-base line-clamp-1">
                            {product?.title}
                          </h2>
                          <p className="text-xs line-clamp-2">
                            {product?.summary}
                          </p>
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <p className="flex flex-row justify-between">
                            <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
                              $
                              <span className="text-sm text-black">
                                {product?.price * quantity}.00
                              </span>
                            </span>
                            <span className="text-xs flex flex-row gap-x-0.5 items-baseline">
                              QTY
                              <span className="text-sm text-black">
                                {quantity}
                              </span>
                            </span>
                          </p>
                          <div className="flex flex-row gap-x-1">
                            <span className="whitespace-nowrap text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                              {product?.store?.title}
                            </span>
                            <span className="whitespace-nowrap text-[10px] bg-indigo-300/50 text-indigo-500 border border-indigo-500 px-1.5 rounded">
                              {product?.brand?.title}
                            </span>
                            <span className="whitespace-nowrap text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
                              {product?.category?.title}
                            </span>
                          </div>
                        </div>
                      </article>

                      <button
                        type="button"
                        className="opacity-0 transition-opacity group-hover:opacity-100 absolute top-2 right-2 border p-2 rounded-secondary bg-red-500"
                        onClick={() => removeFromCart(_id)}
                      >
                        <Trash />
                      </button>
                    </div>
                  ))}
                </div>
                <Purchase cart={user?.cart} />
              </div>
            )}
          </div>
        </OutsideClick>
      )}
    </>
  );
};

function Purchase({ cart }) {
  const [createPayment, { isLoading, data, error }] =
    useCreatePaymentMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Creating payment...", { id: "createPayment" });
    }

    if (data) {
      toast.success(data?.description, { id: "createPayment" });
      window.open(data?.url, "_blank");
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "createPayment" });
    }
  }, [isLoading, data, error]);

  const result = cart.map(
    ({
      product: { title, thumbnail, price, summary, _id: pid },
      quantity,
      _id: cid,
    }) => ({
      name: title,
      quantity,
      price,
      thumbnail: thumbnail?.url,
      description: summary,
      pid,
      cid,
    })
  );

  return (
    <>
      <button
        type="button"
        className="px-8 py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow flex flex-row gap-x-2 items-center justify-center"
        onClick={() => createPayment(result)}
      >
        Purchase
      </button>
    </>
  );
}

export default MyCart;
