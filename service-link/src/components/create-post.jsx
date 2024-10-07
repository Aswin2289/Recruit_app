import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../services/interceptor";
import { ToastContainer, toast } from "react-toastify";
import Lottie from "react-lottie";
import "react-toastify/dist/ReactToastify.css";
import animationData from "../assest/jobsearch.json"; // Replace with your Lottie animation JSON file
import useAuth from "../hooks/use-auth";

// Define the schema using Zod
const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z
    .string()
    .min(10, "Job description should be at least 10 characters long"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum(["0", "1", "2", "3"], {
    required_error: "Job type is required",
  }),
  salaryRange: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  experience: z.string().min(1, "Experience is required"),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
  shift: z
    .array(z.enum(["0", "1", "2", "3"]))
    .nonempty("At least one shift is required"), // Multi-select for shift
});

const FormWithAnimation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });

  const { getUserDetails } = useAuth();
  const [selectedshift, setSelectedshift] = useState([]);

  // Sync the selectedshift state with react-hook-form
  useEffect(() => {
    setValue("shift", selectedshift);
  }, [selectedshift, setValue]);

  const onSubmit = async (data) => {
    const userDetails = getUserDetails();
    if (!userDetails?.userId) {
      toast.error("User ID is missing.");
      return;
    }
    data.userId = userDetails.userId;

    try {
      await axiosInstance.post("/post/add", data);
      toast.success("Job posted successfully!");
    } catch (error) {
      toast.error("Error creating the job post!");
    }
  };

  const handleshiftelect = (e) => {
    const value = e.target.value;
    if (selectedshift.includes(value)) {
      setSelectedshift(selectedshift.filter((shift) => shift !== value));
    } else {
      setSelectedshift([...selectedshift, value]);
    }
  };

  // Lottie animation configuration
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const shiftOptions = [
    { value: "0", label: "Breakfast" },
    { value: "1", label: "Lunch" },
    { value: "2", label: "Dinner" },
    { value: "3", label: "Night" },
  ];

  return (
    // <div className="flex min-h-screen relative bg-gray-100">
    <div className="bg-gray-100 flex justify-center">
      <div className="w-full lg:w-2/3 p-8 bg-white shadow-md rounded-lg mt-3">
        <ToastContainer theme="colored" autoClose={2000} closeOnClick />

        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">
          Create Job Posting
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Title Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Job Title
              </label>
              <input
                type="text"
                {...register("title")}
                className={`mt-1 block w-full p-2 border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Job Description Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Job Description
              </label>
              <textarea
                {...register("description")}
                className={`mt-1 block w-full p-2 border ${
                  errors.description ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Location Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Location
              </label>
              <input
                type="text"
                {...register("location")}
                className={`mt-1 block w-full p-2 border ${
                  errors.location ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Job Type Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Job Type
              </label>
              <select
                {...register("jobType")}
                className={`mt-1 block w-full p-2 border ${
                  errors.jobType ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              >
                <option value="">Select a job type</option>
                <option value="0">Full-time</option>
                <option value="1">Part-time</option>
                <option value="2">Freelance</option>
                <option value="3">Internship</option>
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobType.message}
                </p>
              )}
            </div>

            {/* Salary Range Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Salary Range (optional)
              </label>
              <input
                type="text"
                {...register("salaryRange")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Company Name Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Company Name
              </label>
              <input
                type="text"
                {...register("companyName")}
                className={`mt-1 block w-full p-2 border ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Experience Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Experience
              </label>
              <input
                type="text"
                {...register("experience")}
                className={`mt-1 block w-full p-2 border ${
                  errors.experience ? "border-red-500" : "border-gray-300"
                } rounded-md`}
              />
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Application Deadline Field */}
            <div>
              <label className="block text-lg text-blue-600 font-semibold">
                Application Deadline
              </label>
              <input
                type="date"
                {...register("applicationDeadline")}
                className={`mt-1 block w-full p-2 border ${
                  errors.applicationDeadline
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md`}
              />
              {errors.applicationDeadline && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.applicationDeadline.message}
                </p>
              )}
            </div>

            {/* shift (Multi-select) */}
            <div className="md:col-span-1">
              <label className="block text-lg text-blue-600 font-semibold">
                Select shift
              </label>
              <div className="grid grid-cols-2 gap-2">
                {shiftOptions.map((shift) => (
                  <label key={shift.value} className="flex items-center">
                    <input
                      type="checkbox"
                      value={shift.value}
                      checked={selectedshift.includes(shift.value)}
                      onChange={handleshiftelect}
                      className="mr-2"
                    />
                    {shift.label}
                  </label>
                ))}
              </div>
              {errors.shift && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shift.message}
                </p>
              )}
            </div>
          </div>

          {/* Display Selected shift as Capsule Tags */}
          {selectedshift.length > 0 && (
            <div className="mt-4">
              <label className="block text-lg text-blue-600 font-semibold mb-2">
                Selected shift:
              </label>
              <div className="flex gap-2 flex-wrap">
                {selectedshift.map((shiftValue) => {
                  const shiftLabel = shiftOptions.find(
                    (opt) => opt.value === shiftValue
                  )?.label;
                  return (
                    <span
                      key={shiftValue}
                      className="bg-blue-500 text-white px-3 py-1 rounded-full"
                    >
                      {shiftLabel}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormWithAnimation;
