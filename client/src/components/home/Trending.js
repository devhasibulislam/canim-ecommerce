/**
 * Title: Write a program using JavaScript on Trending
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
 * Date: 17, October 2023
 */

"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import Spinner from "../shared/Spinner";
import { useRouter } from "next/navigation";
import { useGetProductsQuery } from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";

const Trending = () => {
  const router = useRouter();
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, { id: "trending" });
    }
  }, [productsError]);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-1">
          <h1 className="text-4xl">
            What&lsquo;s <span className="">Trending Now</span>
          </h1>
          <p className="text-base">
            Discover the most trending products in Canim.
          </p>
        </div>
        <div className="flex flex-col gap-y-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
            {productsLoading ? (
              <>
                {[1, 2, 3, 4].map((_, index) => (
                  <ProductCard key={index} />
                ))}
              </>
            ) : (
              <>
                {products?.slice(-8)?.map((product, index) => (
                  <Card key={index} product={product} />
                ))}
              </>
            )}
          </div>
          <button
            className="px-8 py-4 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow w-fit mx-auto flex flex-row gap-x-2 items-center"
            onClick={() => router.push("/products")}
          >
            Show Me More
          </button>
        </div>
        {!productsLoading && products?.length === 0 && (
          <p className="text-sm">Oops! No products found!</p>
        )}
      </section>
    </Container>
  );
};

export default Trending;
