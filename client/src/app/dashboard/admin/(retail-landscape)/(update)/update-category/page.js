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
 * Date: 24, January 2024
 */

"use client";

import Inform from "@/components/icons/Inform";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import Modal from "@/components/shared/Modal";
import Dashboard from "@/components/shared/layouts/Dashboard";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/services/category/categoryApi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  /* catch query */
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    isLoading: fetchingCategory,
    data: fetchCategoryData,
    error: fetchCategoryError,
  } = useGetCategoryQuery(id);

  const categoryInfo = useMemo(
    () => fetchCategoryData?.data || {},
    [fetchCategoryData]
  );

  const [category, setCategory] = useState({});
  const [keynotes, setKeynotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [
    updateCategory,
    {
      isLoading: updatingCategory,
      data: updateCategoryData,
      error: updateCategoryError,
    },
  ] = useUpdateCategoryMutation();

  useEffect(() => {
    setCategory(categoryInfo);
    setKeynotes(categoryInfo.keynotes);
    setTags(categoryInfo.tags);

    if (updatingCategory) {
      toast.loading("Updating Category...", { id: "updateCategory" });
    }

    if (updateCategoryData) {
      toast.success(updateCategoryData?.description, { id: "updateCategory" });
    }

    if (updateCategoryError?.data) {
      toast.error(updateCategoryError?.data?.description, {
        id: "updateCategory",
      });
    }

    if (fetchingCategory) {
      toast.loading("Fetching Category...", { id: "fetchCategory" });
    }

    if (fetchCategoryData) {
      toast.success(fetchCategoryData?.description, { id: "fetchCategory" });
    }

    if (fetchCategoryError?.data) {
      toast.error(fetchCategoryError?.data?.description, {
        id: "fetchCategory",
      });
    }
  }, [
    categoryInfo,
    updatingCategory,
    updateCategoryData,
    updateCategoryError,
    fetchingCategory,
    fetchCategoryData,
    fetchCategoryError,
  ]);

  const handleThumbnailPreview = (e) => {
    setThumbnail(e.target.files[0]);

    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /* for keynotes */
  const handleAddKeynote = () => {
    setKeynotes([...keynotes, ""]);
  };

  const handleRemoveKeynote = (index) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes.splice(index, 1);
    setKeynotes(updatedKeynotes);
  };

  const handleKeynoteChange = (index, value) => {
    const updatedKeynotes = [...keynotes];
    updatedKeynotes[index] = value;
    setKeynotes(updatedKeynotes);
  };

  /* for tags */
  const handleAddTag = () => {
    setTags([...tags, ""]);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
  };

  function handleUpdateBrand(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", event.target.title.value);
    formData.append("description", event.target.description.value);

    formData.append("keynotes", JSON.stringify(keynotes));
    formData.append("tags", JSON.stringify(tags));

    if (thumbnailPreview !== null) {
      formData.append("thumbnail", thumbnail);
    }

    updateCategory({ id: category?._id, body: formData });
  }

  return (
    <Dashboard>
      <section className="flex flex-col gap-y-4">
        <form
          action=""
          className="w-full flex flex-col gap-y-4"
          onSubmit={handleUpdateBrand}
        >
          {/* thumbnail */}
          <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
            <Image
              src={thumbnailPreview || category?.thumbnail?.url}
              alt={category?.thumbnail?.public_id || "thumbnail"}
              width={96}
              height={96}
              className="w-full h-24 object-cover rounded"
            />

            <label
              htmlFor="thumbnail"
              className="w-full flex flex-col gap-y-1 relative"
            >
              <span className="text-sm cursor-pointer">Choose Thumbnail*</span>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer z-50"
                accept=".jpg, .jpeg, .png"
                multiple={false}
                onChange={handleThumbnailPreview}
              />
            </label>
          </div>

          {/* title & description */}
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            {/* title */}
            <label htmlFor="title" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">Title*</span>
              <input
                type="text"
                name="title"
                id="title"
                value={category?.title}
                onChange={(e) =>
                  setCategory({ ...category, title: e.target.value })
                }
                maxlength="100"
              />
            </label>

            {/* description */}
            <label htmlFor="email" className="w-full flex flex-col gap-y-1">
              <span className="text-sm">Description*</span>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={category?.description}
                onChange={(e) =>
                  setCategory({ ...category, description: e.target.value })
                }
                maxlength="500"
              />
            </label>
          </div>

          {/* keynotes */}
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            <label htmlFor="keynotes" className="w-full flex flex-col gap-y-4">
              <p className="text-sm flex flex-row justify-between items-center">
                Keynotes*
                <button
                  type="button"
                  className="p-0.5 border rounded-secondary bg-green-500 text-white"
                  onClick={handleAddKeynote}
                >
                  <Plus />
                </button>
              </p>

              {keynotes?.map((keynote, index) => (
                <p key={index} className="flex flex-row gap-x-2 items-center">
                  <input
                    type="text"
                    name="keynotes"
                    placeholder="Enter brand keynote"
                    className="flex-1"
                    value={keynote}
                    onChange={(event) =>
                      handleKeynoteChange(index, event.target.value)
                    }
                    required
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      className="p-0.5 border rounded-secondary bg-red-500 text-white"
                      onClick={() => handleRemoveKeynote(index)}
                    >
                      <Minus />
                    </button>
                  )}
                </p>
              ))}
            </label>
          </div>

          {/* tags */}
          <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
            <label htmlFor="tags" className="w-full flex flex-col gap-y-4">
              <p className="text-sm flex flex-row justify-between items-center">
                Tags*
                <button
                  type="button"
                  className="p-0.5 border rounded-secondary bg-green-500 text-white"
                  onClick={handleAddTag}
                >
                  <Plus />
                </button>
              </p>

              {tags?.map((tag, index) => (
                <p key={index} className="flex flex-row gap-x-2 items-center">
                  <input
                    type="text"
                    name="tags"
                    placeholder="Enter brand tag"
                    className="flex-1"
                    value={tag}
                    onChange={(event) =>
                      handleTagChange(index, event.target.value)
                    }
                    required
                  />
                  {index !== 0 && (
                    <button
                      type="button"
                      className="p-0.5 border rounded-secondary bg-red-500 text-white"
                      onClick={() => handleRemoveTag(index)}
                    >
                      <Minus />
                    </button>
                  )}
                </p>
              ))}
            </label>
          </div>

          {/* submit button */}
          <input
            type="submit"
            value="Update Category"
            className="py-2 border border-black rounded bg-black hover:bg-black/90 text-white transition-colors drop-shadow cursor-pointer text-sm"
          />
        </form>
      </section>
    </Dashboard>
  );
};

export default Page;
