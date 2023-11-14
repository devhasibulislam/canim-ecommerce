/**
 * Title: Write a program using JavaScript on Steps
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
 * Date: 09, October 2023
 */

import Image from "next/image";
import React from "react";
import Container from "../shared/Container";

const Steps = () => {
  const steps = [
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-red-800 bg-red-100 relative">
          Step 1
        </span>
      ),
      title: "Filter & Discover",
      description: "Smart filtering and suggestions make it easy to find",
      thumbnail: "/assets/home/steps/step-1.png",
    },
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-indigo-800 bg-indigo-100 relative">
          Step 2
        </span>
      ),
      title: "Add to bag",
      description: "Easily select the correct items and add them to the cart",
      thumbnail: "/assets/home/steps/step-2.png",
    },
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-yellow-800 bg-yellow-100 relative">
          Step 3
        </span>
      ),
      title: "Fast Shipping",
      description: "The carrier will confirm and ship quickly to you",
      thumbnail: "/assets/home/steps/step-3.png",
    },
    {
      badge: (
        <span className="inline-flex px-2.5 py-1 rounded-secondary text-xs text-purple-800 bg-purple-100 relative">
          Step 4
        </span>
      ),
      title: "Enjoy the product",
      description: "Have fun and enjoy your 5-star quality products",
      thumbnail: "/assets/home/steps/step-4.png",
    },
  ];

  return (
    <Container>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <picture>
          <source srcSet="/assets/home/steps/step-bg.svg" type="image/svg" />
          <img
            className="hidden md:block absolute inset-x-0 top-5"
            src="/assets/home/steps/step-bg.svg"
            alt="vector"
          />
        </picture>
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col gap-y-8 items-center max-w-xs mx-auto"
          >
            <div className="max-w-[100px] mx-auto">
              <Image
                src={step.thumbnail}
                alt={step.title}
                height={100}
                width={100}
                className="w-[100px] h-[100px] object-contain"
              />
            </div>
            <div className="flex flex-col gap-y-4 items-center justify-center">
              {step.badge}
              <h2 className="text-base">{step.title}</h2>
              <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6 text-center">
                {step.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Steps;
