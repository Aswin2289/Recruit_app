import React, { useEffect, useState, useRef, useCallback } from "react";
import { axiosInstance } from "../../services/interceptor";
import useAuth from "../../hooks/use-auth";
// Extended mock data with additional job details
const mockData = [
  // Your mock data here...
];

const ViewAllJobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [statusJob, setStatusJob] = useState("1,0,4");
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const searchInputRef = useRef(null); // Ref for search input field
  const [applySuccess, setApplySuccess] = useState(null); // Store success message
  const [applyError, setApplyError] = useState(null); // Store error message
  const { getUserDetails } = useAuth();
  const { userId } = getUserDetails();
  const [isApplied, setIsApplied] = useState(false);
  // Fetch jobs and reset search input focus after loading
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/post/job/list", {
          params: {
            page: currentPage,
            size: rowsPerPage,
            searchKeyword,
            status: statusJob,
            sortBy,
            sortOrder,
          },
        });

        const newJobs = response.data.items || [];

        if (currentPage === 0) {
          setJobs(newJobs); // Reset the job list when on the first page
        } else {
          setJobs((prevJobs) => [...prevJobs, ...newJobs]); // Append jobs for subsequent pages
        }

        setHasMore(newJobs.length >= rowsPerPage);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to fetch jobs. Displaying mock data.");
        setJobs(mockData);
      } finally {
        setLoading(false);
        if (searchInputRef.current) {
          searchInputRef.current.focus(); // Focus on search input after jobs load
        }
      }
    };

    fetchJobs();
  }, [currentPage, rowsPerPage, searchKeyword, statusJob, sortBy, sortOrder]);

  // Refocus search input on job selection or search change
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [jobs, searchKeyword, selectedJob]);

  const checkIfApplied = async (jobId) => {
    
    try {
      const response = await axiosInstance.get("/applicant/applied", {
        params: {
          userId: userId,   // Pass userId as a query parameter
          jobPostId: jobId, // Pass jobPostId as a query parameter
        },
      });

      setIsApplied(response.data); // Update the applied status
    } catch (error) {
      console.error("Error checking application status:", error);
      setIsApplied(false); // Default to not applied on error
    }
  };

  const lastJobElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleCardClick = (job) => {
    setSelectedJob(job);
    checkIfApplied(job.id);
    // Ensure the search input is refocused when a job is clicked
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(0); // Reset to the first page for new search results
    setJobs([]); // Clear previous results
    setSelectedJob(null);
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // Ensure the search bar remains focused when changing search
    }
  };
  const handleApplyNow = async (jobId) => {
    try {
      // Replace with dynamic user ID as needed

      // Call the API to apply for the job
      const response = await axiosInstance.post("/applicant/apply", {
        userId: userId,
        jobPostId: jobId,
      });

      // Success handling
      setApplySuccess("Successfully applied for the job!");
      setApplyError(null);
    } catch (error) {
      console.error("Failed to apply for job:", error);
      setApplyError("Failed to apply for the job.");
      setApplySuccess(null);
    }
  };

  if (loading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-center">All Job Posts</h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center w-full">
        <input
          ref={searchInputRef} // Add ref to the input
          type="text"
          placeholder="Search jobs..."
          value={searchKeyword}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-full max-w-3xl" // Full width
        />
      </div>

      <div
        className={`flex ${
          selectedJob ? "md:flex-row" : "flex-wrap"
        } gap-6 w-full`}
      >
        {/* Job List */}
        <div
          className={`flex-1 ${selectedJob ? "md:w-1/2" : "w-full"} max-w-${
            selectedJob ? "md" : "full"
          } mx-auto`}
        >
          <div
            className={`flex ${
              selectedJob ? "flex-col" : "flex-row flex-wrap ml-16 mr-16"
            } gap-6 `}
          >
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                selectedJob ? "lg:grid-cols-1" : "lg:grid-cols-3"
              } gap-6 `}
            >
              {jobs.length > 0 ? (
                jobs.map((job, index) => (
                  <div
                    key={job.id}
                    ref={jobs.length === index + 1 ? lastJobElementRef : null}
                    className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleCardClick(job)}
                  >
                    <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                      Location: {job.location}
                    </p>
                    <p className="text-gray-700 mb-4 break-words">
                      {job.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Posted on:
                      <span>
                        {job.postDate ? <> {job.postDate.join("-")}</> : "N/A"}
                      </span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No job posts available.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Job Details */}
        {selectedJob && (
          <div className="flex-1 md:w-1/2 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">
                {selectedJob.title}
              </h2>
              <p className="text-lg text-gray-600 mb-2">
                Location: {selectedJob.location}
              </p>
              <p className="text-gray-700 mb-4 break-words">
                {selectedJob.description}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Posted on:
                <span>
                  {selectedJob.postDate ? (
                    <> {selectedJob.postDate.join("-")}</>
                  ) : (
                    "N/A"
                  )}
                </span>
              </p>

              {/* Apply Now Button */}
              <div className="mb-4">
                {isApplied ? (
                  <span className="inline-block px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow-md">
                    Applied
                  </span>
                ) : (
                  <button
                    onClick={() => handleApplyNow(selectedJob.id)}
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Additional Job Details */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
                <p className="text-gray-700 break-words">
                  {selectedJob.responsibilities || "Not available"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Qualifications</h3>
                <p className="text-gray-700 break-words">
                  {selectedJob.qualifications || "Not available"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Benefits</h3>
                <p className="text-gray-700 break-words">
                  {selectedJob.benefits || "Not available"}
                </p>
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Job Details</h3>
                <p className="text-gray-700 mb-1">
                  <strong>Contract Type:</strong>{" "}
                  {selectedJob.contractType || "Not available"}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Salary Range:</strong>{" "}
                  {selectedJob.salaryRange || "Not available"}
                </p>
                <p className="text-gray-700 mb-1">
                  <strong>Experience Level:</strong>{" "}
                  {selectedJob.experienceLevel || "Not available"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center text-lg font-semibold mt-6">
          Loading more jobs...
        </div>
      )}

      {/* {!hasMore && !loading && (
        // <div className="text-center text-lg font-semibold mt-6">No more jobs to load.</div>
      )} */}
    </div>
  );
};

export default ViewAllJobPost;
