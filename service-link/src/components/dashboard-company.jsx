import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBriefcase, FaFileAlt, FaBell } from "react-icons/fa";
import FeaturedJobSeekers from "./jobseekercard/featured-job-seekers";
import { useNavigate } from 'react-router-dom';
// Register the components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Sample chart data for job postings
const jobPostingChartData = {
  labels: ["Active", "Pending", "Closed"],
  datasets: [
    {
      data: [10, 5, 2],
      backgroundColor: ["#4ade80", "#facc15", "#ef4444"],
    },
  ],
};

// Sample chart data for applications
const applicationChartData = {
  labels: ["Pending", "Reviewed", "Shortlisted"],
  datasets: [
    {
      data: [8, 12, 4],
      backgroundColor: ["#4ade80", "#facc15", "#ef4444"],
    },
  ],
};
const mockData = {
  suggestedJobs: [
    {
      id: 1,
      title: "Software Engineer",
      location: "Remote",
      applicationDeadline: "2024-10-15",
      Applicant: 13,
    },
    {
      id: 2,
      title: "Product Manager",
      location: "New York, NY",
      applicationDeadline: "2024-10-15",
      Applicant: 10,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      location: "Remote",
      applicationDeadline: "2024-10-15",
      Applicant: 5,
    },
    {
      id: 4,
      title: "React Designer",
      location: "New York, NY",
      applicationDeadline: "2024-10-15",
      Applicant: 8,
    },
    {
      id: 1,
      title: "Chef",
      location: "Remote",
      applicationDeadline: "2024-10-15",
      Applicant: 15,
    },
    {
      id: 2,
      title: "Waiter",
      location: "New York, NY",
      applicationDeadline: "2024-10-15",
      Applicant: 20,
    },
  ],
};

// Data for the bar chart (Job posts and applications)
const jobPostsApplicationsBarData = {
  labels: ["Job Post 1", "Job Post 2", "Job Post 3"], // Job post names
  datasets: [
    {
      label: "Number of Applications",
      data: [5, 10, 7], // Number of applications for each job post
      backgroundColor: "#4ade80", // Bar color
    },
  ],
};

function DashboardCompany() {
  const navigate = useNavigate();
  const [suggestedJobs, setSuggestedJobs] = useState(mockData.suggestedJobs);

  // Mock data
  const jobPostings = {
    active: 10,
    pending: 5,
    closed: 2,
  };

  const applications = {
    pending: 8,
    reviewed: 12,
    shortlisted: 4,
  };
  const viewJobDetails = (id) => {
    navigate(`/jobdetail/${id}`); // Navigate to the job details page
  };
  return (
    <div className="flex h-full bg-gray-100">
      <ToastContainer theme="colored" autoClose={2000} closeOnClick />

      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 sticky top-0 h-screen p-6 overflow-y-auto">
        {/* Overview Cards */}
        <div className="flex flex-col gap-6">
          {/* Notifications Card */}
          <div className="bg-gradient-to-r from-red-400 to-pink-500 p-6 rounded-lg shadow-lg flex items-center min-w-[300px]">
            <FaBell className="text-white text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Notifications
              </h2>
              <div className="mt-4 text-white">
                <p>You have 3 new applications.</p>
              </div>
            </div>
          </div>

          {/* Job Postings Card */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-lg shadow-lg flex items-center min-w-[300px]">
            <FaBriefcase className="text-white text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Job Postings
              </h2>
              <div className="mt-4 text-white">
                <p>Active: {jobPostings.active}</p>
                <p>Pending: {jobPostings.pending}</p>
                <p>Closed: {jobPostings.closed}</p>
              </div>
            </div>
          </div>

          {/* Applications Card */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-lg shadow-lg flex items-center min-w-[300px]">
            <FaFileAlt className="text-white text-4xl mr-4" />
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Applications
              </h2>
              <div className="mt-4 text-white">
                <p>Pending: {applications.pending}</p>
                <p>Reviewed: {applications.reviewed}</p>
                <p>Shortlisted: {applications.shortlisted}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Charts */}
        <div className="bg-gray-100 mb-8">
          <div className="flex gap-5 justify-between">
            {/* Bar Chart - Job Posts and Applications */}
            <div className="bg-white rounded-lg shadow-md flex-1 p-2">
              {" "}
              {/* Reduced padding */}
              <h2 className="p-4 text-xl font-semibold text-gray-700 mb-4">
                {" "}
                {/* Adjusted margin */}
                Job Posts and Applications
              </h2>
              <div className="w-full items-center justify-center">
                <ul className="p-4 space-y-4 w-full">
                  {" "}
                  {/* Reduced space between items */}
                  {suggestedJobs.length > 0 ? (
                    suggestedJobs.map((job) => (
                      <li
                        key={job.id}
                        className="p-3 border rounded-lg flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-all" // Reduced padding inside each list item
                      >
                        <div>
                          <h3 className="text-md font-bold">{job.title}</h3>
                          <div className=" flex  gap-6">
                            <p className="text-sm text-gray-500">
                              Location: {job.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              DeadLine: {job.applicationDeadline}
                            </p>
                          </div>
                          <p className="text-sm text-gray-500">
                            Applicant: {job.Applicant}
                          </p>
                        </div>
                        <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors"
                         onClick={() => viewJobDetails(job.id)}>
                          View More
                        </button>
                      </li>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">
                      No suggested jobs found.
                    </p>
                  )}
                </ul>
                <div className="text-center mt-4 mb-3">
                  <a
                    href="/viewpost"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Find Other Jobs
                  </a>
                </div>
              </div>
            </div>

            {/* Pie Charts - Stacked vertically */}
            <div className="flex flex-col gap-5">
              <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col items-center p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Job Postings Overview
                </h2>
                <div className="w-full h-full flex items-center justify-center">
                  <Pie
                    data={jobPostingChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) =>
                              `${context.label}: ${context.raw}`,
                          },
                        },
                      },
                    }}
                    height={200}
                    width={300}
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md flex-1 flex flex-col items-center p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Applications Overview
                </h2>
                <div className="w-full h-full flex items-center justify-center">
                  <Pie
                    data={applicationChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) =>
                              `${context.label}: ${context.raw}`,
                          },
                        },
                      },
                    }}
                    height={200}
                    width={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Job Seekers */}
        <div className="bg-gray-100 mb-8">
          <FeaturedJobSeekers />
        </div>
      </div>
    </div>
  );
}

export default DashboardCompany;
