import React from "react";
import LazyLoadingImage from "../LazyLoadingImage";

const BuyingSteps = () => {
  const steps = [
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-red-800 bg-red-100 relative">
          Step 1
        </span>
      ),
      title: "Filter & Discover",
      description: "Smart filtering and suggestions make it easy to find",
      thumbnail: "/assets/steps/step-1.png",
    },
    {
      badge: (
        <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-indigo-800 bg-indigo-100 relative">
          Step 2
        </span>
      ),
      title: "Add to bag",
      description: "Easily select the correct items and add them to the cart",
      thumbnail: "/assets/steps/step-2.png",
    },
    {
      badge: (
        <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-yellow-800 bg-yellow-100 relative">
          Step 3
        </span>
      ),
      title: "Fast Shipping",
      description: "The carrier will confirm and ship quickly to you",
      thumbnail: "/assets/steps/step-3.png",
    },
    {
      badge: (
        <span className="nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-purple-800 bg-purple-100 relative">
          Step 4
        </span>
      ),
      title: "Enjoy the product",
      description: "Have fun and enjoy your 5-star quality products",
      thumbnail: "/assets/steps/step-4.png",
    },
  ];

  return (
    <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
      <img
        className="hidden md:block absolute inset-x-0 top-5"
        src="/assets/steps/step-bg.svg"
        alt="vector"
      />
      {steps.map((step, index) => (
        <div
          key={index}
          className="relative flex flex-col items-center max-w-xs mx-auto"
        >
          <div
            className="nc-NcImage mb-4 sm:mb-10 max-w-[140px] mx-auto"
            data-nc-id="NcImage"
          >
            <LazyLoadingImage
              src={step.thumbnail}
              className="rounded-3xl"
              alt={step.title}
            />
          </div>
          <div className="text-center mt-auto space-y-5">
            {step.badge}
            <h3 className="text-base font-semibold">{step.title}</h3>
            <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6">
              {step.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BuyingSteps;
