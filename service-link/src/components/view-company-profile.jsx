import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/interceptor";
import useAuth from "../hooks/use-auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
// Define the Zod schema for form validation
const companySchema = z.object({
  companyName: z.string().nonempty("Company Name is required"),
  website: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  profileSummary: z.string().optional(),
  location: z.string().optional(),
});

const ViewCompanyProfile = () => {
  const { getUserDetails } = useAuth();
  const { userId } = getUserDetails();

  const [companyData, setCompanyData] = useState({
    companyName: "",
    website: "",
    email: "",
    phone: "",
    address: "",
    profileSummary: "",
    location: "",
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    fetchUserData(); // Re-fetch data when modal closes
  };

  // Setup React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    setValue,
    reset, // Reset the form values
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.put(
        `/user/editProfile/${userId}`,
        data
      );
      setCompanyData(response.data); // Update state with new data
      reset(response.data); // Reset form values to new data
      closeEditModal(); // Close modal
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Failed to save changes. Please try again.");
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axiosInstance.get(`/user/profile/${userId}`);
      setCompanyData(response.data);
      reset(response.data); // Populate form fields with user data
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch user data when the component mounts
  }, [userId]); // No need for setValue here as we use reset in fetchUserData

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your Account?")) {
      try {
        await axiosInstance.put(`/user/deleteProfile/${companyData.id}`); // Changed from DELETE to PUT
        alert("Account Successfully deleted");

        // Clear local storage
        localStorage.clear();

        // Navigate to login
        navigate("/login");
      } catch (error) {
        alert("Failed to delete the account.");
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleChangePassword = () => {
    navigate("/changepassword"); // Navigate to dashboard
  };

  return (
    <div className="w-full h-screen p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md">
      <div className="h-screen flex flex-col md:flex-row">
        <div className="flex-1 min-w-0 md:w-2/3 lg:w-3/4 pr-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {companyData.companyName || "Null"}
            </h1>
            <p className="text-sm text-gray-600">
              Industry • {companyData.location}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 mb-6 w-3/4">
            <div className="flex gap-3">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Company Details
              </h2>
              <button className="bg-blue-600 text-white text-sm px-14 py-0 rounded-3xl hover:bg-blue-700 mb-5" onClick={openEditModal}>
                <Tooltip title="Edit Profile" arrow>
                  Edit
                </Tooltip>
              </button>
              <button
                className="bg-yellow-600 text-white text-sm px-4 py-2 rounded-3xl hover:bg-yellow-700 mb-5"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
            {/* <div className="flex justify-end gap-3">
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Website</h3>
                <p className="text-lg text-gray-800">
                  {companyData.website || "Null"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Email</h3>
                <p className="text-lg text-gray-800">
                  {companyData.email || "Null"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Phone</h3>
                <p className="text-lg text-gray-800">
                  {companyData.phone || "Null"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Address</h3>
                <p className="text-lg text-gray-800">
                  {companyData.address || "Null"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <h3 className="text-sm font-medium text-gray-600">
                  Profile Summary
                </h3>
                <p className="text-lg text-gray-800">
                  {companyData.profileSummary || "Null"}
                </p>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-start gap-3">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl h-3/4 overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    {...register("companyName")}
                    className={`mt-1 block w-full border rounded-md p-2 ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    {...register("website")}
                    className="mt-1 block w-full border rounded-md p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    className={`mt-1 block w-full border rounded-md p-2 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className="mt-1 block w-full border rounded-md p-2 border-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    {...register("address")}
                    className="mt-1 block w-full border rounded-md p-2 border-gray-300"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Profile Summary
                  </label>
                  <textarea
                    {...register("profileSummary")}
                    className="mt-1 block w-full border rounded-md p-2 border-gray-300"
                    rows="4"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCompanyProfile;
