import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../services/interceptor";
import pdf from "../../assest/Aswin_Abraham_SEPT.pdf"; // Path to the PDF file
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/build/pdf";

// Set the workerSrc to the PDF.js worker file
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js`;

const EmployeeDetailView = () => {
  const { id } = useParams(); // get the user ID from the route
  const [userDetails, setUserDetails] = useState(null); // state to hold user data
  const [loading, setLoading] = useState(true); // state to handle loading
  const [error, setError] = useState(null); // state to handle errors
  const navigate = useNavigate();
  const canvasRefs = useRef([]); // Array of refs for the canvases
  const [pageNumber, setPageNumber] = useState(1); // State for current page number
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [pdfDocument, setPdfDocument] = useState(null); // State to hold the PDF document
  const [isRendering, setIsRendering] = useState(false); // Flag to track if rendering is ongoing

  useEffect(() => {
    // Fetch user details from the API when component mounts
    axiosInstance
      .post(`/user/userDetail/${id}`)
      .then((response) => {
        setUserDetails(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load user details");
        setLoading(false);
      });

    // Load the PDF
    const loadingTask = getDocument(pdf);
    loadingTask.promise.then((pdf) => {
      setPdfDocument(pdf); // Save PDF document to state
      setTotalPages(pdf.numPages); // Set total pages
      renderPage(pageNumber, pdf); // Render the first page
    });
  }, [id]); // Remove pageNumber from dependency array for initial loading

  // Render a specific page
  const renderPage = async (num, pdf) => {
    if (isRendering) return; // Exit if a render operation is ongoing
    setIsRendering(true); // Set rendering flag

    // Ensure the canvas for the page exists
    const canvas = canvasRefs.current[num - 1]; // Use the canvas for the current page
    if (!canvas) {
      setIsRendering(false); // Reset flag if canvas doesn't exist
      return;
    }

    const page = await pdf.getPage(num); // Fetch the specific page
    const viewport = page.getViewport({ scale: 1 });
    const context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };

    try {
      // Wait for the page to render
      await page.render(renderContext).promise; // Wait for render to finish
    } catch (error) {
      console.error("Error rendering page:", error);
    } finally {
      setIsRendering(false); // Reset rendering flag
    }
  };

  useEffect(() => {
    if (pdfDocument) {
      renderPage(pageNumber, pdfDocument); // Render the page when pageNumber changes
    }
  }, [pageNumber, pdfDocument]); // Re-render when pageNumber or pdfDocument changes

  // If data is still loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  // If there is an error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  // If user details are successfully loaded
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-4">Jobseeker Details</h1>
      <div className="grid grid-cols-2 gap-6">
        {/* Left Column: User Details */}
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Name:</p>
              <p>{userDetails?.name}</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p>{userDetails?.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p>{userDetails?.phone}</p>
            </div>
            <div>
              <p className="font-semibold">Created Date:</p>
              <p>{new Date(userDetails?.createdDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Updated Date:</p>
              <p>{new Date(userDetails?.updatedDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>

        {/* Right Column: PDF Display */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Resume</h2>
          <div className="relative border border-gray-300 rounded-lg shadow-md overflow-hidden group h-[30%] w-[100%]">
            {/* PDF Viewer */}
            {/* Create canvases dynamically based on total pages */}
            {[...Array(totalPages)].map((_, index) => (
              <canvas
                key={index}
                ref={(el) => (canvasRefs.current[index] = el)} // Set ref for each canvas
                className="rounded-lg mb-4 "
              />
            ))}

            {/* Download Button */}
            <a
              href={pdf}
              download="Resume.pdf"
              className="absolute top-[10%] right-[5%] bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Download PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailView;
