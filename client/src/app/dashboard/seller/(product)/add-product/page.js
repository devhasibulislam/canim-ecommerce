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
import { useAddProductMutation } from "@/services/product/productApi";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  /* thumbnail states */
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  /* gallery states */
  const [gallery, setGallery] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  /* features state */
  const [features, setFeatures] = useState([{ title: "", content: [""] }]);

  /* colors and sizes hooks */
  const colors = useGetColors() || [];
  const sizes = ["xxs", "xs", "s", "m", "l", "xl", "xxl"];

  /* user state hook */
  const user = useSelector((state) => state.auth.user);

  /* add product | get brands | get categories hooks */
  const [
    addProduct,
    { isLoading: addingProduct, data: addProductData, error: addProductError },
  ] = useAddProductMutation();
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

  /* visible states in toast */
  useEffect(() => {
    if (addingProduct) {
      toast.loading("Adding Product...", { id: "addProduct" });
    }

    if (addProductData) {
      toast.success(addProductData?.description, { id: "addProduct" });

      setFeatures([{ title: "", content: [""] }]);
      setThumbnail(null);
      setThumbnailPreview(null);
      setGallery([]);
      setGalleryPreviews([]);
    }

    if (addProductError?.data) {
      toast.error(addProductError?.data?.description, { id: "addProduct" });
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
  }, [
    addingProduct,
    addProductData,
    addProductError,
    fetchingBrands,
    fetchBrandsData,
    fetchBrandsError,
    fetchingCategories,
    fetchCategoriesData,
    fetchCategoriesError,
  ]);

  /* handle thumbnail preview */
  const handleThumbnailPreview = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* handle gallery preview */
  const handleGalleryPreview = (e) => {
    const files = e.target.files;

    if (files.length > 5) {
      toast.success("Maximum 5 images can be uploaded");
      window.location.reload();
    } else {
      for (let i = 0; i < e.target.files.length; i++) {
        setGallery(files);
      }
    }

    const previews = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setGalleryPreviews(previews);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  /* product features criteria */
  function handleAddFeature() {
    setFeatures([...features, { title: "", content: [""] }]);
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][field] = value;
    setFeatures(updatedFeatures);
  };

  const handleAddContent = (featureIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content.push("");
    setFeatures(updatedFeatures);
  };

  const handleRemoveContent = (featureIndex, contentIndex) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content.splice(contentIndex, 1);
    setFeatures(updatedFeatures);
  };

  const handleContentChange = (featureIndex, contentIndex, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content[contentIndex] = value;
    setFeatures(updatedFeatures);
  };

  /* add product handler */
  function handleAddProduct(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", event.target.productTitle.value);
    formData.append("summary", event.target.summary.value);
    formData.append("price", event.target.price.value);

    formData.append("thumbnail", thumbnail);
    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }

    formData.append("features", JSON.stringify(features));
    formData.append(
      "campaign",
      JSON.stringify({
        title: event.target.campaignTitle.value,
        state: event.target.campaignState.value,
      })
    );
    formData.append(
      "variations",
      JSON.stringify({
        colors: Array.from(event.target.colors.selectedOptions).map(
          (option) => option.value
        ),
        sizes: Array.from(event.target.sizes.selectedOptions).map(
          (option) => option.value
        ),
      })
    );

    formData.append("brand", event.target.brand.value);
    formData.append("category", event.target.category.value);
    formData.append("store", user?.store?._id);

    addProduct(formData);

    event.target.reset();
  }

  return (
    <Dashboard>
      <form
        action=""
        className="w-full flex flex-col gap-y-4"
        onSubmit={handleAddProduct}
      >
        {/* thumbnail & gallery */}
        <div className="w-full flex flex-row gap-x-4">
          {/* thumbnail */}
          <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
            {thumbnailPreview && (
              <Image
                src={thumbnailPreview}
                alt={"logo"}
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
                onChange={handleThumbnailPreview}
                required
              />
            </label>
          </div>

          {/* gallery */}
          <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
            {galleryPreviews?.length > 0 && (
              <div className="flex flex-row gap-x-2 overflow-x-auto">
                {galleryPreviews.map((preview, index) => (
                  <div
                    key={index}
                    className="w-fit flex flex-col gap-y-1 relative flex-1"
                  >
                    <Image
                      src={preview}
                      alt={"logo"}
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
                onChange={handleGalleryPreview}
                required
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
              required
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
              required
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
                required
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
              required
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
          {features.map((feature, index) => (
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
                  {index === features.length - 1 && (
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
                {feature.content.map((content, contentIndex) => (
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
                required
              />
              <select
                name="campaignState"
                id="campaignState"
                className="w-fit"
                defaultValue="choose-state"
                required
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
            <input type="number" name="price" id="price" required />
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
                defaultValue={user?.category?._id}
                required
              >
                <option value={user?.category?._id} disabled>
                  {user?.category?.title}
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
                defaultValue={user?.brand?._id}
                required
              >
                <option value={user?.brand?._id} disabled>
                  {user?.brand?.title}
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
          value="Create Product"
          className="py-2 border border-black rounded bg-black hover:bg-black/90 text-white transition-colors drop-shadow cursor-pointer"
        />
      </form>
    </Dashboard>
  );
};

export default Page;
