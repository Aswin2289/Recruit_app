import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { axiosInstance } from "../services/interceptor";
import EditJobPostModal from "./edit-job-post-modal";
const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loadingJob, setLoadingJob] = useState(true);
  const [loadingApplicants, setLoadingApplicants] = useState(true);
  const [errorJob, setErrorJob] = useState(null);
  const [errorApplicants, setErrorApplicants] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const jobStatus = {
    0: "Active",
    1: "Inactive",
    2: "Deleted",
    3: "Blocked",
    4: "Pending",
  };

  // Define fetchJobDetails outside of useEffect
  const fetchJobDetails = async () => {
    try {
      const response = await axiosInstance.get(`post/company/job/${id}`);
      const jobData = response.data;
      setJob(jobData);
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
          sortBy: "createDate",
          sortOrder: "desc",
          page,
          size,
        },
      });
      setApplicants(response.data.items || []);
    } catch (err) {
      setErrorApplicants("Failed to fetch applicants");
    } finally {
      setLoadingApplicants(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
    fetchApplicants();
  }, [id, page, size]);
  if (loadingJob || loadingApplicants) {
    return <div className="text-center text-blue-600 text-lg">Loading...</div>;
  }

  if (errorJob) {
    return <div className="text-center text-red-600 text-lg">{errorJob}</div>;
  }

  if (!job) {
    return (
      <div className="text-center text-red-600 text-lg">Job not found!</div>
    );
  }

  const handleDeleteJob = () => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      axiosInstance
        .put(`post/company/job/delete/${id}`)
        .then(() => {
          alert("Job post deleted successfully.");
          navigate("/viewpost");
        })
        .catch(() => {
          alert("Failed to delete job post.");
        });
    }
  };

  const handleEditJob = () => {
    navigate(`/edit-job/${id}`);
  };

  const handleDeleteApplicant = (applicantId) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      axiosInstance
        .delete(`/applicant/${applicantId}`)
        .then(() => {
          alert("Applicant deleted successfully.");
          // Refresh applicants after deletion
          setApplicants(applicants.filter((app) => app.id !== applicantId));
        })
        .catch(() => {
          alert("Failed to delete applicant.");
        });
    }
  };

  const handleViewDetail = (applicantId) => {
    navigate(`/detailview/${applicantId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleUpdateJob = () => {
    fetchJobDetails(); // Refresh job details after update
    setIsModalOpen(false); // Close the modal after updating
  };

  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gray-100 overflow-auto">
      <div className="mx-auto flex flex-col lg:flex-row gap-6 w-full">
        {/* Job Details Card */}
        <div className="bg-white shadow-md rounded-md p-6 border border-gray-200 flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold mb-6 text-blue-700">
              {job.title}
            </h2>

            {/* Edit and Delete Buttons */}
            <div className="flex space-x-2 mb-4">
              <button
                onClick={() => setIsModalOpen(true)}
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
          <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 flex-1">
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
                  <th className="px-4 py-2 text-left">Status</th>
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
                    <td className="px-4 py-2">{applicant.experience} years</td>
                    <td className="px-4 py-2">
                      {new Date(applicant.createDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{applicant.status}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleDeleteApplicant(applicant.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleViewDetail(applicant.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg flex items-center"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div>
                <label htmlFor="size" className="mr-2">
                  Items per page:
                </label>
                <select
                  id="size"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="border border-gray-300 rounded-md"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 0}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-l"
                >
                  Previous
                </button>
                <span className="px-4">{page + 1}</span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={applicants.length < size}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded-r"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="">
        <EditJobPostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          job={job}
          onUpdate={handleUpdateJob}
        />
      </div>
    </div>
  );
};

export default JobDetails;
