/**
 * Title: Write a program using JavaScript on [id]
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
 * Date: 12, November 2023
 */

"use client";

import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Upload from "@/components/icons/Upload";
import Spinner from "@/components/shared/Spinner";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetBrandsQuery } from "@/services/brand/brandApi";
import { useGetCategoriesQuery } from "@/services/category/categoryApi";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/services/product/productApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UpdateProduct = () => {
  const [features, setFeatures] = useState([{ title: "", content: [""] }]);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [
    updateProduct,
    {
      isLoading: productUpdating,
      data: updateProductResponse,
      isError: updateProductResponseError,
    },
  ] = useUpdateProductMutation();
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
    data: productData,
    isError: productError,
    isLoading: productLoading,
  } = useGetProductQuery(id);

  useEffect(() => {
    if (updateProductResponse) {
      alert(updateProductResponse?.description);
    }
    if (updateProductResponseError?.data) {
      alert(updateProductResponseError?.data?.description);
    }
    if (brandsError || categoriesError || productError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [
    updateProductResponse,
    updateProductResponseError,
    brandsError,
    categoriesError,
    productError,
  ]);

  const brands = brandsData?.data || [];
  const categories = categoriesData?.data || [];
  const product = productData?.data || {};

  const handleThumbnailChange = (e) => {
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

  const handleGalleryChange = (e) => {
    const files = e.target.files;

    if (files.length > 5) {
      alert("Maximum 5 images can be uploaded");
      window.location.reload();
    } else {
      setGallery(files);
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

  function handleAddFeature() {
    setFeatures((prevFeatures) => [
      ...prevFeatures,
      { title: "", content: [""] },
    ]);
  }

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleInputChange = (index, field, value) => {
    // Make a deep copy of the features array
    const updatedFeatures = JSON.parse(JSON.stringify(features));

    // Modify the copy
    updatedFeatures[index][field] = value;

    // Update the state with the modified copy
    setFeatures(updatedFeatures);
  };

  const handleAddContent = (featureIndex) => {
    setFeatures((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures[featureIndex] = {
        ...updatedFeatures[featureIndex],
        content: [...updatedFeatures[featureIndex].content, ""],
      };
      return updatedFeatures;
    });
  };

  const handleRemoveContent = (featureIndex, contentIndex) => {
    const updatedFeatures = [...features];
    // updatedFeatures[featureIndex].content.splice(contentIndex, 1);
    // setFeatures(updatedFeatures);

    setFeatures((prevFeatures) => {
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
    const updatedFeatures = [...features];
    updatedFeatures[featureIndex].content[contentIndex] = value;
    setFeatures(updatedFeatures);
  };

  const [productTitle, setProductTitle] = useState("");
  const [price, setPrice] = useState("");
  const [summary, setSummary] = useState("");
  const [variations, setVariations] = useState({ colors: 0, sizes: 0 });
  const [campaign, setCampaign] = useState({
    title: "",
    state: "",
  });
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product) {
      setProductTitle(product?.title);
      setSummary(product?.summary);
      setThumbnailPreview(product?.thumbnail?.url);
      setGalleryPreviews(product?.gallery);
      setFeatures(product?.features);
      setVariations(product?.variations);
      setCampaign(product?.campaign);
      setPrice(product?.price);
      setCategory(product?.category);
      setBrand(product?.brand);
    }
  }, [product]);

  const handleAddProduct = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", productTitle);
    formData.append("summary", summary);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
      formData.append("oldThumbnail", product?.thumbnail?.public_id);
    }

    if (gallery.length > 0) {
      for (let i = 0; i < gallery.length; i++) {
        formData.append("gallery", gallery[i]);
      }

      for (let i = 0; i < product?.gallery.length; i++) {
        formData.append("oldGallery", product?.gallery[i]?.public_id);
      }
    }

    formData.append("features", JSON.stringify(features));
    formData.append("variations", JSON.stringify(variations));
    formData.append("campaign", JSON.stringify(campaign));
    formData.append("price", price);
    formData.append("category", category?._id);
    formData.append("brand", brand?._id);

    updateProduct({ id, body: formData });
  };

  return (
    <Dashboard>
      {productLoading || !product ? (
        <DashboardLading />
      ) : (
        <form
          className="w-full h-full grid grid-cols-12 gap-4 relative"
          onSubmit={handleAddProduct}
        >
          <div className="col-span-4 sticky top-2 h-fit">
            <div className="flex flex-col gap-4 h-full w-full">
              <div className="relative">
                {thumbnailPreview && (
                  <>
                    <Image
                      src={thumbnailPreview}
                      alt="thumbnail"
                      width={296}
                      height={200}
                      className="h-[200px] w-full object-cover rounded"
                    />
                    <div className="absolute top-0 left-0 w-full h-[200px] bg-black/70">
                      <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 rounded border-2 border-dashed relative p-4">
                        <Upload />
                        <p className="text-center text-sm !text-white">
                          Modify Thumbnail <br /> 296x200
                        </p>
                        <input
                          type="file"
                          name="thumbnail"
                          id="thumbnail"
                          accept=".jpg, .jpeg, .png"
                          multiple={false}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleThumbnailChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="relative">
                {galleryPreviews?.length > 0 && (
                  <>
                    <div className="w-full grid grid-cols-3 gap-2">
                      {galleryPreviews.map((preview, index) => (
                        <Image
                          key={index}
                          src={preview?.url || preview}
                          alt={`gallery-${index}`}
                          width={296}
                          height={200}
                          className="h-28 w-full object-cover rounded"
                        />
                      ))}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full bg-black/70">
                      <div className="w-full h-full flex flex-col justify-center items-center gap-y-2 rounded border-2 border-dashed relative p-4">
                        <Upload />
                        <p className="text-center text-sm !text-white">
                          Modify upto 5 Photos <br /> 296x200
                        </p>
                        <input
                          type="file"
                          name="gallery"
                          id="gallery"
                          accept=".jpg, .jpeg, .png"
                          multiple={true}
                          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleGalleryChange}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-8 flex flex-col gap-y-4">
            <label htmlFor="productTitle" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Title*</span>
              <input
                type="text"
                name="productTitle"
                id="productTitle"
                placeholder="i.e. iPhone 15 Pro Max"
                className=""
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                required
              />
            </label>
            <label htmlFor="price" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Price*</span>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="i.e. 999.99"
                className=""
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <label htmlFor="summary" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Summary*</span>
              <textarea
                name="summary"
                id="summary"
                cols="30"
                rows="5"
                placeholder="i.e. This is a product is ..."
                className=""
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                required
              ></textarea>
            </label>
            <div className="flex flex-col gap-y-4">
              {features?.map((feature, index) => (
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
                      {index === features?.length - 1 && (
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
                      value={feature.title}
                      onChange={(e) =>
                        handleInputChange(index, "title", e.target.value)
                      }
                      required
                    />
                    {feature?.content?.map((content, contentIndex) => (
                      <div
                        key={contentIndex}
                        className="flex flex-row gap-x-2 items-start"
                      >
                        <input
                          type="text"
                          name="content"
                          placeholder="Enter feature content"
                          className="flex-1"
                          value={content}
                          onChange={(e) =>
                            handleContentChange(
                              index,
                              contentIndex,
                              e.target.value
                            )
                          }
                          required
                        />
                        {/* remove a content */}
                        <span
                          className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                          onClick={() =>
                            handleRemoveContent(index, contentIndex)
                          }
                        >
                          <Minus />
                        </span>
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
            <label htmlFor="variations" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Variations*</span>
              <div className="flex flex-row gap-x-2">
                <input
                  type="number"
                  name="color"
                  id="color"
                  placeholder="i.e. How many colors?"
                  className="flex-1"
                  step="0.01"
                  value={variations?.colors}
                  onChange={(e) =>
                    setVariations({ ...variations, colors: e.target.value })
                  }
                  required
                />
                <input
                  type="number"
                  name="size"
                  id="size"
                  placeholder="i.e. How many sizes?"
                  className="flex-1"
                  step=""
                  value={variations?.sizes}
                  onChange={(e) =>
                    setVariations({ ...variations, sizes: e.target.value })
                  }
                  required
                />
              </div>
            </label>
            <label htmlFor="campaign" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Campaign*</span>
              <div className="flex flex-row gap-x-2">
                <input
                  type="text"
                  name="campaignTitle"
                  id="campaignTitle"
                  placeholder="i.e. Campaign title"
                  className="flex-1"
                  value={campaign?.title}
                  onChange={(e) =>
                    setCampaign({ ...campaign, title: e.target.value })
                  }
                  required
                />
                <select
                  name="state"
                  id="state"
                  className="flex-1"
                  value={campaign?.state}
                  onChange={(e) =>
                    setCampaign({ ...campaign, state: e.target.value })
                  }
                  required
                >
                  <option value="on-sale">On Sale</option>
                  <option value="sold-out">Sold Out</option>
                  <option value="discount">Discount</option>
                  <option value="new-arrival">New Arrival</option>
                </select>
              </div>
            </label>
            <label htmlFor="category" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Category*</span>
              {categoriesLoading || categories?.length === 0 ? (
                <>Loading...</>
              ) : (
                <select
                  name="category"
                  id="category"
                  className="flex-1"
                  value={category?._id}
                  onChange={(e) =>
                    setCategory({ ...category, _id: e.target.value })
                  }
                  required
                >
                  {categories.map((category) => (
                    <option key={category?._id} value={category?._id}>
                      {category?.title}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <label htmlFor="brand" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Product Brand*</span>
              {brandsLoading || brands?.length === 0 ? (
                <>Loading...</>
              ) : (
                <select
                  name="brand"
                  id="brand"
                  className="flex-1"
                  value={brand?._id}
                  onChange={(e) => setBrand({ ...brand, _id: e.target.value })}
                  required
                >
                  {brands.map((brand) => (
                    <option key={brand?._id} value={brand?._id}>
                      {brand?.title}
                    </option>
                  ))}
                </select>
              )}
            </label>
            <button
              type="submit"
              disabled={productUpdating}
              className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm mt-4"
            >
              {productUpdating ? <Spinner /> : "Update Product"}
            </button>
          </div>
        </form>
      )}
    </Dashboard>
  );
};

export default UpdateProduct;
