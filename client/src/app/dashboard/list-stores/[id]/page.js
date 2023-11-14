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
 * Date: 13, November 2023
 */

"use client";

import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Upload from "@/components/icons/Upload";
import Spinner from "@/components/shared/Spinner";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import {
  useGetStoreQuery,
  useUpdateStoreMutation,
} from "@/services/store/storeApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const UpdateStore = () => {
  const { id } = useParams();
  const [
    updateStore,
    {
      isLoading: storeUpdating,
      data: updatedStoreData,
      isError: storeUpdatingError,
    },
  ] = useUpdateStoreMutation();
  const {
    data: storeData,
    isError: storeError,
    isLoading,
  } = useGetStoreQuery(id);
  const store = storeData?.data || {};

  useEffect(() => {
    if (updatedStoreData) {
      alert(updatedStoreData?.description);
    }
    if (storeUpdatingError?.data) {
      alert(storeUpdatingError?.data?.description);
    }
    if (storeError) {
      alert("Something went wrong, refresh the page.");
    }
  }, [updatedStoreData, storeUpdatingError, storeError]);

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [keynotes, setKeynotes] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (store) {
      setTitle(store?.title);
      setDescription(store?.description);
      setThumbnailPreview(store?.thumbnail?.url);
      setKeynotes(store?.keynotes);
      setTags(store?.tags);
    }
  }, [store]);

  const handleLogoChange = (e) => {
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

  function handleAddStore(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
      formData.append("oldThumbnail", store?.thumbnail?.public_id);
    }

    formData.append("keynotes", JSON.stringify(keynotes));
    formData.append("tags", JSON.stringify(tags));

    updateStore({ id, body: formData });
  }

  return (
    <Dashboard>
      {isLoading || !store ? (
        <DashboardLading />
      ) : (
        <form
          className="w-full h-full grid grid-cols-12 gap-4"
          onSubmit={handleAddStore}
        >
          <div className="col-span-4">
            <div className="flex flex-col gap-4 h-full w-full relative">
              {thumbnailPreview && (
                <>
                  <Image
                    src={thumbnailPreview}
                    alt="logo"
                    width={296}
                    height={200}
                    className="h-[200px] w-full object-cover rounded"
                  />
                  <div className="absolute top-0 left-0 w-full h-[200px] bg-black/50" />
                  <div className="absolute top-2 left-2 w-10 h-10 bg-sky-500 rounded !cursor-pointer shadow">
                    <div className="!h-full !w-full relative flex justify-center items-center !cursor-pointer">
                      <Upload />
                      <input
                        type="file"
                        name="logo"
                        id="logo"
                        accept=".jpg, .jpeg, .png"
                        multiple={false}
                        className="absolute top-0 left-0 w-full h-full opacity-0 !cursor-pointer z-50"
                        onChange={handleLogoChange}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="col-span-8 flex flex-col gap-y-4">
            <label htmlFor="title" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Store Title*</span>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="i.e. Laptop"
                className=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label htmlFor="description" className="flex flex-col gap-y-1">
              <span className="text-sm">Enter Store Description*</span>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
                placeholder="i.e. This is a store is ..."
                className=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </label>
            <div className="flex flex-col gap-y-4">
              <label htmlFor="keynotes" className="flex flex-col gap-y-1">
                <span className="text-sm flex flex-row justify-between items-center">
                  Enter Store Keynotes*
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                    onClick={handleAddKeynote}
                  >
                    <Plus />
                  </span>
                </span>
                {keynotes?.map((keynote, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-x-1 items-start"
                  >
                    <input
                      type="text"
                      name="keynotes"
                      placeholder="Enter store keynote"
                      className="flex-1"
                      value={keynote}
                      onChange={(event) =>
                        handleKeynoteChange(index, event.target.value)
                      }
                      required
                    />
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                      onClick={() => handleRemoveKeynote(index)}
                    >
                      <Minus />
                    </span>
                  </div>
                ))}
              </label>
            </div>
            <div className="flex flex-col gap-y-4">
              <label htmlFor="keynotes" className="flex flex-col gap-y-1">
                <span className="text-sm flex flex-row justify-between items-center">
                  Enter Store Tags*
                  <span
                    className="cursor-pointer p-0.5 border rounded-secondary bg-green-500 text-white"
                    onClick={handleAddTag}
                  >
                    <Plus />
                  </span>
                </span>
                {tags?.map((tag, index) => (
                  <div
                    key={index}
                    className="flex flex-row gap-x-1 items-start"
                  >
                    <input
                      type="text"
                      name="tags"
                      placeholder="Enter store tag"
                      className="flex-1"
                      value={tag}
                      onChange={(event) =>
                        handleTagChange(index, event.target.value)
                      }
                      required
                    />
                    <span
                      className="cursor-pointer p-0.5 border rounded-secondary bg-red-500 text-white"
                      onClick={() => handleRemoveTag(index)}
                    >
                      <Minus />
                    </span>
                  </div>
                ))}
              </label>
            </div>
            <button
              type="submit"
              disabled={storeUpdating}
              className="py-2 border border-black rounded-secondary bg-black hover:bg-black/90 text-white transition-colors drop-shadow disabled:bg-gray-200 disabled:border-gray-200 disabled:text-black/50 disabled:cursor-not-allowed flex flex-row justify-center items-center text-sm mt-4"
            >
              {storeUpdating ? <Spinner /> : "Update Store"}
            </button>
          </div>
        </form>
      )}
    </Dashboard>
  );
};

export default UpdateStore;
