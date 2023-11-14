import React from "react";
import { useForm } from "react-hook-form";
import { useCreateBrandMutation } from "../../../features/brand/brandApi";
import { useUploadPhotoMutation } from "../../../features/upload/uploadApi";
import { useSelector } from "react-redux";

const AddNewBrand = () => {
  // react hook form credentials
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // server side credentials
  const [createBrand, { isLoading: categoryCreating }] =
    useCreateBrandMutation();
  const [uploadBrandLogo, { isLoading: logoUploading }] =
    useUploadPhotoMutation();

  // upload credentials from state
  const { photo } = useSelector((state) => state.upload);

  // submit add brand form
  const handleAddCategoryForm = (data) => {
    data.logo = photo;
    createBrand(data);
    reset();
  };

  return (
    <section className="grid grid-cols-12 gap-8">
      {/* brand form */}
      <form
        className="md:col-span-7 col-span-12"
        onSubmit={handleSubmit(handleAddCategoryForm)}
      >
        <div className="grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* brand title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.title ? (
                  <span className="text-red-500 font-medium">
                    Brand title field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Brand title{" "}
                    <span className="hover:text-gray-500">{"<="} 50</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="title"
                  name="title"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your brand title"
                  {...register("title", { required: true, maxLength: 50 })}
                  className={`w-full form-input rounded-md ${
                    watch("title")?.length > 50 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>

            {/* brand tagline */}
            <div>
              <label
                htmlFor="tagline"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.tagline ? (
                  <span className="text-red-500 font-medium">
                    Brand tagline field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Brand tagline{" "}
                    <span className="hover:text-gray-500">{"<="} 100</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="tagline"
                  name="tagline"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your brand tagline"
                  {...register("tagline", { required: true, maxLength: 100 })}
                  className={`w-full form-input rounded-md ${
                    watch("tagline")?.length > 100 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>

            {/* brand description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.description ? (
                  <span className="text-red-500 font-medium">
                    Brand description field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Brand description{" "}
                    <span className="hover:text-gray-500">{"<="} 500</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your subcategory description"
                  {...register("description", {
                    required: true,
                    maxLength: 500,
                  })}
                  className={`w-full form-textarea rounded-md ${
                    watch("description")?.length > 500 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                  rows="8"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* brand email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.email ? (
                  <span className="text-red-500 font-medium">
                    Brand email field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Brand email{" "}
                    <span className="hover:text-gray-500">{"<="} 50</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="off"
                  placeholder="Enter your brand email"
                  {...register("email", { required: true, maxLength: 50 })}
                  className={`w-full form-input rounded-md ${
                    watch("email")?.length > 50 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>

            {/* brand website */}
            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.website ? (
                  <span className="text-red-500 font-medium">
                    Brand website field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Brand website{" "}
                    <span className="hover:text-gray-500">{"<="} 30</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="website"
                  name="website"
                  type="url"
                  autoComplete="off"
                  pattern="https://.*"
                  size="30"
                  placeholder="Enter your brand website"
                  {...register("website", { required: true, maxLength: 30 })}
                  className={`w-full form-input rounded-md ${
                    watch("website")?.length > 30 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>

            {/* brand location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.location ? (
                  <span className="text-red-500 font-medium">
                    Brand location field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    Brand location{" "}
                    <span className="hover:text-gray-500">{"<="} 200</span>{" "}
                  </span>
                )}
              </label>
              <div className="mt-1">
                <input
                  id="location"
                  name="location"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter your brand location"
                  {...register("location", { required: true, maxLength: 200 })}
                  className={`w-full form-input rounded-md ${
                    watch("location")?.length > 200 &&
                    "focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* brand logo */}
          <div className="grid grid-cols-1 gap-y-8 bg-white p-4 rounded-md">
            {/* brand logo */}
            <div>
              <label
                htmlFor="logo"
                className="block text-sm font-medium text-gray-700"
              >
                {errors.logo ? (
                  <span className="text-red-500 font-medium">
                    Brand logo field is required!
                  </span>
                ) : (
                  <span className="flex justify-between">
                    {logoUploading ? (
                      <span className="flex">
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                        Logo uploading
                      </span>
                    ) : !Object.keys(photo).length ? (
                      "Brand logo (765x850)"
                    ) : (
                      <span className="flex">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Logo uploaded
                      </span>
                    )}
                    <span className="hover:text-gray-500">{"<="} 1MB</span>
                  </span>
                )}
              </label>
              <div className="mt-1">
                <div className="flex items-center gap-x-4">
                  {Object.keys(photo).length ? (
                    <input
                      type="text"
                      className="form-input rounded-md w-full"
                      value="Logo uploaded!"
                      readOnly
                    />
                  ) : (
                    <input
                      id="logo"
                      name="logo"
                      type="file"
                      multiple
                      accept=".png, .jpg, .jpeg, .webp"
                      autoComplete="off"
                      placeholder="Enter your brand logo"
                      {...register("logo", {
                        required: true,
                      })}
                      className={`w-full form-input rounded-md`}
                      onChange={(event) => {
                        const formData = new FormData();
                        formData.append("logo", event.target.files[0]);
                        uploadBrandLogo({
                          route: "brand/logo",
                          photo: formData,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* form submit button */}
          <div>
            {categoryCreating ? (
              <button type="submit" className="w-full btn-primary" disabled>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Creating Brand...
              </button>
            ) : (
              <button type="submit" className="w-full btn-primary">
                Create New Brand
              </button>
            )}
          </div>
        </div>
      </form>

      {/* brand alert */}
      <section className="md:col-span-5 col-span-12 h-full w-full rounded-md shadow p-4">
        <div className="h-full w-full flex justify-center items-center text-lg">
          <div
            className="flex p-4 text-sm text-yellow-800 rounded-lg bg-yellow-500"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Refresh alert!</span> Please,
              refresh the page after creating each brand.
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AddNewBrand;
