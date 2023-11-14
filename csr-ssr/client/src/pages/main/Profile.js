import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useUpdatePhotoMutation } from "../../features/update/updateApi";
import { useUpdateUserMutation } from "../../features/auth/authApi";
import LazyLoadingImage from "../../components/LazyLoadingImage";

const Profile = () => {
  const {
    auth: {
      user: { _id, name, email, dob, avatar, gender, phone, address },
    },
    update: { photo },
  } = useSelector((state) => state);
  const [updateAvatarThumbnail, { isLoading: avatarUploading }] =
    useUpdatePhotoMutation();
  const [updateUserInfo, { isLoading: isUserLoading }] =
    useUpdateUserMutation();

  // react hook form credentials
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name,
      email,
      gender,
      phone,
      dob,
      address,
      avatar,
    },
  });

  useEffect(() => {
    reset({
      name,
      email,
      gender,
      phone,
      dob,
      address,
      avatar,
    });
  }, [reset, name, email, gender, phone, dob, avatar, address]);

  // date credentials for date of birth
  const date = new Date(dob);
  const defaultValue = date.toISOString().substr(0, 10);

  const handleUpdateUserAccount = (data) => {
    data.avatar = Object.keys(photo)?.length ? photo : avatar;
    data.dob = data.dateOfBirth;
    const { dateOfBirth, ...userData } = data;
    updateUserInfo({ uid: _id, userData });
  };

  return (
    <>
      <div className="container mx-auto lg:px-0 px-4">
        <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
          <div className="space-y-10 sm:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Account information
            </h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-shrink-0 flex items-start">
                <div className="relative rounded-full overflow-hidden flex">
                  <LazyLoadingImage
                    src={Object.keys(photo)?.length ? photo?.url : avatar?.url}
                    alt={
                      Object.keys(photo)?.length
                        ? photo?.public_id
                        : avatar?.public_id
                    }
                    className="w-32 h-32 rounded-full object-cover object-center z-0"
                    height={"128"}
                    width={"128"}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                    {avatarUploading ? (
                      <svg
                        className="animate-spin h-5 w-5"
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
                          strokeWidth="3"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    )}
                    <span className="mt-1 text-xs">Change Image</span>
                  </div>
                  <input
                    {...register("avatar", { required: false })}
                    name="avatar"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(event) => {
                      const formData = new FormData();
                      formData.append("avatar", event.target.files[0]);
                      updateAvatarThumbnail({
                        route: "user/avatar",
                        public_id: avatar?.public_id,
                        photo: formData,
                      });
                    }}
                  />
                </div>
              </div>
              <form
                onSubmit={handleSubmit(handleUpdateUserAccount)}
                className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6"
              >
                <div>
                  <label
                    className="nc-Label text-base font-medium text-neutral-900"
                    data-nc-id="Label"
                  >
                    Full name
                  </label>
                  <input
                    {...register("name", { required: false })}
                    name="name"
                    type="text"
                    className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
                  />
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium text-neutral-900"
                    data-nc-id="Label"
                  >
                    Email
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-envelope-at h-6 w-6"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
                        <path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648Zm-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
                      </svg>
                    </span>
                    <input
                      {...register("email", { required: false })}
                      name="email"
                      type="text"
                      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    />
                  </div>
                </div>
                <div className="max-w-lg">
                  <label
                    className="nc-Label text-base font-medium text-neutral-900"
                    data-nc-id="Label"
                  >
                    Date of birth
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-calendar-minus h-6 w-6"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z" />
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                      </svg>
                    </span>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      autoComplete="off"
                      defaultValue={defaultValue}
                      {...register("dateOfBirth", { required: false })}
                      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium text-neutral-900"
                    data-nc-id="Label"
                  >
                    Address
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-geo h-6 w-6"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                        />
                      </svg>
                    </span>
                    <input
                      {...register("address", { required: false })}
                      name="address"
                      type="text"
                      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                      placeholder={!address && "Enter your address"}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium text-neutral-900"
                    data-nc-id="Label"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    {...register("gender", { required: false })}
                    className="nc-Select h-11 mt-1.5 block w-full text-sm rounded-2xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white"
                  >
                    <option selected={gender === "male"} value="male">
                      Male
                    </option>
                    <option selected={gender === "female"} value="female">
                      Female
                    </option>
                    <option selected={gender === "binary"} value="binary">
                      Binary
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    className="nc-Label text-base font-medium text-neutral-900"
                    data-nc-id="Label"
                  >
                    Phone number
                  </label>
                  <div className="mt-1.5 flex">
                    <span className="inline-flex items-center px-4 rounded-l-2xl border border-r-0 border-neutral-200 bg-neutral-50 text-neutral-500 text-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-phone h-6 w-6"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                        <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                      </svg>
                    </span>
                    <input
                      {...register("phone", { required: false })}
                      name="phone"
                      type="text"
                      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white rounded-2xl text-sm font-normal h-11 px-4 py-3 !rounded-l-none"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000">
                    {isUserLoading ? "Updating..." : "Update account"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
