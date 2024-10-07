import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { axiosInstance } from '../services/interceptor';
import useAuth from '../hooks/use-auth';

// Zod schema for validation
const schema = z
  .object({
    oldPassword: z.string().min(8, 'Old password must be at least 8 characters'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // Path points to confirmPassword for error display
  });

const ChangePassword = () => {
  const { getUserDetails } = useAuth();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userId } = getUserDetails();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`/changePassword/${userId}`, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password successfully changed!');
      reset();
    } catch (error) {
      toast.error('Failed to change password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <ToastContainer autoClose={2000} />
      <div className="max-w-lg w-full bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              autoComplete="off" // Prevents browser from saving old password
              {...register('oldPassword')}
              className={`mt-1 block w-full p-2 border ${
                errors.oldPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              autoComplete="new-password" // Prevents browser from suggesting saved passwords
              {...register('newPassword')}
              className={`mt-1 block w-full p-2 border ${
                errors.newPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <VisibilityOff className="h-5 w-5 text-gray-500 mt-5" />
              ) : (
                <Visibility className="h-5 w-5 text-gray-500 mt-5" />
              )}
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
            //   autoComplete="new-password" // Prevents browser from suggesting saved passwords
              autoComplete="nope"
              {...register('confirmPassword')}
              className={`mt-1 block w-full p-2 border ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              } rounded-md`}
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <VisibilityOff className="h-5 w-5 text-gray-500 mt-5" />
              ) : (
                <Visibility className="h-5 w-5 text-gray-500 mt-5" />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
