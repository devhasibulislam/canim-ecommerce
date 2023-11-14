import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { useDisplayStoresQuery } from "../../features/store/storeApi";
import { useDisplayCategoriesQuery } from "../../features/category/categoryApi";
import DashboardLoading from "../loading/DashboardLoading";
import CategoryCards from "./CategoryCards";
import StoreCards from "./StoreCards";
import { useDisplayBrandsQuery } from "../../features/brand/brandApi";
import BrandCards from "./BrandCards";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const StartExploring = () => {
  const [explore, setExplore] = useState("Brand");
  const [categoryLimit, setCategoryLimit] = useState(3);
  const [storeLimit, setStoreLimit] = useState(3);
  const [brandLimit, setBrandLimit] = useState(3);

  const tabHeaders = [
    {
      name: "Brand",
      icon: (
        <svg
          className=" w-4 h-4 sm:w-5 sm:h-5"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.7998 3.40005L7.19982 7.70005C7.09982 7.90005 6.99982 8.20005 6.89982 8.40005L5.19982 17C5.09982 17.6 5.39982 18.3 5.89982 18.6L11.1998 21.6C11.5998 21.8 12.2998 21.8 12.6998 21.6L17.9998 18.6C18.4998 18.3 18.7998 17.6 18.6998 17L16.9998 8.40005C16.9998 8.20005 16.7998 7.90005 16.6998 7.70005L13.0998 3.40005C12.4998 2.60005 11.4998 2.60005 10.7998 3.40005Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M16.8002 8.5L12.5002 20.7C12.3002 21.1 11.7002 21.1 11.6002 20.7L7.2002 8.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      ),
    },
    {
      name: "Category",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-hdd-stack-fill w-4 h-4 sm:w-5 sm:h-5"
          viewBox="0 0 16 16"
        >
          <path d="M2 9a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM2 2a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z" />
        </svg>
      ),
    },
    {
      name: "Store",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-basket3-fill w-4 h-4 sm:w-5 sm:h-5"
          viewBox="0 0 16 16"
        >
          <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
        </svg>
      ),
    },
  ];

  const { data: brandsData, isLoading: isBrandsLoading } =
    useDisplayBrandsQuery({ page: 1, limit: brandLimit });
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useDisplayCategoriesQuery({ page: 1, limit: categoryLimit });
  const { data: storesData, isLoading: isStoresLoading } =
    useDisplayStoresQuery({ page: 1, limit: 3 });

  const brands = brandsData?.data || [];
  const categories = categoriesData?.data || [];
  const stores = storesData?.data || [];

  return (
    <>
      <div className="relative py-24 lg:py-32">
        <div
          className="absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-[40px] z-0 bg-neutral-100/70"
          data-nc-id="BackgroundSection"
        ></div>
        <div className="relative" data-nc-id="SectionGridMoreExplore">
          <div>
            <div className="relative flex flex-col sm:flex-row sm:items-end justify-between mb-12 lg:mb-14 text-neutral-900">
              <div className="flex flex-col items-center text-center w-full mx-auto">
                <h2 className="justify-center text-3xl md:text-4xl 2xl:text-5xl font-semibold">
                  Start exploring.
                </h2>
              </div>
            </div>
            <div className="mb-12 lg:mb-14 relative flex flex-col w-full text-sm md:text-base">
              <Tab.Group>
                <Tab.List className="nc-Nav mb-12 lg:mb-14 relative flex justify-center w-full text-sm md:text-base">
                  <ul className="flex  p-1 bg-white rounded-full shadow-lg overflow-x-auto hiddenScrollbar">
                    {tabHeaders.map((tabHeader, index) => (
                      <li className="relative" key={index}>
                        <Tab
                          key={index}
                          onClick={() => setExplore(tabHeader.name)}
                          className={({ selected }) =>
                            classNames(
                              "block font-medium whitespace-nowrap px-3.5 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full focus:outline-none",
                              selected
                                ? "block font-medium whitespace-nowrap px-3.5 py-2 text-sm sm:px-7 sm:py-3 capitalize rounded-full bg-slate-900 !text-white focus:outline-none"
                                : "text-slate-900 hover:bg-white/[0.12] hover:text-black"
                            )
                          }
                        >
                          <div className="flex items-center justify-center space-x-1.5 sm:space-x-2.5 text-xs sm:text-sm">
                            <span className="inline-block">
                              {tabHeader.icon}
                            </span>
                            <span>{tabHeader.name}</span>
                          </div>
                        </Tab>
                      </li>
                    ))}
                  </ul>
                </Tab.List>
                <Tab.Panels className="grid gap-4 md:gap-7 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                  {(isCategoriesLoading ||
                    isStoresLoading ||
                    isBrandsLoading) && (
                    <div className="xl:col-span-3 md:col-span-2 col-span-1 w-full h-full">
                      <DashboardLoading />
                    </div>
                  )}

                  {!isStoresLoading && explore === "Store" && (
                    <StoreCards stores={stores} />
                  )}
                  {!isCategoriesLoading && explore === "Category" && (
                    <CategoryCards categories={categories} />
                  )}
                  {!isBrandsLoading && explore === "Brand" && (
                    <BrandCards brands={brands} />
                  )}
                </Tab.Panels>
                {(explore === "Store" && !stores?.length) ||
                (explore === "Category" && !categories?.length) ||
                (explore === "Brand" && !brands?.length) ? (
                  <div
                    className="flex p-4 my-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 justify-center"
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
                      explorer added yet!
                    </div>
                  </div>
                ) : (
                  <div className="flex mt-16 justify-center items-center">
                    <button
                      className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
                      onClick={() => {
                        (explore === "Category" &&
                          !isCategoriesLoading &&
                          setCategoryLimit(categoryLimit + 3)) ||
                          (explore === "Store" &&
                            !isStoresLoading &&
                            setStoreLimit(storeLimit + 3)) ||
                          (explore === "Brand" &&
                            !isBrandsLoading &&
                            setBrandLimit(brandLimit + 3));
                      }}
                    >
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5"
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
                          strokeWidth="3"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Show me more
                    </button>
                  </div>
                )}
              </Tab.Group>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartExploring;
