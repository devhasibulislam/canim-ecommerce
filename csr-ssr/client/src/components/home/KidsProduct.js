import React from "react";
import LazyLoadingImage from "../LazyLoadingImage";
import { Link } from "react-router-dom";

const KidsProduct = () => {
  return (
    <>
      <div className="lg:pt-10">
        <div className="relative flex flex-col lg:flex-row lg:justify-end bg-yellow-50 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
          <div className="absolute inset-0">
            <LazyLoadingImage
              className="absolute w-full h-full object-contain"
              src="/assets/banner/banner-bg.svg"
              alt="backgroundLineSvg"
              height={"100%"}
              width={"100%"}
            />
          </div>
          <div className="lg:w-[45%] max-w-lg relative">
            <a
              className="ttnc-logo inline-block text-slate-600 w-28"
              href="/ciseco/"
            >
              <Link to="/">
                <LazyLoadingImage
                  src="/logo.png"
                  alt="logo"
                  className="block max-h-8 sm:max-h-10"
                  height={"150"}
                  width={"150"}
                />
              </Link>
            </a>
            <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
              Special offer <br />
              in kids products
            </h2>
            <span className="block mt-6 text-slate-500">
              Fashion is a form of self-expression and autonomy at a particular
              period and place.
            </span>
            <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
              <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000">
                Discover more
              </button>
            </div>
          </div>
          <div
            className="nc-NcImage relative block lg:absolute lg:left-0 lg:bottom-0 mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)]"
            data-nc-id="NcImage"
          >
            <LazyLoadingImage
              src="/assets/banner/banner-kid.png"
              className="object-cover w-full h-full"
              alt="nc-imgs"
              height={"100%"}
              width={"100%"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default KidsProduct;
