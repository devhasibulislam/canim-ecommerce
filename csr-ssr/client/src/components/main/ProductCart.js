import { Popover, Transition } from "@headlessui/react";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LazyLoadingImage from "../LazyLoadingImage";
import { Link, useNavigate } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";
import { useUpdateUserMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const ProductCart = () => {
  const { cart, _id } = useSelector((state) => state?.auth?.user);
  const [
    removeFromCart,
    { isLoading: isCartLoading, isSuccess: isCartSuccess },
  ] = useUpdateUserMutation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartSuccess) {
      toast.success("Product removed from cart!");
      setTimeout(() => {
        // window.location.reload();
        navigate(0);
      }, 1000);
    }
  }, [isCartSuccess, navigate]);

  // find subtotal from cart
  let subtotal = 0;
  cart?.forEach((item) => {
    subtotal += item?.product?.price * item?.quantity;
  });

  return (
    <>
      <div className="relative inline-block text-left z-50">
        <Popover className="relative">
          <>
            <Popover.Button className="text-gray-600 flex gap-x-4 items-center">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M9 8H21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <span className="block md:hidden">Cart</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute md:right-0 w-screen max-w-xs sm:max-w-md overflow-y-auto origin-top-right divide-y divide-gray-100 rounded-2xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="max-h-[60vh] p-5 overflow-y-auto scrollbar-hide">
                    <h3 className="text-xl font-semibold">Shopping cart</h3>
                    {cart?.length ? (
                      <div className="divide-y divide-slate-100">
                        {cart?.map((crt) => (
                          <div key={crt?._id} className="flex py-5 last:pb-0">
                            <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                              <LazyLoadingImage
                                src={crt?.product?.thumbnail?.url}
                                alt={crt?.product?.thumbnail?.public_id}
                                height={"96"}
                                width={"80"}
                                className={
                                  "object-contain object-center h-24 w-20"
                                }
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="text-base font-medium">
                                      <Link
                                        className="text-base font-medium line-clamp-2"
                                        to={`/product/${crt?.product?.title
                                          ?.toLowerCase()
                                          .replace(/\s/g, "-")}/${
                                          crt?.product?._id
                                        }`}
                                      >
                                        {crt?.product?.title}
                                      </Link>
                                    </h3>
                                  </div>
                                  <div className="mt-0.5">
                                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                                      <span className="text-green-500 !leading-none">
                                        ৳{crt?.product?.price}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {crt?.quantity}
                                </p>
                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-red-600"
                                    onClick={() =>
                                      removeFromCart({
                                        uid: _id,
                                        userData: {
                                          discard: { _id: crt?._id },
                                        },
                                      })
                                    }
                                  >
                                    {isCartLoading ? "Removing..." : "Remove"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="flex p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 mt-6"
                        role="alert"
                      >
                        <svg
                          aria-hidden="true"
                          className="flex-shrink-0 inline w-5 h-5 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <span className="sr-only">Warning</span>
                        <div>
                          <span className="font-medium">Warning alert!</span> No
                          product added yet!
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-neutral-50 p-5">
                    <p className="flex justify-between font-semibold text-slate-900">
                      <span>
                        <span>Subtotal</span>
                        <span className="block text-sm text-slate-500 font-normal">
                          Shipping and taxes calculated at checkout.
                        </span>
                      </span>
                      <span className="">৳{subtotal}.00</span>
                    </p>
                    <div className="flex space-x-2 mt-5">
                      <button
                        className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl flex-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
                        onClick={() => setIsOpen(true)}
                        disabled={!cart?.length}
                      >
                        Check out
                      </button>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
      {isOpen && <CheckoutModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default ProductCart;
