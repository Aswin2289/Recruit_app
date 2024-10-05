import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegister from "../hooks/use-register";
import ServiceImage from "../assest/regpic.png";
import errorMessages from "../services/errorMessages";

// Zod schema for form validation
const schema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .regex(/^[a-zA-Z]+[a-zA-Z\s]*$/, {
        message: "Name must be alphabetic and can include spaces",
      }),
    email: z.string()
      .email({ message: "Invalid email address" })
      .optional(), // Email is optional but if provided, it must be valid
    phoneNumber: z.string()
      .length(10, { message: "Phone number must be exactly 10 digits" }) // Length validation for 10 digits
      .regex(/^[0-9]+$/, { message: "Phone number must be numeric" })
      .optional(), // Phone number is optional but if provided, it must be valid
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(16, { message: "Password must be no longer than 16 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm Password is required" })
      .max(16, {
        message: "Confirm Password must be no longer than 16 characters",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This specifies where the error message will appear
  });

function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur", // This mode will trigger validation when a field is blurred
  });
  const navigate = useNavigate();

  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const { registerUser, isLoading } = useRegister();
  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.errorCode
        ? errorMessages[error.response.data.errorCode] ||
          errorMessages["UNKNOWN_ERROR"]
        : "An unknown error occurred.";
      toast.error(errorMessage);
    }
  };

  const handleLogin = () => {
    navigate("/login"); // Navigate to the Sign Up page
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <ToastContainer theme="colored" autoClose={2000} closeOnClick />

      {/* Left Side - Image */}
      <div
        className="relative w-5/6 bg-cover bg-center"
        style={{ backgroundImage: `url(${ServiceImage})` }}
      >
        {/* Text Overlay */}
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 flex flex-col items-center justify-center overflow-auto max-h-screen p-4">
        {/* Text Above Registration Form */}
        <div className="mb-1 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Create Your Account
          </h1>
          <p className="text-gray-600">Fill in the details below to register</p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 max-w-md bg-white p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              id="name"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors.name && touchedFields.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && touchedFields.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              id="phoneNumber"
              placeholder="Enter your phone number"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && touchedFields.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && touchedFields.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-indigo-500"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && touchedFields.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Show Password Checkbox */}
          <div className="mb-4">
            <input
              type="checkbox"
              id="showPassword"
              className="mr-2 leading-tight"
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="showPassword" className="text-sm text-gray-700">
              Show Password
            </label>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
              type="submit"
            >
              Register
            </button>
            <button
              className="w-full bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
