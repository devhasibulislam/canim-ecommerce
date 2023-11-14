import React from "react";
import * as Carousel from "../Carousel";
import DashboardLoading from "../loading/DashboardLoading";
import GrayText from "./GrayText";
import { Link } from "react-router-dom";
import LazyLoadingImage from "../LazyLoadingImage";

const ExpertChoice = ({ products, loading, type }) => {
  return (
    <>
      {loading ? (
        <DashboardLoading />
      ) : products?.length ? (
        <div className="flex flex-col gap-y-8 !relative">
          <div className="lg:mb-8 mb-6">
            <h2 className=" text-3xl md:text-4xl font-semibold">
              Chosen by<span className="">. </span>
              <GrayText>Our Experts</GrayText>
            </h2>
          </div>
          <div>
            <Carousel.Component
              options={{
                type: type, // carousel or slide
                perView: 3,
                gap: 30,
                breakpoints: {
                  576: {
                    perView: 1,
                  },
                  768: {
                    perView: 2,
                  },
                  820: {
                    perView: 2,
                  },
                  1024: {
                    perView: 3,
                  },
                },
              }}
            >
              {products?.map(
                ({
                  _id,
                  title,
                  thumbnail,
                  gallery,
                  subcategory,
                  price,
                  review,
                }) => (
                  <Carousel.Slide key={_id}>
                    <div className="CollectionCard2 group relative undefined">
                      <div className="relative flex flex-col">
                        <div
                          className="nc-NcImage aspect-w-8 aspect-h-5 bg-neutral-100 rounded-2xl overflow-hidden"
                          data-nc-id="NcImage"
                        >
                          <LazyLoadingImage
                            height={"253"}
                            width={"405"}
                            src={thumbnail.url}
                            alt={thumbnail.public_id}
                            className="object-contain max-w-full w-[405px] h-[253px] rounded-2xl"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 mt-2.5">
                          {gallery?.slice(0, 3)?.map((image) => (
                            <div
                              key={image._id}
                              className="w-full h-24 sm:h-28"
                              data-nc-id="NcImage"
                            >
                              <LazyLoadingImage
                                height={"112"}
                                width={"128"}
                                src={image.url}
                                alt={image.public_id}
                                className={`object-cover max-w-full w-[128px] h-[112px] rounded-2xl`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative mt-5 flex justify-between">
                        <div className="flex-1">
                          <h2 className="font-semibold text-lg sm:text-xl line-clamp-1 text-black">
                            {title}
                          </h2>
                          <div className="mt-3 flex items-center text-slate-500">
                            <span className="text-sm">
                              <span className="line-clamp-1">
                                {subcategory?.title}
                              </span>
                            </span>
                            <span className="h-5 mx-1 sm:mx-2 border-l border-slate-200"></span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                              className="w-4 h-4 text-orange-400"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                            <span className="text-sm ml-1">
                              <span className="line-clamp-1">
                                N/A (${review?.length} reviews)
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="mt-0.5 sm:mt-1 ml-4">
                          <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                            <span className="text-green-500 !leading-none">
                              ৳{price}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        className="absolute inset-0"
                        to={`/product/${title
                          ?.toLowerCase()
                          .replace(/\s/g, "-")}/${_id}`}
                      ></Link>
                    </div>
                  </Carousel.Slide>
                )
              )}
              <Carousel.Slide>
                <div className="relative rounded-2xl overflow-hidden h-[410px]">
                  <div className="h-[410px] bg-black/5"></div>
                  <div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                    <Link
                      to="/products/all"
                      className="flex items-center justify-center relative"
                    >
                      <span className="text-xl font-semibold text-black">
                        More items
                      </span>
                      <svg
                        className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform text-black"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          stroke-miterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M12 20.4999V3.66992"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          stroke-miterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </Link>
                    <span className="text-sm mt-1 text-black">
                      Show me more
                    </span>
                  </div>
                </div>
              </Carousel.Slide>
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

export default ExpertChoice;
