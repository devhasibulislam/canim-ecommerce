/**
 * Title: Write a program using JavaScript on Banner1
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

import React from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import Container from "../shared/Container";
import { useRouter } from "next/navigation";

const Banner1 = () => {
  const router = useRouter();

  return (
    <Container>
      <div
        className="bg-[#f8f0ea] h-full w-full rounded-primary relative flex flex-col gap-y-8 lg:p-24 pt-8 pb-0"
        style={{ backgroundImage: "url(/assets/home/banner/dots.svg)" }}
      >
        <Image
          src="/assets/home/banner/model1.png"
          alt="model"
          height={872}
          width={500}
          className="lg:absolute bottom-0 right-0 order-2 lg:w-[500px] lg:ml-0 md:ml-auto"
        />
        <article className="flex flex-col justify-start items-end order-1 px-8">
          <div className="flex flex-col gap-y-4 max-w-lg z-20 mr-auto">
            <h1 className="md:text-6xl text-4xl">
              Sports Equipment Collection.
            </h1>
            <p className="flex flex-row gap-x-0.5 items-center text-lg text-black">
              In this season, find your desire
              <AiTwotoneFire className="text-[#ffa384] w-6 h-6 drop-shadow" />
            </p>
            <button
              className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mt-4"
              onClick={() => router.push("https://devhasibulislam.vercel.app/")}
            >
              Start Your Queries
            </button>
          </div>
        </article>
      </div>
    </Container>
  );
};

export default Banner1;
