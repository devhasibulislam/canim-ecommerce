/**
 * Title: Write a program using JavaScript on FilterSidebar
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

import {
  addProductFilter,
  clearProductFilter,
} from "@/features/productFilter/productFilterSlice";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import { useGetStoresQuery } from "@/services/store/storeApi";
import React, { useEffect } from "react";
import { AiOutlineReload } from "react-icons/ai";
import { BiSolidStar } from "react-icons/bi";
import { useDispatch } from "react-redux";
import SelectCard from "../shared/skeletonLoading/SelectCard";

const FilterSidebar = ({ searchParams }) => {
  const {
    data: brandsData,
    isError: brandsError,
    isLoading: brandsLoading,
  } = useGetBrandsQuery();
  const {
    data: categoriesData,
    isError: categoriesError,
    isLoading: categoriesLoading,
  } = useGetCategoriesQuery();
  const {
    data: storesData,
    isError: storesError,
    isLoading: storesLoading,
  } = useGetStoresQuery();
  const dispatch = useDispatch();

  const brands = brandsData?.data || [];
  const categories = categoriesData?.data || [];
  const stores = storesData?.data || [];

  useEffect(() => {
    if (brandsError || categoriesError || storesError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [brandsError, categoriesError, storesError]);

  return (
    <aside className="lg:col-span-3 md:col-span-4 col-span-12">
      <section className="flex flex-col gap-y-4 md:sticky md:top-4">
        {/* reset */}
        <div className="flex flex-row items-center justify-between border py-2 px-4 rounded">
          <h2 className="text-lg">Filters Reset</h2>
          <button
            className="p-1 border rounded-secondary"
            onClick={() => {
              // Clear the filter
              dispatch(clearProductFilter());

              // Uncheck all checkboxes for categories
              categories.forEach((category) => {
                document.getElementById(category._id).checked = false;
              });

              // Uncheck all checkboxes for brands
              brands.forEach((brand) => {
                document.getElementById(brand._id).checked = false;
              });

              // Uncheck all checkboxes for stores
              stores.forEach((store) => {
                document.getElementById(store._id).checked = false;
              });
            }}
          >
            <AiOutlineReload className="h-5 w-5" />
          </button>
        </div>

        {/* Choose Category */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl">
          <h2 className="text-lg">Choose Category</h2>
          <div className="flex flex-col gap-y-2.5">
            {categoriesLoading || categories?.length === 0 ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <SelectCard key={index} />
                ))}
              </>
            ) : (
              <>
                {categories.map((category) => (
                  <label
                    key={category._id}
                    htmlFor={category._id}
                    className="text-sm flex flex-row items-center gap-x-1.5"
                  >
                    <input
                      type="checkbox"
                      name={category._id}
                      id={category._id}
                      value={category._id}
                      className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
                      onChange={() => {
                        const filterType = "categories";
                        const selectedItems = categories
                          .filter((c) => document.getElementById(c._id).checked)
                          .map((c) => c._id);
                        dispatch(addProductFilter([filterType, selectedItems]));
                      }}
                    />
                    {category.title}
                  </label>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Choose Brand */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl">
          <h2 className="text-lg">Choose Brand</h2>
          <div className="flex flex-col gap-y-2.5">
            {brandsLoading || brands?.length === 0 ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <SelectCard key={index} />
                ))}
              </>
            ) : (
              <>
                {brands.map((brand) => (
                  <label
                    key={brand._id}
                    htmlFor={brand._id}
                    className="text-sm flex flex-row items-center gap-x-1.5"
                  >
                    <input
                      type="checkbox"
                      name={brand._id}
                      id={brand._id}
                      value={brand._id}
                      className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
                      onChange={() => {
                        const filterType = "brands";
                        const selectedItems = brands
                          .filter((b) => document.getElementById(b._id).checked)
                          .map((b) => b._id);
                        dispatch(addProductFilter([filterType, selectedItems]));
                      }}
                    />
                    {brand.title}
                  </label>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Choose Store */}
        <div className="flex flex-col gap-y-4 border py-2 px-4 rounded-xl">
          <h2 className="text-lg">Choose Store</h2>
          <div className="flex flex-col gap-y-2.5">
            {storesLoading || stores?.length === 0 ? (
              <>
                {[1, 2, 3].map((_, index) => (
                  <SelectCard key={index} />
                ))}
              </>
            ) : (
              <>
                {stores.map((store) => (
                  <label
                    key={store._id}
                    htmlFor={store._id}
                    className="text-sm flex flex-row items-center gap-x-1.5"
                  >
                    <input
                      type="checkbox"
                      name={store._id}
                      id={store._id}
                      value={store._id}
                      className="rounded-secondary checked:bg-primary checked:text-black checked:outline-none checked:ring-0 checked:border-0 focus:outline-none focus:ring-0 focus:border-1"
                      onChange={() => {
                        const filterType = "stores";
                        const selectedItems = stores
                          .filter((s) => document.getElementById(s._id).checked)
                          .map((s) => s._id);
                        dispatch(addProductFilter([filterType, selectedItems]));
                      }}
                    />
                    {store.title}
                  </label>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </aside>
  );
};

export default FilterSidebar;
