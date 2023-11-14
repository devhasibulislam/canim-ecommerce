import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDisplayProductQuery,
  useUpdateProductMutation,
} from "../../features/product/productApi";
import SecondaryLoading from "../../components/loading/SecondaryLoading";
import LazyLoadingImage from "../../components/LazyLoadingImage";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const ProductDescription = () => {
  const { pid } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading: isProductLoading } =
    useDisplayProductQuery(pid);

  const {
    _id,
    title,
    description,
    thumbnail,
    gallery,
    price,
    subcategory,
    brand,
    store,
    tags,
    review,
  } = productData?.data || {};

  const [addProductReview, { isLoading: isReviewLoading }] =
    useUpdateProductMutation();
  const [addToCart, { isLoading: isCartLoading, isSuccess: isCartSuccess }] =
    useUpdateUserMutation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartSuccess) {
      toast.success("Product added to cart!");
      setTimeout(() => {
        // window.location.reload();
        navigate(0);
      }, 1000);
    }
  }, [isCartSuccess, navigate]);

  // react hook form credentials
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const handleAddReviewForm = (data) => {
    const reviewData = {
      review: { reviewer: user?._id, description: data?.review },
    };
    addProductReview({ pid: _id, productData: reviewData });
    reset();
  };

  return (
    <>
      {isProductLoading ? (
        <SecondaryLoading />
      ) : (
        <section className="container mx-auto px-4 lg:px-32 flex flex-col gap-y-32 scroll-smooth">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
            <div className="flex flex-col gap-y-4">
              <LazyLoadingImage
                height={"401"}
                width={"640"}
                src={thumbnail?.url}
                alt={thumbnail?.public_id}
                className={"max-w-full h-full w-full object-cover rounded-2xl"}
              />
              <div className="grid grid-cols-3 gap-4">
                {gallery?.map((image) => (
                  <LazyLoadingImage
                    key={image?._id}
                    height={"135"}
                    width={"202"}
                    src={image?.url}
                    alt={image?.public_id}
                    className={
                      "max-w-full h-[135px] w-[202px] object-cover rounded-2xl"
                    }
                  />
                ))}
              </div>
            </div>

            {/* product information */}
            <div className="flex flex-col gap-y-8">
              {/* name & price */}
              <div className="flex flex-col gap-y-1">
                <h2 className="text-2xl sm:text-3xl font-semibold">{title}</h2>
                <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                  <div className="">
                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold">
                      <span className="text-green-500 !leading-none">
                        ৳{price}
                      </span>
                    </div>
                  </div>
                  <div className="h-7 border-l border-slate-300"></div>
                  <div className="flex items-center">
                    <a
                      href="#reviews"
                      className="flex items-center text-sm font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5 pb-[1px] text-yellow-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <div className="ml-1.5 flex">
                        <span>N/A</span>
                        <span className="block mx-2">·</span>
                        <span className="text-slate-600 underline">
                          {review?.length} reviews
                        </span>
                      </div>
                    </a>
                    <span className="hidden sm:block mx-2.5">·</span>
                    <div className="hidden sm:flex items-center text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                        ></path>
                      </svg>
                      <span className="ml-1 leading-none text-black">
                        {subcategory?.title}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* product meta tags */}
              <div className="flex flex-wrap gap-y-2">
                {tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-cyan-100 text-cyan-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-cyan-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* add to cart */}
              <div className="flex space-x-3.5">
                <div className="flex items-center justify-center bg-slate-100/70 px-2 py-3 sm:p-3.5 rounded-full">
                  <div className="nc-NcInputNumber flex items-center justify-between space-x-5 w-full">
                    <div className="nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28">
                      <button
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                        type="button"
                        disabled={quantity < 2}
                        onClick={() => setQuantity(quantity - 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <span className="select-none block flex-1 text-center leading-none">
                        {quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
                  onClick={() =>
                    addToCart({
                      uid: user?._id,
                      userData: { cart: { product: _id, quantity: quantity } },
                    })
                  }
                >
                  {isCartLoading ? (
                    <svg
                      className="animate-spin mb-0.5 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="3"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="hidden sm:inline-block w-5 h-5 mb-0.5"
                      viewBox="0 0 9 9"
                      fill="none"
                    >
                      <path
                        d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  )}
                  <span className="ml-3">Add to cart</span>
                </button>
              </div>

              <hr className="border-slate-200"></hr>

              {/* disclosures */}
              <div className="flex flex-col gap-y-4">
                {/* description */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                        <span>Description</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-slate-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        {description}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* subcategory */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                        <span>Subcategory</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-slate-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div
                          className="nc-ReviewItem flex flex-col"
                          data-nc-id="ReviewItem"
                        >
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0 pt-0.5">
                              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                                <LazyLoadingImage
                                  height={"40"}
                                  width={"40"}
                                  src={subcategory?.thumbnail?.url}
                                  alt={subcategory?.thumbnail?.public_id}
                                  className={
                                    "object-cover rounded-full h-10 w-10 absolute inset-0"
                                  }
                                />
                                <span className="wil-avatar__name">S</span>
                              </div>
                            </div>
                            <div className="flex-1 flex justify-between">
                              <div className="text-sm sm:text-base">
                                <span className="block font-semibold">
                                  {subcategory?.title}
                                </span>
                                <span className="block mt-0.5 text-slate-500 text-sm">
                                  {subcategory?.category?.title}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="prose prose-sm sm:prose sm:max-w-2xl">
                            <p className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              {subcategory?.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap ml-4">
                            {subcategory?.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* brand */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                        <span>Brand</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-slate-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div
                          className="nc-ReviewItem flex flex-col"
                          data-nc-id="ReviewItem"
                        >
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0 pt-0.5">
                              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                                <LazyLoadingImage
                                  height={"40"}
                                  width={"40"}
                                  src={brand?.logo?.url}
                                  alt={brand?.logo?.public_id}
                                  className={
                                    "object-cover rounded-full h-10 w-10 absolute inset-0"
                                  }
                                />
                                <span className="wil-avatar__name">S</span>
                              </div>
                            </div>
                            <div className="flex-1 flex justify-between">
                              <div className="text-sm sm:text-base">
                                <span className="block font-semibold">
                                  {brand?.title}
                                </span>
                                <span className="block mt-0.5 text-slate-500 text-sm">
                                  {brand?.location}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="prose prose-sm sm:prose sm:max-w-2xl">
                            <p className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              {brand?.description}
                            </p>
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* store */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex items-center justify-between w-full px-4 py-2 font-medium text-left bg-slate-100/80 hover:bg-slate-200/60 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75 ">
                        <span>Store</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-slate-500`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div
                          className="nc-ReviewItem flex flex-col"
                          data-nc-id="ReviewItem"
                        >
                          <div className="flex space-x-4">
                            <div className="flex-shrink-0 pt-0.5">
                              <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                                <LazyLoadingImage
                                  height={"40"}
                                  width={"40"}
                                  src={store?.thumbnail?.url}
                                  alt={store?.thumbnail?.public_id}
                                  className={
                                    "object-cover rounded-full h-10 w-10 absolute inset-0"
                                  }
                                />
                                <span className="wil-avatar__name">S</span>
                              </div>
                            </div>
                            <div className="flex-1 flex justify-between">
                              <div className="text-sm sm:text-base">
                                <span className="block font-semibold">
                                  {store?.title}
                                </span>
                                <span className="block mt-0.5 text-slate-500 text-sm">
                                  {store?.seller?.name}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="prose prose-sm sm:prose sm:max-w-2xl">
                            <p className="px-4 pt-4 pb-2 text-sm text-gray-500">
                              {store?.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap ml-4">
                            {store?.tags?.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded border border-blue-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>

              {/* brief intro */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
                <div className="flex flex-col p-5 rounded-2xl bg-red-50">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 14H13C14.1 14 15 13.1 15 12V2H6C4.5 2 3.19001 2.82999 2.51001 4.04999"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2 8H8"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2 11H6"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2 14H4"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Free shipping
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      On orders over $50.00
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-2xl bg-sky-50">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2 9C2 5.13 5.13 2 9 2L7.95 3.75"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M13.7 4.44995L17.6799 6.74994L21.6199 4.45996"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17.6799 10.82V6.73999"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M16.74 2.21L14.34 3.53996C13.8 3.83996 13.35 4.59995 13.35 5.21995V7.75999C13.35 8.37999 13.79 9.13998 14.34 9.43998L16.74 10.77C17.25 11.06 18.09 11.06 18.61 10.77L21.01 9.43998C21.55 9.13998 22 8.37999 22 7.75999V5.21995C22 4.59995 21.56 3.83996 21.01 3.53996L18.61 2.21C18.1 1.93 17.26 1.93 16.74 2.21Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M2.34998 15.45L6.31998 17.7499L10.27 15.46"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M6.31995 21.82V17.74"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M5.39 13.21L2.99001 14.54C2.45001 14.84 2 15.5999 2 16.2199V18.76C2 19.38 2.44001 20.14 2.99001 20.44L5.39 21.77C5.9 22.06 6.73999 22.06 7.25999 21.77L9.66 20.44C10.2 20.14 10.65 19.38 10.65 18.76V16.2199C10.65 15.5999 10.21 14.84 9.66 14.54L7.25999 13.21C6.73999 12.93 5.9 12.93 5.39 13.21Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Very easy to return
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      Just phone number.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-2xl bg-green-50">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M15 3C16.95 8.84 16.95 15.16 15 21"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Nationwide Delivery
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      Fast delivery nationwide.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col p-5 rounded-2xl bg-amber-50">
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 13.75C9.5 14.72 10.25 15.5 11.17 15.5H13.05C13.85 15.5 14.5 14.82 14.5 13.97C14.5 13.06 14.1 12.73 13.51 12.52L10.5 11.47C9.91 11.26 9.51001 10.94 9.51001 10.02C9.51001 9.17999 10.16 8.48999 10.96 8.48999H12.84C13.76 8.48999 14.51 9.26999 14.51 10.24"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 7.5V16.5"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M17 3V7H21"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M22 2L17 7"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="mt-2.5">
                    <p className="font-semibold text-slate-900">
                      Refunds policy
                    </p>
                    <p className="text-slate-500 mt-0.5 text-sm">
                      60 days return for any reason
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-200"></hr>

          {/* reviews */}
          <div className="flex flex-col gap-y-8 scroll-smooth" id="reviews">
            <h2 className="text-2xl font-semibold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-7 h-7 mb-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="ml-1.5"> N/A · {review?.length} Reviews</span>
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
              {review?.map((rev) => (
                <div
                  key={rev?._id}
                  className="flex flex-col shadow p-6 rounded-2xl h-fit mb-4"
                  data-nc-id="ReviewItem"
                >
                  <div className="flex space-x-4">
                    <div className="flex-shrink-0 pt-0.5">
                      <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                        <LazyLoadingImage
                          className="absolute inset-0 w-10 h-10 object-cover rounded-full"
                          src={rev?.reviewer?.avatar?.url}
                          alt={rev?.reviewer?.avatar?.public_id}
                          height={"40"}
                          width={"40"}
                        />
                        <span className="wil-avatar__name">C</span>
                      </div>
                    </div>
                    <div className="flex-1 flex justify-between">
                      <div className="text-sm sm:text-base">
                        <span className="block font-semibold">
                          {rev?.reviewer?.name}
                        </span>
                        <span className="block mt-0.5 text-slate-500 text-sm">
                          {rev?.createdAt?.split("T")[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 prose prose-sm sm:prose sm:max-w-2xl">
                    <p className="text-slate-600">{rev?.description}</p>
                  </div>
                </div>
              ))}
              {/* review form */}
              <div
                className="flex flex-col shadow p-6 rounded-2xl h-fit"
                data-nc-id="ReviewItem"
              >
                <div className="flex space-x-4">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="wil-avatar relative flex-shrink-0 inline-flex items-center justify-center text-neutral-100 uppercase font-semibold shadow-inner rounded-full h-10 w-10 text-lg ring-1 ring-white">
                      <LazyLoadingImage
                        className="absolute inset-0 w-10 h-10 object-cover rounded-full"
                        src={user?.avatar?.url}
                        alt={user?.avatar?.public_id}
                        height={"40"}
                        width={"40"}
                      />
                      <span className="wil-avatar__name">C</span>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div className="text-sm sm:text-base">
                      <span className="block font-semibold">{user?.name}</span>
                      <span className="block mt-0.5 text-slate-500 text-sm">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 prose prose-sm sm:prose sm:max-w-2xl">
                  <form onSubmit={handleSubmit(handleAddReviewForm)}>
                    <label
                      htmlFor="review"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {errors.review && (
                        <span className="text-red-500 font-medium">
                          Product review field is required!
                        </span>
                      )}
                    </label>
                    <textarea
                      id="review"
                      name="review"
                      type="text"
                      autoComplete="off"
                      placeholder="Enter your product review"
                      {...register("review", {
                        required: true,
                        maxLength: 500,
                      })}
                      className={`w-full form-textarea rounded-md ${
                        watch("review")?.length > 500 &&
                        "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      }`}
                      rows="3"
                    />
                    {isReviewLoading ? (
                      <button
                        type="submit"
                        className="w-full btn-primary"
                        disabled
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline w-4 h-4 mr-3 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                        Creating Review...
                      </button>
                    ) : (
                      <button type="submit" className="w-full btn-primary">
                        Create New Review
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDescription;
