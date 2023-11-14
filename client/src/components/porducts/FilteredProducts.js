/**
 * Title: Write a program using JavaScript on FilteredProducts
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
 * Date: 04, November 2023
 */

"use client";

import React, { useEffect, useState } from "react";
import Card from "../shared/Card";
import {
  useGetFilteredProductsMutation,
  useGetFilteredProductsQuery,
} from "@/services/product/productApi";
import { useSelector } from "react-redux";

const FilteredProducts = () => {
  const { filterCredentials } = useSelector((state) => state.productFilter);
  const [addFilter, { data: productsData, isError: productsError }] =
    useGetFilteredProductsMutation();
  const products = productsData?.data || [];

  useEffect(() => {
    addFilter(filterCredentials);
  }, [filterCredentials]);

  useEffect(() => {
    if (productsError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [productsError]);

  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12">
      <div className="flex flex-col gap-y-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilteredProducts;
