import React, { useState } from "react";

// Mock Data for Recent Applications and Suggested Jobs
const mockData = {
  applications: [
    {
      id: 1,
      title: "Frontend Developer at TechCorp",
      appliedDate: "25th Aug, 2024",
      status: "Under Review",
      statusColor: "green",
    },
    {
      id: 2,
      title: "Backend Developer at WebSolutions",
      appliedDate: "20th Aug, 2024",
      status: "Rejected",
      statusColor: "red",
    },
  ],
  suggestedJobs: [
    {
      id: 1,
      title: "Full Stack Developer at DevHub",
      location: "Remote",
    },
    {
      id: 2,
      title: "UI/UX Designer at CreativeStudio",
      location: "New York, NY",
    },
    {
      id: 3,
      title: "Chef at DevHub",
      location: "Remote",
    },
    {
      id: 4,
      title: "Waiter at CreativeStudio",
      location: "New York, NY",
    },
  ],
  jobInsights: {
    totalApplied: 12,
    savedJobs: 8,
    responseRate: "75%",
    newApplications: 3,
    newSavedJobs: 1,
  },
};

const DashboardEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState(mockData.applications);
  const [suggestedJobs, setSuggestedJobs] = useState(mockData.suggestedJobs);

  // Search Filter Function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Filter applications by search term
    const filteredApplications = mockData.applications.filter((app) =>
      app.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setApplications(filteredApplications);

    // Filter suggested jobs by search term
    const filteredJobs = mockData.suggestedJobs.filter((job) =>
      job.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSuggestedJobs(filteredJobs);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">
      {/* Main Content in 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Column 1 - Profile Summary and Recent Job Applications (split into 2 rows) */}
        <div className="col-span-1 space-y-6">
          {/* Profile Summary */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Profile Summary</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-full w-24 h-24 shadow-md border-2 border-gray-300"
              />
              <div>
                <h3 className="text-md font-bold">John Doe</h3>
                <p className="text-sm text-gray-500">Software Developer</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Completed <span className="font-semibold text-blue-500">5</span>{" "}
              applications this month. Keep applying for more jobs to increase your chances!
            </p>
          </div>

          {/* Recent Job Applications */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Recent Job Applications</h2>
            <ul className="space-y-4">
              {applications.length > 0 ? (
                applications.map((application) => (
                  <li
                    key={application.id}
                    className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-md font-bold">{application.title}</h3>
                      <p className="text-sm text-gray-500">
                        Applied on: {application.appliedDate}
                      </p>
                    </div>
                    <span
                      className={`text-sm text-${application.statusColor}-500 bg-${application.statusColor}-100 px-2 py-1 rounded-full`}
                    >
                      {application.status}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No applications found.</p>
              )}
            </ul>
            <div className="text-center mt-8">
              <a
                href="#find-other-jobseekers"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Find Other Applications
              </a>
            </div>
          </div>
        </div>

        {/* Column 2 - Search Bar and Suggested Jobs (Increase width by spanning 2 columns) */}
        <div className="col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search jobs or applications..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-4 bg-white rounded-lg shadow-lg border border-gray-300"
            />
          </div>

          {/* Suggested Jobs */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Suggested Jobs</h2>
            <ul className="space-y-4">
              {suggestedJobs.length > 0 ? (
                suggestedJobs.map((job) => (
                  <li
                    key={job.id}
                    className="p-4 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-md font-bold">{job.title}</h3>
                      <p className="text-sm text-gray-500">Location: {job.location}</p>
                    </div>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                      Apply Now
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-gray-500">No suggested jobs found.</p>
              )}
            </ul>
            <div className="text-center mt-8">
              <a
                href="/viewalljob"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Find Other Jobs
              </a>
            </div>
          </div>
        </div>

        {/* Column 3 - Job Search Insights (Reduce width to span only 1 column) */}
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-4">Job Search Insights</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-md font-bold">Total Jobs Applied</p>
                  <p className="text-blue-500 text-xl font-semibold">
                    {mockData.jobInsights.totalApplied}
                  </p>
                </div>
                <span className="text-blue-500 bg-blue-100 px-2 py-1 rounded-full">
                  +{mockData.jobInsights.newApplications} this month
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-md font-bold">Jobs Saved</p>
                  <p className="text-green-500 text-xl font-semibold">
                    {mockData.jobInsights.savedJobs}
                  </p>
                </div>
                <span className="text-green-500 bg-green-100 px-2 py-1 rounded-full">
                  +{mockData.jobInsights.newSavedJobs} this month
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-md font-bold">Response Rate</p>
                  <p className="text-yellow-500 text-xl font-semibold">
                    {mockData.jobInsights.responseRate}
                  </p>
                </div>
                <span className="text-yellow-500 bg-yellow-100 px-2 py-1 rounded-full">
                  Steady
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;
