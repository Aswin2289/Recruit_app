import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Updated import
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons
import { axiosInstance } from "../services/interceptor";

const JobDetails = () => {
  const { id } = useParams(); // Extract job ID from URL params
  const navigate = useNavigate(); // Initialize navigate
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]); // State for applicants list
  const [loadingJob, setLoadingJob] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);
  const [errorJob, setErrorJob] = useState(null);
  const [errorApplicants, setErrorApplicants] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10); // Items per page

  const jobStatus = {
    0: "Active",
    1: "Inactive",
    2: "Deleted",
    3: "Blocked",
    4: "Pending",
  };

  // Fetch job details using the job ID from API
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axiosInstance.get(`post/company/job/${id}`);
        const jobData = response.data;
        setJob(jobData); // Set job data
      } catch (err) {
        setErrorJob("Failed to fetch job details");
      } finally {
        setLoadingJob(false);
      }
    };

    const fetchApplicants = async () => {
      try {
        const response = await axiosInstance.get(`/applicant/list/${id}`, {
          params: {
            // status: '0,1,2,3', // Default status (can be modified as needed)
            sortBy: "createDate",
            sortOrder: "desc",
            page,
            size,
          },
        });
        console.log(response.data);

        setApplicants(response.data.items || []); // Ensure default empty array
      } catch (err) {
        setErrorApplicants("Failed to fetch applicants");
      } finally {
        setLoadingApplicants(false);
      }
    };

    fetchJobDetails();
    fetchApplicants();
  }, [id, page, size]);

  if (loadingJob || loadingApplicants) {
    return <div className="text-center text-blue-600 text-lg">Loading...</div>;
  }

  if (errorJob) {
    return <div className="text-center text-red-600 text-lg">{errorJob}</div>;
  }

  if (!job)
    return (
      <div className="text-center text-red-600 text-lg">Job not found!</div>
    );

  const handleDelete = (applicantId) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      // Call API to delete applicant
      axiosInstance
        .put(`/applicant/delete/${applicantId}`)
        .then(() => {
          alert("Applicant deleted successfully.");
          // Optionally refetch applicants or remove from UI
          setApplicants((prev) => prev.filter((app) => app.id !== applicantId));
        })
        .catch((err) => {
          alert("Failed to delete applicant.");
        });
    }
  };

  const handleViewDetail = (applicantId) => {
    navigate(`/detailview/${applicantId}`); // Navigate to applicant detail page
  };

  const handleEditJob = () => {
    navigate(`/edit-job/${id}`); // Navigate to job edit page
  };

  const handleDeleteJob = () => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      axiosInstance
        .put(`post/company/job/delete/${id}`)
        .then(() => {
          alert("Job post deleted successfully.");
          navigate("/viewpost"); // Redirect to job list page or any desired route
        })
        .catch((err) => {
          alert("Failed to delete job post.");
        });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(0); // Reset to first page when page size changes
  };
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Job Details Card */}
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 mb-6 relative">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">{job.title}</h2>

          {/* Edit and Delete Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={handleEditJob}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center"
            >
              <FaEdit className="inline-block mr-2" />
              Edit
            </button>
            <button
              onClick={handleDeleteJob}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
            >
              <FaTrash className="inline-block mr-2" />
              Delete
            </button>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-700">Description</h3>
            <p className="text-gray-700 text-base">{job.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Responsibilities
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-base">
                {job.responsibilities?.split(".").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Qualifications
              </h3>
              <ul className="list-disc list-inside text-gray-700 text-base">
                {job.qualifications?.split(".").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-700">Benefits</h3>
              <ul className="list-disc list-inside text-gray-700 text-base">
                {job.benefits?.split(",").map((item, index) => (
                  <li key={index}>{item.trim()}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700">
                Job Details
              </h3>
              <p className="text-gray-700 text-base mb-1">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Type:</strong>{" "}
                {job.jobType === 1 ? "Full-Time" : "Part-Time"}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Salary:</strong> {job.salaryRange}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Application Deadline:</strong>{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
              <p
                className={`font-semibold text-base ${
                  job.totalApplication > 10 ? "text-red-600" : "text-green-600"
                }`}
              >
                Applicants: {job.totalApplication || 0}
              </p>
              <p className="text-gray-700 text-base mb-1">
                <strong>Status:</strong> {jobStatus[job.status]}
              </p>
            </div>
          </div>
        </div>

        {/* Applicant List Card */}
        {applicants.length > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Applicant List
            </h3>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Experience</th>
                  <th className="px-4 py-2 text-left">Applied On</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applicants.map((applicant, index) => (
                  <tr key={applicant.id} className="border-t">
                    <td className="px-4 py-2 text-center">
                      {index + 1 + page * size}
                    </td>
                    <td className="px-4 py-2">{applicant.applicantName}</td>
                    <td className="px-4 py-2">{applicant.experience}</td>
                    <td className="px-4 py-2">
                      {new Date(applicant.createDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="bg-green-500 text-white px-2 py-1 rounded-md mr-2"
                        onClick={() => handleViewDetail(applicant.id)}
                      >
                        View
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md"
                        onClick={() => handleDelete(applicant.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              {/* Page Size Selector */}
              <div>
                <label htmlFor="pageSize" className="text-gray-700">
                  Show{" "}
                  <select
                    id="pageSize"
                    value={size}
                    onChange={handleSizeChange}
                    className="border rounded-md p-1"
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                  </select>{" "}
                  entries
                </label>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center">
                <button
                  className="px-3 py-1 border rounded-l-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <span className="px-3 py-1 border bg-white text-gray-800">
                  Page {page + 1}
                </span>
                <button
                  className="px-3 py-1 border rounded-r-md bg-gray-200 text-gray-800 hover:bg-gray-300"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={applicants.length < size}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {errorApplicants && (
          <div className="text-center text-red-600 text-lg">
            {errorApplicants}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
