import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDisplayProductsQuery } from "../../features/product/productApi";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [input, setInput] = React.useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState({});
  const { data: productsData, isLoading: isProductsLoading } =
    useDisplayProductsQuery({ page: 0, limit: 0 });
  const navigate = useNavigate();

  const products = productsData?.data || [];

  const handleSearchKeyword = (searchWord) => {
    const filteredProducts = products.filter((product) =>
      product.title?.toLowerCase().includes(searchWord?.toLowerCase())
    );
    setInput(searchWord);
    setSearchedProducts(filteredProducts);
  };

  const handleInputSearch = (event) => {
    event.preventDefault();

    navigate(`/product/${searchProduct?.title}/${searchProduct?._id}`);
  };

  return (
    <>
      <div className="flex flex-col md:gap-y-16 gap-y-8 lg:z-auto z-20 h-full justify-center relative lg:left-[113px]">
        <h1 className="md:text-7xl text-3xl font-bold leading-[115%] lg:text-black text-white lg:drop-shadow-none md:drop-shadow-2xl lg:text-left text-center">
          Start your search <br /> by typing
        </h1>
        <div className="relative z-20">
          <form
            className="bg-white md:rounded-2xl rounded md:p-3 p-2 flex items-center lg:max-w-xl w-4/5 lg:mx-0 mx-auto overflow-hidden shadow-lg"
            onSubmit={handleInputSearch}
          >
            <input
              className="flex-auto lg:text-lg md:text-2xl text-sm font-normal py-2 pl-4 border-none outline-none focus:ring-0 md:rounded-2xl rounded"
              type="text"
              name="search"
              id="search"
              placeholder="Product Name"
              autoComplete="off"
              value={input}
              onChange={(e) => handleSearchKeyword(e.target.value)}
            />
            <button
              className="p-2 md:rounded-xl rounded bg-[#fea285] hover:bg-[#dd89e3] hover:transition-all hover:duration-300 md:h-14 md:w-14 h-9 w-9 grid md:place-items-center content-center justify-center"
              disabled={input.length === 0}
            >
              {isProductsLoading ? (
                <svg
                  className="animate-spin text-white md:h-8 md:w-8 h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="3"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <MagnifyingGlassIcon className="text-white md:h-8 md:w-8 h-6 w-6" />
              )}
            </button>
          </form>
          {searchedProducts?.length !== 0 && (
            <div className="absolute left-0 right-0 lg:right-full min-h-fit max-h-36 overflow-y-scroll overflow-x-hidden scrollbar-hide p-4 shadow-2xl z-50 lg:max-w-xl w-4/5 mx-auto bg-white mt-4 md:rounded-2xl rounded flex flex-col gap-y-1">
              {searchedProducts.map(({ _id, title, description }) => (
                <div
                  key={_id}
                  className="cursor-pointer py-2 px-3 rounded-xl hover:bg-slate-100"
                  onClick={() => {
                    setInput(title);
                    setSearchedProducts([]);
                    setSearchProduct({ _id, title });
                  }}
                >
                  <p className="text-sm font-medium text-gray-600 line-clamp-1">
                    {title}
                  </p>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Searchbar;
