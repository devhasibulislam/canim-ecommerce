import React from "react";
import ProductCard from "./ProductCard";
import DashboardLoading from "../loading/DashboardLoading";

const TrendingNow = ({ products, loading }) => {
  return (
    <>
      <section>
        <div className="nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 text-neutral-900">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold">
              What's trending now
            </h2>
            <span className="mt-2 md:mt-4 font-normal block text-base sm:text-lg text-neutral-500">
              Discover the most trending products in Ciseco.
            </span>
          </div>
        </div>
        {loading ? (
          <DashboardLoading />
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-8">
            {products?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        )}
        {!products?.length && !loading && (
          <div
            className="flex p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50"
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
              <span className="font-medium">Warning alert!</span> No product
              added yet!
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default TrendingNow;
