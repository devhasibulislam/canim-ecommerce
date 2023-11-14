import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  // react hook form credentials
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // server side credentials
  const [forgotPassword, { isLoading: resetting, isSuccess: reset }] =
    useForgotPasswordMutation();

  // user credentials from state
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    // reset password
    if (resetting) {
      toast.loading("Resetting password.", { id: "reset_password" });
    } else if (reset) {
      toast.success("Reset password.", {
        id: "reset_password",
      });
    }
  }, [resetting, reset]);

  const handleForgotPasswordForm = (data) => {
    forgotPassword(data);
  };

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Remember account password?
            <Link
              to="/sign-in"
              className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 rounded-lg sm:px-10">
            <form
              className="mb-0 space-y-6"
              onSubmit={handleSubmit(handleForgotPasswordForm)}
            >
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
                    {...register("email", { required: true })}
                    className="w-full form-input rounded-md"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {errors.password ? (
                    <span className="text-red-500 font-medium">
                      Password field is required!
                    </span>
                  ) : (
                    "New Password"
                  )}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    {...register("password", { required: true })}
                    className="w-full form-input rounded-md"
                  />
                </div>
              </div>

              <div>
                <button className="w-full btn-primary">Forgot Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
