import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../services/interceptor";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the schema using Zod for validation
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
    .nonempty("At least one shift is required"),
});

const EditJobPostModal = ({ isOpen, onClose, job, onUpdate }) => {
  const { register, handleSubmit, setValue } = useForm({
    resolver: zodResolver(jobSchema),
  });

  useEffect(() => {
    if (job) {
      setValue("title", job.title);
      setValue("description", job.description);
      setValue("location", job.location);
      setValue("jobType", job.jobType);
      setValue("salaryRange", job.salaryRange || "");
      setValue("companyName", job.companyName);
      setValue("experience", job.experience);
      setValue("applicationDeadline", job.applicationDeadline);
      setValue("shift", job.shift || []);
    }
  }, [job, setValue]);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.put(`/post/update/${job.id}`, data);
      toast.success("Job updated successfully!");
      onUpdate();
      onClose();
    } catch (error) {
      toast.error("Error updating the job!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-10 fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-3/4 max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Job Posting</h2>
        <ToastContainer theme="colored" autoClose={2000} closeOnClick />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold">Job Title</label>
              <input
                type="text"
                {...register("title")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Location</label>
              <input
                type="text"
                {...register("location")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Job Type</label>
              <select
                {...register("jobType")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a job type</option>
                <option value="0">Full-time</option>
                <option value="1">Part-time</option>
                <option value="2">Freelance</option>
                <option value="3">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Salary Range (optional)
              </label>
              <input
                type="text"
                {...register("salaryRange")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">
                Company Name
              </label>
              <input
                type="text"
                {...register("companyName")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold">Experience</label>
              <input
                type="text"
                {...register("experience")}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold">
              Job Description
            </label>
            <textarea
              {...register("description")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold">
              Application Deadline
            </label>
            <input
              type="date"
              {...register("applicationDeadline")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold">Shift</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <label>
                <input
                  type="checkbox"
                  value="0"
                  {...register("shift")}
                  className="mr-2"
                />
                Morning Shift
              </label>
              <label>
                <input
                  type="checkbox"
                  value="1"
                  {...register("shift")}
                  className="mr-2"
                />
                Evening Shift
              </label>
              <label>
                <input
                  type="checkbox"
                  value="2"
                  {...register("shift")}
                  className="mr-2"
                />
                Night Shift
              </label>
              <label>
                <input
                  type="checkbox"
                  value="3"
                  {...register("shift")}
                  className="mr-2"
                />
                Flexible Shift
              </label>
            </div>
          </div>
          <div className="flex justify-center gap-5 mr-3">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Update
            </button>
            <button
              onClick={onClose}
              className=" w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobPostModal;
