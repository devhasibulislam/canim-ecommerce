import React from "react";
import * as Carousel from "../Carousel";
import GrayText from "./GrayText";

import { Link } from "react-router-dom";
import LazyLoadingImage from "../LazyLoadingImage";
import DashboardLoading from "../loading/DashboardLoading";

const NewArrivals = ({ products, loading, type }) => {
  return (
    <>
      {loading ? (
        <DashboardLoading />
      ) : products?.length ? (
        <div className="flex flex-col gap-y-8 !relative">
          <div className="lg:mb-8 mb-6">
            <h2 className=" text-3xl md:text-4xl font-semibold">
              New Arrivals<span className="">. </span>
              <GrayText>New Sports equipment</GrayText>
            </h2>
          </div>
          <div>
            <Carousel.Component
              options={{
                type: type, // carousel or slide
                perView: 4,
                gap: 30,
                breakpoints: {
                  576: {
                    perView: 1,
                  },
                  768: {
                    perView: 2,
                  },
                  820: {
                    perView: 3,
                  },
                  1024: {
                    perView: 4,
                  },
                },
              }}
            >
              {products?.map(
                ({
                  _id,
                  title,
                  description,
                  thumbnail,
                  subcategory,
                  price,
                  review,
                }) => (
                  <Carousel.Slide key={_id}>
                    <div
                      className="relative flex flex-col bg-transparent"
                      data-nc-id="ProductCard"
                    >
                      <Link
                        className="absolute inset-0"
                        to={`/product/${title
                          ?.toLowerCase()
                          .replace(/\s/g, "-")}/${_id}`}
                      ></Link>
                      <div className="relative flex-shrink-0 bg-slate-50 rounded-3xl overflow-hidden z-1 group">
                        <Link
                          className="block"
                          to={`/product/${title
                            ?.toLowerCase()
                            .replace(/\s/g, "-")}/${_id}`}
                        >
                          <div
                            className="nc-NcImage flex aspect-w-11 aspect-h-12 w-full h-0"
                            data-nc-id="NcImage"
                          >
                            <LazyLoadingImage
                              height={"322"}
                              width={"296"}
                              src={thumbnail.url}
                              alt={thumbnail.public_id}
                              className="max-w-full object-contain w-full h-full drop-shadow-xl"
                            />
                          </div>
                        </Link>
                        <div className="nc-shadow-lg rounded-full flex items-center justify-center absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white text-slate-700">
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
                          <span className="ml-1 leading-none">
                            {subcategory.title}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                        <div>
                          <h2
                            className="text-base font-semibold text-black line-clamp-1"
                            title={title}
                          >
                            <title>{title}</title>
                            {title}
                          </h2>
                          <p className="text-sm font-normal text-slate-500 mt-1 line-clamp-2">
                            {description}
                          </p>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="">
                            <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                              <span className="text-green-500 !leading-none">
                                ৳{price}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center mb-0.5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-5 h-5 pb-[1px] text-amber-400"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="text-sm ml-1 text-slate-500">
                              N/A ({review?.length} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Carousel.Slide>
                )
              )}
            </Carousel.Component>
          </div>
        </div>
      ) : (
        <div
          className="flex p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 justify-center"
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
            <span className="font-medium">Warning alert!</span> No product added
            yet!
          </div>
        </div>
      )}
    </>
  );
};

export default NewArrivals;

/**
 * How to use Glide.JS with React.JS
 * https://www.youtube.com/watch?v=kpAt25cOBrU&t=87s
 * https://github.com/glidejs/glide/issues/366#issuecomment-844153173
 * https://codesandbox.io/s/relaxed-ardinghelli-42jqt?file=/src/App.js
 */
