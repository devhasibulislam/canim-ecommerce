/**
 * Title: Write a program using JavaScript on SearchFilter
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
 * Date: 13, November 2023
 */

import Search from "@/components/icons/Search";
import React, { useEffect, useMemo, useState } from "react";
import Modal from "../Modal";
import { useGetProductsQuery } from "@/services/product/productApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchCard from "../skeletonLoading/SearchCard";
import { toast } from "react-hot-toast";
import Inform from "@/components/icons/Inform";

const SearchFilter = () => {
  const [open, setOpen] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: productsData,
    error: productsError,
    isLoading: productsLoading,
  } = useGetProductsQuery();
  const products = useMemo(() => productsData?.data || [], [productsData]);
  const router = useRouter();

  useEffect(() => {
    if (productsError) {
      toast.error(productsError?.data?.description, { id: "search-filter" });
    }
  }, [productsError]);

  const handleSearch = (event) => {
    setSearchTerm(event?.target?.value?.toLowerCase());
  };

  const filteredProducts = searchTerm?.length
    ? products.filter(({ title, summary }) => {
        const lowerTitle = title?.toLowerCase();
        const lowerSummary = summary?.toLowerCase();

        return (
          lowerTitle?.includes(searchTerm) || lowerSummary?.includes(searchTerm)
        );
      })
    : products;

  const highlightMatch = (text, keyword) => {
    if (!keyword) {
      return text;
    }

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/gi, "\\$&");
    const regex = new RegExp(escapedKeyword, "gi");

    let match;
    let result = text;

    while ((match = regex.exec(text)) !== null) {
      const startPos = match.index;
      const endPos = regex.lastIndex;
      const highlighted = `<mark>${text.substring(startPos, endPos)}</mark>`;
      result =
        result.substring(0, startPos) + highlighted + result.substring(endPos);
    }

    return result;
  };

  return (
    <>
      <button
        className="p-2 rounded-secondary hover:bg-slate-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <Search className="h-6 w-6" />
      </button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        className="lg:w-1/3 md:w-3/4 w-full h-96 md:mx-0 mx-4 !z-[9999] bg-white p-8 drop-shadow-2xl"
      >
        <div className="flex flex-col gap-y-4 h-full">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="🔎 Type any product's title or keyword..."
            className="!rounded w-full text-center"
            onChange={handleSearch}
          />
          <div className="flex flex-row items-center gap-x-2 text-xs">
            <hr className="flex-1" />
            Your Search Results
            <hr className="flex-1" />
          </div>
          <div className="overflow-y-auto scrollbar-hide flex flex-col gap-y-8 h-full">
            {filteredProducts?.length === 0 ? (
              <p className="text-sm flex flex-row gap-x-1 items-center justify-center">
                <Inform /> No Products Found!
              </p>
            ) : (
              <>
                {productsLoading ? (
                  <>
                    {[1, 2, 3, 4].map((_, index) => (
                      <SearchCard key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    {filteredProducts?.map((product) => {
                      const highlightedTitle = highlightMatch(
                        product?.title,
                        searchTerm
                      );
                      const highlightedSummary = highlightMatch(
                        product?.summary,
                        searchTerm
                      );

                      return (
                        <div
                          key={product?._id}
                          className="flex flex-row gap-x-2 cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/product?product_id=${
                                product?._id
                              }&product_title=${product?.title
                                .replace(/ /g, "-")
                                .toLowerCase()}}`
                            )
                          }
                        >
                          <Image
                            src={product?.thumbnail?.url}
                            alt={product?.thumbnail?.public_id}
                            width={50}
                            height={50}
                            className="rounded h-[50px] w-[50px] object-cover"
                          />
                          <article className="flex flex-col gap-y-2">
                            <div className="flex flex-col gap-y-0.5">
                              <h2
                                className="text-base"
                                dangerouslySetInnerHTML={{
                                  __html: highlightedTitle,
                                }}
                              />
                              <p
                                className="text-xs line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: highlightedSummary,
                                }}
                              />
                            </div>
                            <div className="flex flex-row justify-between gap-x-4 items-center">
                              <span className="text-xs flex flex-row items-baseline">
                                $
                                <span className="text-sm text-black">
                                  {product?.price}.00
                                </span>
                              </span>
                              <div className="flex flex-row gap-x-1">
                                <span className="whitespace-nowrap text-[10px] bg-purple-300/50 text-purple-500 border border-purple-500 px-1.5 rounded">
                                  {product?.store?.title}
                                </span>
                                <span className="whitespace-nowrap text-[10px] bg-indigo-300/50 text-indigo-500 border border-indigo-500 px-1.5 rounded">
                                  {product?.brand?.title}
                                </span>
                                <span className="whitespace-nowrap text-[10px] bg-blue-300/50 text-blue-500 border border-blue-500 px-1.5 rounded">
                                  {product?.category?.title}
                                </span>
                              </div>
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchFilter;
