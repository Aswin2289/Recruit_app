import React, { useState } from 'react';

const ViewCompanyProfile = () => {
  const [companyData, setCompanyData] = useState({
    name: 'Company Name',
    website: 'www.companywebsite.com',
    email: 'info@company.com',
    phone: '+123 456 7890',
    address: '123 Company Street, City, Country',
    description: 'Brief description of the company.',
  });

  const [billingSummary, setBillingSummary] = useState({
    currentBalance: '$5,000',
    lastInvoiceAmount: '$1,200',
    nextDueDate: '2024-09-15',
    paymentMethod: 'Credit Card (**** **** **** 1234)',
    additionalDetails: 'Additional billing information that is hidden initially.',
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMoreVisible, setIsMoreVisible] = useState(false);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCompanyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Handle saving the changes (e.g., API call)
    closeEditModal();
  };

  const handleDeleteAccount = () => {
    // Handle account deletion (e.g., API call)
    closeDeleteModal();
  };

  const toggleMoreVisibility = () => setIsMoreVisible((prev) => !prev);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-md">
      <div className="flex flex-col md:flex-row">
        {/* Company Profile */}
        <div className="flex-1 min-w-0 md:w-2/3 lg:w-3/4 pr-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{companyData.name}</h1>
            <p className="text-sm text-gray-600">Industry • Location</p>
          </div>

          {/* Company Details Card */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Company Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Website</h3>
                <p className="text-lg text-gray-800">{companyData.website}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Email</h3>
                <p className="text-lg text-gray-800">{companyData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Phone</h3>
                <p className="text-lg text-gray-800">{companyData.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Address</h3>
                <p className="text-lg text-gray-800">{companyData.address}</p>
              </div>
              <div className="sm:col-span-2">
                <h3 className="text-sm font-medium text-gray-600">Description</h3>
                <p className="text-lg text-gray-800">{companyData.description}</p>
              </div>
            </div>
          </div>

         
          {/* Company Statistics */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Company Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 border border-gray-200 rounded-md text-center">
                <h3 className="text-lg font-semibold text-gray-800">Employees</h3>
                <p className="text-2xl font-bold text-gray-900">150</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-md text-center">
                <h3 className="text-lg font-semibold text-gray-800">Active Job Postings</h3>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              {/* Additional statistics can be added here */}
            </div>
          </div>

          {/* Company Culture */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Company Culture</h2>
            <div className="space-y-4">
              <div className="flex space-x-4">
                {/* Example Photo */}
                <img
                  src="/path/to/photo.jpg"
                  alt="Company Culture"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Our Workspace</h3>
                  <p className="text-gray-600">Description of the workspace environment.</p>
                </div>
              </div>
              {/* Additional media or descriptions can be added here */}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mb-6">
            <a href="https://linkedin.com/company/example" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" /* LinkedIn Icon SVG */></svg>
            </a>
            <a href="https://facebook.com/company/example" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" /* Facebook Icon SVG */></svg>
            </a>
            <a href="https://twitter.com/company/example" className="text-gray-600 hover:text-gray-800">
              <svg className="w-6 h-6" /* Twitter Icon SVG */></svg>
            </a>
          </div>
        </div>

        {/* Billing Summary Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3 lg:w-1/4 flex-shrink-0 h-fit mt-20">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Billing Summary</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-600">Current Balance</h3>
              <p className="text-lg text-gray-800">{billingSummary.currentBalance}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Last Invoice Amount</h3>
              <p className="text-lg text-gray-800">{billingSummary.lastInvoiceAmount}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Next Due Date</h3>
              <p className="text-lg text-gray-800">{billingSummary.nextDueDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Payment Method</h3>
              <p className="text-lg text-gray-800">{billingSummary.paymentMethod}</p>
            </div>
            {isMoreVisible && (
              <div>
                <h3 className="text-sm font-medium text-gray-600">Additional Details</h3>
                <p className="text-lg text-gray-800">{billingSummary.additionalDetails}</p>
              </div>
            )}
            <button
              className="mt-4 text-blue-600 hover:underline"
              onClick={toggleMoreVisibility}
            >
              {isMoreVisible ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Company Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Company Profile</h2>
            <div className="space-y-4">
              {Object.keys(companyData).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-600" htmlFor={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="text"
                    id={key}
                    name={key}
                    value={companyData[key]}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Account Deletion</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this account? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCompanyProfile;
