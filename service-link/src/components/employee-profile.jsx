import React, { useEffect, useState } from "react";
import { axiosInstance } from "../services/interceptor";
import useAuth from "../hooks/use-auth";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Modal, TextField, Button } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for validation
const editProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  profileSummary: z.string().min(1, "Profile Summary is required"),
  education: z.string().min(1, "Education is required"),
  location: z.string().min(1, "Location is required"),
  website: z.string().min(1,"Invalid URL").optional(),
  address: z.string().min(1, "Address is required"),
  experience: z.string().min(1, "Experience is required"), // Added experience field
});

const EmployeeProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Modal state
  const { getUserDetails } = useAuth();
  const navigate = useNavigate();
  const { userId } = getUserDetails();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
  });

  const openEditModal = () => {
    // Populate the form with current user data
    setValue("name", user.name);
    setValue("title", user.title);
    setValue("profileSummary", user.profileSummary);
    setValue("education", user.education);
    setValue("location", user.location);
    setValue("website", user.website);
    setValue("address", user.address);
    setValue("experience", user.experience); // Set experience value
    setOpenModal(true);
  };

  const handleChangePassword = () => {
    navigate("/changepassword");
  };

  const handleDeactivateUser = async () => {
    if (window.confirm("Are you sure you want to delete your Account?")) {
      try {
        await axiosInstance.put(`/user/deleteProfile/${user.id}`); // Changed from DELETE to PUT
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

  const onSubmit = async (data) => {
    // Handle the form submission
    try {
      await axiosInstance.put(`/user/editEmployeeProfile/${user.id}`, data);
      alert("Profile updated successfully.");
      setUser((prevUser) => ({
        ...prevUser,
        ...data,
      }));
      setOpenModal(false);
      
      // Optionally, you can fetch the updated user data again
    } catch (error) {
      alert("Failed to update profile.");
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile/${userId}`);
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {user ? (
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="flex justify-between items-center border-b pb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.title}</p>
            </div>
            <div className="space-x-4">
              <Tooltip title="Edit Profile" arrow>
                <button
                  className="bg-blue-600 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-700 transition"
                  onClick={openEditModal}
                >
                  Edit Profile
                </button>
              </Tooltip>
              <button
                className="bg-yellow-600 text-white text-sm px-6 py-2 rounded-full hover:bg-yellow-700 transition"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
              <button
                className="bg-red-600 text-white text-sm px-6 py-2 rounded-full hover:bg-red-700 transition"
                onClick={handleDeactivateUser}
              >
                Deactivate
              </button>
            </div>
          </div>

          {/* Profile Summary - Moved to the top */}
          <div>
            <h2 className="text-lg font-semibold text-gray-600">
              Profile Summary
            </h2>
            <p className="text-gray-900">{user.profileSummary}</p>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Email</h2>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Phone</h2>
              <p className="text-gray-900">{user.phone}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Education</h2>
              <p className="text-gray-900">{user.education}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Address</h2>
              <p className="text-gray-900">{user.address}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                Experience
              </h2>{" "}
              {/* Added Experience Field */}
              <p className="text-gray-900">{user.experience || 0}</p>{" "}
              {/* Show 0 if experience is null */}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-600">Website</h2>
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </a>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-600">Location</h2>
              <p className="text-gray-900">{user.location}</p>
            </div>
          </div>

          {/* Modal for Editing Profile */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="edit-profile-modal"
            aria-describedby="edit-profile-modal-description"
          >
            <div className="flex items-center justify-center h-full ">
              <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-4xl overflow-y-scroll">
                <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                  <TextField
                    fullWidth
                    label="Title"
                    variant="outlined"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                  <TextField
                    fullWidth
                    label="Profile Summary"
                    variant="outlined"
                    {...register("profileSummary")}
                    error={!!errors.profileSummary}
                    helperText={errors.profileSummary?.message}
                    multiline
                    rows={3}
                  />
                  <TextField
                    fullWidth
                    label="Education"
                    variant="outlined"
                    {...register("education")}
                    error={!!errors.education}
                    helperText={errors.education?.message}
                  />
                  <TextField
                    fullWidth
                    label="Location"
                    variant="outlined"
                    {...register("location")}
                    error={!!errors.location}
                    helperText={errors.location?.message}
                  />
                  <TextField
                    fullWidth
                    label="Website"
                    variant="outlined"
                    {...register("website")}
                    error={!!errors.website}
                    helperText={errors.website?.message}
                  />
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                  <TextField
                    fullWidth
                    label="Experience"
                    variant="outlined"
                    {...register("experience")} // Added Experience Field
                    error={!!errors.experience}
                    helperText={errors.experience?.message}
                  />
                  <div className="flex justify-end space-x-2 md:col-span-2">
                    <button
                      className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                      onClick={() => setOpenModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>
        </div>
      ) : (
        <div className="text-red-500 text-center">No user data available.</div>
      )}
    </div>
  );
};

export default EmployeeProfile;
