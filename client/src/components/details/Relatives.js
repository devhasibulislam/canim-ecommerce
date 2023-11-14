/**
 * Title: Write a program using JavaScript on NewArrivals
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
 * Date: 10, October 2023
 */

"use client";

import React, { useEffect } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";

const Relatives = () => {
  const router = useRouter();

  const {
    data: productsData,
    isError: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = productsData?.data || [];

  useEffect(() => {
    if (productsError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [productsError]);

  return (
    <section className="flex flex-col gap-y-10">
      <h1 className="text-4xl">
        Related. <span className="">Products</span>
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
        {productsLoading || products?.length === 0 ? (
          <>
            {[1, 2, 3, 4].map((_, index) => (
              <ProductCard key={index} />
            ))}
          </>
        ) : (
          <>
            {products?.slice(0, 8)?.map((product, index) => (
              <Card key={index} product={product} />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default Relatives;
