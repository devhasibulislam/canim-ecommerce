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

import Inform from "@/components/icons/Inform";
import Minus from "@/components/icons/Minus";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import Modal from "@/components/shared/Modal";
import Dashboard from "@/components/shared/layouts/Dashboard";
import {
  useAddStoreMutation,
  useDeleteStoreMutation,
  useUpdateStoreMutation,
} from "@/services/store/storeApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const Page = () => {
  const userInfo = useSelector((state) => state.auth.user);

  return (
    <Dashboard>{userInfo?.store ? <UpdateStore /> : <AddStore />}</Dashboard>
  );
};

function AddStore() {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [keynotes, setKeynotes] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [addStore, { isLoading, data, error }] = useAddStoreMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding Category...", { id: "addStore" });
    }

    if (data) {
      toast.success(data?.description, { id: "addStore" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addStore" });
    }
  }, [isLoading, data, error]);

  /* for logo preview */
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

  function handleAddBrand(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("thumbnail", thumbnail);

    formData.append("keynotes", JSON.stringify(keynotes));
    formData.append("tags", JSON.stringify(tags));

    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);

    addStore(formData);

    e.target.reset();
    setThumbnailPreview(null);
    setKeynotes([""]);
    setTags([""]);
  }

  return (
    <form
      action=""
      className="w-full flex flex-col gap-y-4"
      onSubmit={handleAddBrand}
    >
      {/* thumbnail */}
      <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
        {thumbnailPreview && (
          <Image
            src={thumbnailPreview}
            alt={"thumbnail"}
            width={96}
            height={96}
            className="w-full h-24 object-cover rounded"
          />
        )}

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
            required
          />
        </label>
      </div>

      {/* title & description */}
      <div className="w-full flex flex-col gap-y-4 p-4 border rounded">
        {/* title */}
        <label htmlFor="title" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">Title*</span>
          <input type="text" name="title" id="title" required />
        </label>

        {/* description */}
        <label htmlFor="email" className="w-full flex flex-col gap-y-1">
          <span className="text-sm">Description*</span>
          <textarea name="description" id="description" rows="4" required />
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

          {keynotes.map((keynote, index) => (
            <p key={index} className="flex flex-row gap-x-2 items-center">
              <input
                type="text"
                name="keynotes"
                placeholder="Enter category keynote"
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

          {tags.map((tag, index) => (
            <p key={index} className="flex flex-row gap-x-2 items-center">
              <input
                type="text"
                name="tags"
                placeholder="Enter category tag"
                className="flex-1"
                value={tag}
                onChange={(event) => handleTagChange(index, event.target.value)}
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
        value="Create Store"
        className="py-2 border border-black rounded bg-black hover:bg-black/90 text-white transition-colors drop-shadow cursor-pointer"
      />
    </form>
  );
}

function UpdateStore() {
  const storeInfo = useSelector((state) => state.auth.user.store);
  const [store, setStore] = useState({});
  const [keynotes, setKeynotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [updateStore, { isLoading, data, error }] = useUpdateStoreMutation();

  useEffect(() => {
    setStore(storeInfo);
    setKeynotes(storeInfo.keynotes);
    setTags(storeInfo.tags);

    if (isLoading) {
      toast.loading("Updating Store...", { id: "updateStore" });
    }

    if (data) {
      toast.success(data?.description, { id: "updateStore" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "updateStore" });
    }
  }, [storeInfo, isLoading, data, error]);

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

    updateStore({ id: store?._id, body: formData });
  }

  return (
    <section className="flex flex-col gap-y-4">
      <form
        action=""
        className="w-full flex flex-col gap-y-4"
        onSubmit={handleUpdateBrand}
      >
        {/* thumbnail */}
        <div className="w-fit flex flex-col gap-y-4 p-4 border rounded">
          <Image
            src={thumbnailPreview || store?.thumbnail?.url}
            alt={store?.thumbnail?.public_id || "thumbnail"}
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
              value={store?.title}
              onChange={(e) => setStore({ ...store, title: e.target.value })}
            />
          </label>

          {/* description */}
          <label htmlFor="email" className="w-full flex flex-col gap-y-1">
            <span className="text-sm">Description*</span>
            <textarea
              name="description"
              id="description"
              rows="4"
              value={store?.description}
              onChange={(e) =>
                setStore({ ...store, description: e.target.value })
              }
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

            {keynotes.map((keynote, index) => (
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

            {tags.map((tag, index) => (
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
          value="Update Store"
          className="py-2 border border-black rounded bg-black hover:bg-black/90 text-white transition-colors drop-shadow cursor-pointer text-sm"
        />
      </form>

      <DeleteStore />
    </section>
  );
}

function DeleteStore() {
  const [isOpen, setIsOpen] = useState(false);
  const storeInfo = useSelector((state) => state.auth.user.store);
  const [deleteStore, { isLoading, data, error }] = useDeleteStoreMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Deleting Store...", { id: "deleteStore" });
    }

    if (data) {
      toast.success(data?.description, { id: "deleteStore" });
    }

    if (error) {
      toast.error(error?.data?.description, { id: "deleteStore" });
    }
  }, [isLoading, data, error]);

  return (
    <>
      <button
        type="button"
        className="py-2 border border-black rounded bg-red-900 hover:bg-red-900/90 text-white transition-colors drop-shadow cursor-pointer text-sm"
        onClick={() => setIsOpen(true)}
      >
        Delete Store
      </button>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-4 lg:w-1/5"
        >
          <article className="flex flex-col gap-y-4">
            <p className="text-xs bg-yellow-500/50 text-black px-2 py-0.5 rounded-sm text-center">
              Store will be deleted permanently!
            </p>
            <div className="flex flex-col gap-y-2">
              <h1 className="text-xl">Are you sure?</h1>
              <p className="text-sm flex flex-col gap-y-2">
                You are about to unlisted from:
                <span className="flex flex-row gap-x-1 items-center text-xs">
                  <Inform /> 3 Products
                </span>
              </p>
            </div>
            <div className="flex flex-row gap-x-4">
              <button
                className="text-white bg-slate-500 px-3 py-1.5 rounded text-sm"
                onClick={() => setIsOpen(false)}
              >
                No, cancel
              </button>
              <button
                className="flex flex-row gap-x-2 items-center text-white bg-red-500 px-3 py-1.5 rounded text-sm"
                onClick={() => deleteStore(storeInfo?._id)}
              >
                <Trash /> Yes, delete
              </button>
            </div>
          </article>
        </Modal>
      )}
    </>
  );
}

export default Page;
