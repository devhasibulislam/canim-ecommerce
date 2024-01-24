/**
 * Title: Write a program using JavaScript on Page
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
 * Date: 15, January 2024
 */

"use client";

import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Dashboard from "@/components/shared/layouts/Dashboard";
import useGetColors from "@/libs/useGetColors";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/services/product/productApi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  /* thumbnail states */
  const [productThumbnail, setProductThumbnail] = useState(null);
  const [productThumbnailPreview, setProductThumbnailPreview] = useState(null);

  /* gallery states */
  const [productGallery, setProductGallery] = useState([]);
  const [productGalleryPreviews, setProductGalleryPreviews] = useState([]);

  /* colors and sizes hooks */
  const colors = useGetColors() || [];
  const sizes = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];

  /* user state hook */
  const user = useSelector((state) => state.auth.user);

  /* catch query */
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  /* state up product credentials */
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productSummary, setProductSummary] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCampaign, setProductCampaign] = useState({
    title: "",
    state: "",
  });
  const [productVariations, setProductVariations] = useState({
    colors: [],
    sizes: [],
  });
  const [productFeatures, setProductFeatures] = useState([
    { title: "", content: [""] },
  ]);

  /* get product | update product | get brands | get categories hooks */
  const {
    isLoading: fetchingProduct,
    data: fetchProductData,
    error: fetchProductError,
  } = useGetProductQuery(id);
  const product = useMemo(
    () => fetchProductData?.data || [],
    [fetchProductData]
  );
  const [
    updateProduct,
    {
      isLoading: updatingProduct,
      data: updateProductData,
      error: updateProductError,
    },
  ] = useUpdateProductMutation();
  const {
    isLoading: fetchingBrands,
    data: fetchBrandsData,
    error: fetchBrandsError,
  } = useGetBrandsQuery();
  const brands = useMemo(() => fetchBrandsData?.data || [], [fetchBrandsData]);
  const {
    isLoading: fetchingCategories,
    data: fetchCategoriesData,
    error: fetchCategoriesError,
  } = useGetCategoriesQuery();
  const categories = useMemo(
    () => fetchCategoriesData?.data || [],
    [fetchCategoriesData]
  );

  /* handle thumbnail preview */
  const handleProductThumbnailPreview = (e) => {
    const file = e.target.files[0];
    setProductThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* handle gallery preview */
  const handleProductGalleryPreviews = (e) => {
    const files = e.target.files;

    if (files.length > 5) {
      toast.error("Maximum 5 images can be uploaded");
      window.location.reload();
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        setProductGallery(files);
      }
    }

    const previews = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setProductGalleryPreviews(previews);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  /* product features criteria */
  function handleAddFeature() {
    setProductFeatures((prevFeatures) => [
      ...prevFeatures,
      { title: "", content: [""] },
    ]);
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...productFeatures];
    updatedFeatures.splice(index, 1);
    setProductFeatures(updatedFeatures);
  };

  const handleInputChange = (index, field, value) => {
    // Make a deep copy of the features array
    const updatedFeatures = JSON.parse(JSON.stringify(productFeatures));

    // Modify the copy
    updatedFeatures[index][field] = value;

    // Update the state with the modified copy
    setProductFeatures(updatedFeatures);
  };

  const handleAddContent = (featureIndex) => {
    setProductFeatures((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        content: [...updatedFeatures[featureIndex].content, ""],
      };
      return updatedFeatures;
    });
  };

  const handleRemoveContent = (featureIndex, contentIndex) => {
    setProductFeatures((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        content: updatedFeatures[featureIndex].content.filter(
          (_, index) => index !== contentIndex
        ),
      };
      return updatedFeatures;
    });
  };

  const handleContentChange = (featureIndex, contentIndex, value) => {
    const updatedFeatures = [...productFeatures];
    updatedFeatures[featureIndex].content[contentIndex] = value;
    setProductFeatures(updatedFeatures);
  };

  /* visible states in toast */
  useEffect(() => {
    if (fetchingProduct) {
      toast.loading("Fetching Product...", { id: "fetchProduct" });
    }

    if (fetchProductData) {
      toast.success(fetchProductData?.description, { id: "fetchProduct" });
    }

    if (fetchProductError) {
      toast.error(fetchProductError?.data?.description, { id: "fetchProduct" });
    }

    if (updatingProduct) {
      toast.loading("Updating Product...", { id: "updateProduct" });
    }

    if (updateProductData) {
      toast.success(updateProductData?.description, { id: "updateProduct" });
    }

    if (updateProductError) {
      toast.error(updateProductError?.data?.description, {
        id: "updateProduct",
      });
    }

    if (fetchingBrands) {
      toast.loading("Fetching Brands...", { id: "fetchBrands" });
    }

    if (fetchBrandsData) {
      toast.success(fetchBrandsData?.description, { id: "fetchBrands" });
    }

    if (fetchBrandsError) {
      toast.error(fetchBrandsError?.data?.description, { id: "fetchBrands" });
    }

    if (fetchingCategories) {
      toast.loading("Fetching Categories...", { id: "fetchCategories" });
    }

    if (fetchCategoriesData) {
      toast.success(fetchCategoriesData?.description, {
        id: "fetchCategories",
      });
    }

    if (fetchCategoriesError) {
      toast.error(fetchCategoriesError?.data?.description, {
        id: "fetchCategories",
      });
    }

    if (product) {
      setProductTitle(product?.title);
      setProductPrice(product?.price);
      setProductSummary(product?.summary);
      setProductBrand(product?.brand?._id);
      setProductCategory(product?.category?._id);
      setProductCampaign(product?.campaign);
      setProductVariations(product?.variations);
      setProductFeatures(product?.features);
      setProductGalleryPreviews(product?.gallery);
      setProductThumbnailPreview(product?.thumbnail);
    }
  }, [
    fetchingProduct,
    fetchProductData,
    fetchProductError,
    updatingProduct,
    updateProductData,
    updateProductError,
    fetchingBrands,
    fetchBrandsData,
    fetchBrandsError,
    fetchingCategories,
    fetchCategoriesData,
    fetchCategoriesError,
    product,
  ]);

  /* update product */
  function handleUpdateProduct(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", productTitle);
    formData.append("summary", productSummary);
    formData.append("price", productPrice);

    if (productThumbnail) {
      formData.append("thumbnail", productThumbnail);
    }

    if (productGallery.length > 0) {
      for (let i = 0; i < productGallery.length; i++) {
        formData.append("gallery", productGallery[i]);
      }
    }

    formData.append("features", JSON.stringify(productFeatures));

    formData.append(
      "campaign",
      JSON.stringify({
        title: productCampaign.title,
        state: productCampaign.state,
      })
    );

    formData.append(
      "variations",
      JSON.stringify({
        colors: productVariations.colors,
        sizes: productVariations.sizes,
      })
    );

    formData.append("brand", productBrand);
    formData.append("category", productCategory);

    updateProduct({ id, body: formData });
  }

  return (
    <Dashboard>
      <form
        action=""
        className="w-full flex flex-col gap-y-4"
        onSubmit={handleUpdateProduct}
      >
        {/* thumbnail & gallery */}
        <div className="w-full flex flex-row gap-x-4">
          {/* thumbnail */}
          <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
            {productThumbnailPreview && (
              <Image
                src={productThumbnailPreview?.url || productThumbnailPreview}
                alt={productThumbnailPreview?.public_id || "thumbnail"}
                width={96}
                height={96}
                className="w-full h-24 object-cover rounded"
              />
            )}

            <label
              htmlFor="thumbnail"
              className="w-full flex flex-col gap-y-1 relative"
            >
              <span className="text-sm cursor-pointer line-clamp-1">
                Choose Thumbnail*
              </span>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer z-50"
                accept=".jpg, .jpeg, .png"
                multiple={false}
                onChange={handleProductThumbnailPreview}
              />
            </label>
          </div>

          {/* gallery */}
          <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
            {productGalleryPreviews?.length > 0 && (
              <div className="flex flex-row gap-x-2 overflow-x-auto">
                {productGalleryPreviews?.map((preview, index) => (
                  <div
                    key={index}
                    className="w-fit flex flex-col gap-y-1 relative flex-1"
                  >
                    <Image
                      src={preview?.url || preview}
                      alt={preview?.public_id || "gallery" + index}
                      width={96}
                      height={96}
                      className="w-full h-24 object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            )}

            <label
              htmlFor="gallery"
              className="w-full flex flex-col gap-y-1 relative"
            >
              <span className="text-sm cursor-pointer">Choose Gallery*</span>
              <input
                type="file"
                name="gallery"
                id="gallery"
                className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer z-50"
                accept=".jpg, .jpeg, .png"
                multiple
                onChange={handleProductGalleryPreviews}
              />
            </label>
          </div>
        </div>

        {/* title & summary */}
        <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {/* title */}
          <label
            htmlFor="productTitle"
            className="w-full flex flex-col gap-y-1"
          >
            <span className="text-sm">Title*</span>
            <input
              type="text"
              name="productTitle"
              id="productTitle"
              maxlength="100"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
            />
          </label>

          {/* summary */}
          <label htmlFor="summary" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Summary*</span>
            <textarea
              name="summary"
              id="summary"
              rows="5"
              maxlength="500"
              value={productSummary}
              onChange={(e) => setProductSummary(e.target.value)}
            />
          </label>
        </div>

        {/* colors & sizes */}
        <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {/* colors */}
          <label htmlFor="colors" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Colors*</span>
            {colors?.length === 0 ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <select
                name="colors"
                id="colors"
                size={10}
                multiple
                className="rounded"
                value={productVariations?.colors}
                onChange={(e) =>
                  setProductVariations((prev) => ({
                    ...prev,
                    colors: Array.from(e.target.selectedOptions).map(
                      (option) => option.value
                    ),
                  }))
                }
              >
                {colors.map((color, index) => (
                  <option key={index} value={color.hex}>
                    {color.name}
                  </option>
                ))}
              </select>
            )}
          </label>

          {/* sizes */}
          <label htmlFor="sizes" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Sizes*</span>
            <select
              name="sizes"
              id="sizes"
              size={5}
              multiple
              className="rounded"
              value={productVariations?.sizes}
              onChange={(e) =>
                setProductVariations((prev) => ({
                  ...prev,
                  sizes: Array.from(e.target.selectedOptions).map(
                    (option) => option.value
                  ),
                }))
              }
            >
              {sizes.map((size, index) => (
                <option key={index} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* features */}
        <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {productFeatures?.map((feature, index) => (
            <label
              key={index}
              htmlFor="features"
              className="flex flex-col gap-y-1"
            >
              <span className="text-sm flex flex-row justify-between items-center">
                Enter Product Features*
                <span className="flex flex-row gap-x-1">
                  {index > 0 && (
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      <Minus />
                    </span>
                  )}
                  {index === productFeatures.length - 1 && (
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                      onClick={handleAddFeature}
                    >
                      <Plus />
                    </span>
                  )}
                </span>
              </span>
              <div className="flex flex-col gap-y-2.5">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter feature title"
                  maxlength="100"
                  value={feature.title}
                  onChange={(e) =>
                    handleInputChange(index, "title", e.target.value)
                  }
                  required
                />
                {feature?.content?.map((content, contentIndex) => (
                  <div
                    key={contentIndex}
                    className="flex flex-row gap-x-2 items-center"
                  >
                    <input
                      type="text"
                      name="content"
                      placeholder="Enter feature content"
                      maxlength="200"
                      className="flex-1"
                      value={content}
                      onChange={(e) =>
                        handleContentChange(index, contentIndex, e.target.value)
                      }
                      required
                    />
                    {/* remove a content */}
                    {contentIndex > 0 && (
                      <span
                        className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                        onClick={() => handleRemoveContent(index, contentIndex)}
                      >
                        <Minus />
                      </span>
                    )}
                    {/* add a content */}
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                      onClick={() => handleAddContent(index)}
                    >
                      <Plus />
                    </span>
                  </div>
                ))}
              </div>
            </label>
          ))}
        </div>

        {/* campaign & price */}
        <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {/* campaign */}
          <label htmlFor="campaign" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Campaign*</span>
            <p className="flex flex-row gap-x-4">
              <input
                type="text"
                name="campaignTitle"
                id="campaignTitle"
                className="w-full"
                placeholder="Enter campaign title"
                value={productCampaign?.title}
                onChange={(e) =>
                  setProductCampaign((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
              />
              <select
                name="campaignState"
                id="campaignState"
                className="w-fit"
                value={productCampaign?.state}
                onChange={(e) =>
                  setProductCampaign((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              >
                <option value="choose-state" disabled>
                  Select Campaign State
                </option>
                <option value="new-arrival">New Arrival</option>
                <option value="discount">Discount</option>
                <option value="sold-out">Sold Out</option>
                <option value="on-sale">On Sale</option>
              </select>
            </p>
          </label>

          {/* price */}
          <label htmlFor="price" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Price*</span>
            <input
              type="number"
              name="price"
              id="price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </label>
        </div>

        {/* category and brand */}
        <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
          {/* category */}
          <label htmlFor="category" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Category*</span>
            {fetchingCategories ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <select
                name="category"
                id="category"
                className="w-full"
                value={productCategory}
                onChange={(e) => setProductCategory(e.target.value)}
              >
                <option value={productCategory} disabled>
                  {product?.category?.title}
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                ))}
              </select>
            )}
          </label>

          {/* brand */}
          <label htmlFor="brand" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Brand*</span>
            {fetchingBrands ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <select
                name="brand"
                id="brand"
                className="w-full"
                value={productBrand}
                onChange={(e) => setProductBrand(e.target.value)}
              >
                <option value={productBrand} disabled>
                  {product?.brand?.title}
                </option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.title}
                  </option>
                ))}
              </select>
            )}
          </label>
        </div>

        {/* submit button */}
        <input
          type="submit"
          value="Update Product"
          className="py-2 border border-black rounded bg-black hover:bg-black/90 text-white transition-colors drop-shadow cursor-pointer"
        />
      </form>
    </Dashboard>
  );
};

export default Page;
