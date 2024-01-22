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

import React, { useEffect, useMemo, useState } from "react";
import Card from "../shared/Card";
import {
  useGetFilteredProductsMutation,
  useGetFilteredProductsQuery,
} from "@/services/product/productApi";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { setBrand, setCategory, setStore } from "@/features/filter/filterSlice";

const FilteredProducts = () => {
  const filter = useSelector((state) => state.filter);
  const [
    addFilter,
    { data: productsData, error: productsError, isLoading: productsLoading },
  ] = useGetFilteredProductsMutation();
  const products = useMemo(() => productsData?.data || [], [productsData]);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const store = searchParams.get("store");

  useEffect(() => {
    addFilter(new URLSearchParams(filter).toString());
  }, [filter, addFilter]);

  useEffect(() => {
    if (productsLoading) {
      toast.loading("Loading...", {
        id: "filtered-products",
      });
    }

    if (productsData) {
      toast.success(productsData?.description, {
        id: "filtered-products",
      });
    }

    if (productsError?.data) {
      toast.error(productsError?.data?.description, {
        id: "filtered-products",
      });
    }

    if (brand) dispatch(setBrand(brand));
    if (category) dispatch(setCategory(category));
    if (store) dispatch(setStore(store));
  }, [
    productsError,
    productsData,
    productsLoading,
    brand,
    category,
    store,
    dispatch,
  ]);

  return (
    <div className="lg:col-span-9 md:col-span-8 col-span-12">
      <div className="flex flex-col gap-y-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {productsLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((_, index) => (
                <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {products.map((product, index) => (
                <Card key={index} product={product} />
              ))}
            </>
          )}
        </div>
        {!productsLoading && products?.length === 0 && (
          <p className="text-center">Oops! No products found!</p>
        )}
      </div>
    </div>
  );
};

export default FilteredProducts;
