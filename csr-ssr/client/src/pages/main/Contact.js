import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Contact = () => {
  // react hook form credentials
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleContactUsForm = (data) => {
    console.log(data);
    toast.success("Check console to see response.");
    reset();
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Contact Us
          </h2>
        </div>

        <div className="mt-8">
          <div className="bg-white py-8 px-6 rounded-lg sm:px-10 grid md:grid-cols-2 grid-cols-1 md:gap-0 gap-y-12 items-center justify-items-center max-w-7xl mx-auto">
            <form
              className="mb-0 space-y-6 md:order-2 order-1 w-full"
              onSubmit={handleSubmit(handleContactUsForm)}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  {errors.name ? (
                    <span className="text-red-500 font-medium">
                      Name field is required!
                    </span>
                  ) : (
                    "Name"
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    placeholder="Enter your full name"
                    {...register("name", { required: true, maxLength: 100 })}
                    className="w-full form-input rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {errors.email ? (
                    <span className="text-red-500 font-medium">
                      Email field is required!
                    </span>
                  ) : (
                    "Email"
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="off"
                    placeholder="Enter your email address"
                    {...register("email", { required: true })}
                    className="w-full form-input rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="flex justify-between text-sm font-medium text-gray-700"
                >
                  {errors.message ? (
                    <span className="text-red-500 font-medium">
                      Message field is required!
                    </span>
                  ) : (
                    "Message"
                  )}
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    type="message"
                    autoComplete="off"
                    placeholder="Enter your required message"
                    {...register("message", { required: true })}
                    className="w-full form-textarea rounded-md"
                    rows="6"
                  />
                </div>
              </div>

              <div>
                <button className="w-full btn-primary">Send Message</button>
              </div>
            </form>

            <div className="space-y-8 md:order-1 order-2">
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  🗺 ADDRESS
                </h3>
                <span className="block mt-2 text-neutral-500">
                  <a href="https://goo.gl/maps/EgcyzxTwDaB4zgzn7">
                    41/02/01 - Pathantola, Dhamrai, Dhaka
                  </a>
                </span>
              </div>
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  💌 EMAIL
                </h3>
                <span className="block mt-2 text-neutral-500">
                  <a href="mailto:hasib143sl@gmail.com">hasib143sl@gmail.com</a>
                </span>
              </div>
              <div>
                <h3 className="uppercase font-semibold text-sm tracking-wider">
                  ☎️ PHONE
                </h3>
                <span className="block mt-2 text-neutral-500">
                  <a href="tel:+8801906315901">+8801906-315901</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
