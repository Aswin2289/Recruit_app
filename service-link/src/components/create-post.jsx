import React from "react";
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
  description: z.string().min(10, "Job description should be at least 10 characters long"),
  location: z.string().min(1, "Location is required"),
  jobType: z.enum(["0", "1", "2", "3"], {
    required_error: "Job type is required",
  }), // Assuming jobType as byte in DTO (0, 1, 2, 3 for Full-Time, Part-Time, etc.)
  salaryRange: z.string().optional(),
  companyName: z.string().min(1, "Company name is required"),
  experience: z.string().min(1, "Experience is required"),
  
  applicationDeadline: z.string().min(1, "Application deadline is required"),
});

const FormWithAnimation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(jobSchema),
  });
  const { getUserDetails } = useAuth();
  const onSubmit = async (data) => {
    const userDetails = getUserDetails();
    console.log(userDetails); // Check if userId is present
    if (!userDetails?.userId) {
      toast.error("User ID is missing.");
      return;
    }
    data.userId = userDetails.userId;
  
    try {
      const response = await axiosInstance.post("/post/add", data);
      toast.success("Job posted successfully!");
      console.log(response.data);
    } catch (error) {
      toast.error("Error creating the job post!");
      console.error(error.response?.data || error.message);
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

  return (
    <div className="flex min-h-screen relative bg-gray-100">
      <div className="w-full lg:w-2/3 p-8 bg-white shadow-md rounded-lg ml-20 mt-5 mr-10">
        <ToastContainer theme="colored" autoClose={2000} closeOnClick />

        <h2 className="text-3xl font-extrabold mb-8 text-blue-700 text-center">
          Create Job Posting
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              rows="5"
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
              <option value="">Select Job Type</option>
              <option value="0">Full-Time</option>
              <option value="1">Part-Time</option>
              <option value="2">Contract</option>
              <option value="3">Internship</option>
            </select>
            {errors.jobType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.jobType.message}
              </p>
            )}
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

          {/* Salary Range Field */}
          <div>
            <label className="block text-lg text-blue-600 font-semibold">
              Salary Range (Optional)
            </label>
            <input
              type="text"
              {...register("salaryRange")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., $50,000 - $70,000"
            />
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

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="flex gap-1 items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Post Job
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="ml-2 w-5 h-5"
              >
                <defs>
                  <style>
                    {
                      ".cls-1{fill:none;stroke:currentcolor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}"
                    }
                  </style>
                </defs>
                <path
                  className="cls-1"
                  d="M21,12H3M12,3l9,9-9,9"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Lottie Animation */}
      <div className="hidden lg:block lg:w-1/3 lg:flex lg:justify-center lg:items-center">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default FormWithAnimation;
