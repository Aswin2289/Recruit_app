import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../services/interceptor";
import debounce from "lodash.debounce";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon from MUI

const ViewCompanyWisePost = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  // Map status byte to its corresponding string label and color
  const getStatusLabelAndStyle = (statusValue) => {
    switch (statusValue) {
      case 0:
        return {
          label: "Active",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
        };
      case 1:
        return {
          label: "Inactive",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
        };
      case 2:
        return {
          label: "Deleted",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
        };
      case 3:
        return {
          label: "Blocked",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
        };
      case 4:
        return {
          label: "Pending",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
        };
      default:
        return {
          label: "Unknown",
          bgColor: "bg-gray-200",
          textColor: "text-gray-600",
        };
    }
  };

  // Fetch job posts from the API
  const fetchJobs = async (currentPage, query = searchTerm) => {
    try {
      const response = await axiosInstance.get("post/company/job/list", {
        params: {
          page: currentPage,
          size: 12,
          sortField: "updatedDate",
          sortDirection: "desc",
          searchQuery: query,
        },
      });

      if (currentPage === 0) setJobs(response.data.items);
      else setJobs((prevJobs) => [...prevJobs, ...response.data.items]);

      setHasMore(response.data.items.length > 0);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch job posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchJobs(page, searchTerm);
  }, [page, searchTerm]);

  const debouncedSearch = debounce((value) => {
    setPage(0);
    setSearchTerm(value);
  }, 500);

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  if (loading && jobs.length === 0) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const viewJobDetails = (id) => {
    navigate(`/jobdetail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job post?")) {
      // Call the API to delete the job post by id
      axiosInstance
        .put(`/post/company/job/delete/${id}`) // Changed from DELETE to PUT
        .then(() => {
          // Remove the job from the UI after successful deletion
          setJobs(jobs.filter((job) => job.id !== id));
          alert("Job Post Successfully deleted");
        })
        .catch(() => {
          alert("Failed to delete the job post.");
        });
    }
  };

  const formatApplicationDeadline = (deadlineArray) => {
    if (!deadlineArray || deadlineArray.length !== 3) return "";
    const [year, month, day] = deadlineArray;
    return new Date(year, month - 1, day).toLocaleDateString();
  };

  return (
    <div className="h-screen p-8 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Company Job Posts
      </h2>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search job posts"
          className="px-4 py-2 border rounded-md w-full md:w-1/2 ring-1 ring-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
        />
      </div>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No job posts available.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {jobs.map((job) => {
            const { label, bgColor, textColor } = getStatusLabelAndStyle(
              job.status
            );
            return (
              <div
                key={job.id}
                className="relative bg-gradient-to-r from-gray-200 via-gray-200 to-gray-300 border border-gray-200 rounded-lg shadow-md p-4 flex items-center"
              >
                {/* Delete Icon at the top-right corner */}
                <button
                  onClick={() => handleDelete(job.id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <DeleteIcon />
                </button>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-600 mb-1">
                    {job.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-1">
                    Location: {job.location || "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm mb-1">
                    Deadline:{" "}
                    {formatApplicationDeadline(job.applicationDeadline)}
                  </p>
                  <p
                    className={`text-gray-500 text-sm font-semibold ${
                      job.totalApplication > 10
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    Applicants: {job.totalApplication || 0}
                  </p>
                </div>
                <div className="ml-2 flex-shrink-0 text-center">
                  <p
                    className={`mt-2 mb-2 px-2 py-1 text-xs font-semibold rounded-md ${bgColor} ${textColor}`}
                  >
                    {label}
                  </p>
                  <button
                    onClick={() => viewJobDetails(job.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition"
                  >
                    View More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {loading && <div className="text-center">Loading more jobs...</div>}
    </div>
  );
};

export default ViewCompanyWisePost;
