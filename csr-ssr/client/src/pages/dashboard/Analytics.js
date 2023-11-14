import React from "react";
import { useDisplayUsersQuery } from "../../features/auth/authApi";
import { useDisplayCategoriesQuery } from "../../features/category/categoryApi";
import { useDisplaySubcategoriesQuery } from "../../features/subcategory/subcategoryApi";
import { useDisplayBrandsQuery } from "../../features/brand/brandApi";
import { useDisplayStoresQuery } from "../../features/store/storeApi";
import { useDisplayProductsQuery } from "../../features/product/productApi";
import DashboardLoading from "../../components/loading/DashboardLoading";
import LazyLoadingImage from "../../components/LazyLoadingImage";
import { Link } from "react-router-dom";

const Analytics = () => {
  const { data: userData, isLoading: isUserLoading } = useDisplayUsersQuery({
    page: 1,
    limit: 1,
  });
  const { data: categoryData, isLoading: isCategoryLoading } =
    useDisplayCategoriesQuery({ page: 1, limit: 1 });
  const { data: subcategoryData, isLoading: isSubcategoryLoading } =
    useDisplaySubcategoriesQuery({ page: 1, limit: 1 });
  const { data: brandData, isLoading: isBrandLoading } = useDisplayBrandsQuery({
    page: 1,
    limit: 1,
  });
  const { data: storeData, isLoading: isStoreLoading } = useDisplayStoresQuery({
    page: 1,
    limit: 1,
  });
  const { data: productData, isLoading: isProductLoading } =
    useDisplayProductsQuery({ page: 1, limit: 1 });

  const userCount = userData?.count;
  const categoryCount = categoryData?.count;
  const subcategoryCount = subcategoryData?.count;
  const brandCount = brandData?.count;
  const storeCount = storeData?.count;
  const productCount = productData?.count;

  const analytics = [
    {
      name: "User",
      icon: "/assets/analytics/User.png",
      count: userCount,
    },
    {
      name: "Category",
      icon: "/assets/analytics/Category.png",
      count: categoryCount,
    },
    {
      name: "Subcategory",
      icon: "/assets/analytics/Subcategory.png",
      count: subcategoryCount,
    },
    {
      name: "Brand",
      icon: "/assets/analytics/Brand.png",
      count: brandCount,
    },
    {
      name: "Store",
      icon: "/assets/analytics/Store.png",
      count: storeCount,
    },
    {
      name: "Product",
      icon: "/assets/analytics/Product.png",
      count: productCount,
    },
  ];

  return (
    <>
      {isUserLoading ||
      isCategoryLoading ||
      isSubcategoryLoading ||
      isBrandLoading ||
      isStoreLoading ||
      isProductLoading ? (
        <DashboardLoading />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
          {analytics.map(({ name, icon, count }, index) => (
            <div
              key={index}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow relative flex flex-col gap-y-4"
            >
              <div className="absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
                {count}
              </div>
              <LazyLoadingImage
                src={icon}
                alt={name}
                width={"40"}
                height={"40"}
                className={"w-10 h-10 object-contain"}
              />
              <h5 className="text-2xl font-semibold tracking-tight text-gray-900">
                {name}
              </h5>

              <div className="flex items-center text-slate-500">
                <span className="text-sm ">
                  <Link
                    className="flex gap-x-2 line-clamp-1"
                    to={`/dashboard/add-new-${name?.toLowerCase()}`}
                  >
                    Add
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                  </Link>
                </span>
                <span className="h-5 mx-1 sm:mx-2 border-l border-slate-200"></span>
                <span className="text-sm ml-1 ">
                  <Link
                    className="flex gap-x-2 whitespace-nowrap text-ellipsis overflow-hidden"
                    to={`/dashboard/list-${name?.toLowerCase()}`}
                  >
                    View
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                    </svg>
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Analytics;
