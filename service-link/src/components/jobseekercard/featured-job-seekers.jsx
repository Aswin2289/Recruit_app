import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; // Icons for LinkedIn, GitHub, and Gmail

const featuredJobSeekers = [
  {
    id: 1,
    name: "John Doe",
    title: "Software Engineer",
    experience: "3 years",
    description: "Specializes in building scalable backend systems.",
    education: "B.Sc. in Computer Science",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    social: {
      linkedin: "#",
      github: "#",
      gmail: "mailto:john.doe@example.com",
    },
    profileLink: "#", // Add actual profile link
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "UI/UX Designer",
    experience: "4 years",
    description: "Expert in creating user-friendly interfaces.",
    education: "M.A. in Graphic Design",
    image: "https://via.placeholder.com/150",
    social: {
      linkedin: "#",
      github: "#",
      gmail: "mailto:jane.smith@example.com",
    },
    profileLink: "#", // Add actual profile link
  },
  {
    id: 3,
    name: "David Wilson",
    title: "Product Manager",
    experience: "7 years",
    description: "Experienced in leading product development teams.",
    education: "MBA from Harvard",
    image: "https://via.placeholder.com/150",
    social: {
      linkedin: "#",
      github: "#",
      gmail: "mailto:david.wilson@example.com",
    },
    profileLink: "#", // Add actual profile link
  },
  {
    id: 4,
    name: "Smith Wilson",
    title: "Product Manager",
    experience: "7 years",
    description: "Experienced in leading product development teams.",
    education: "MBA from Harvard",
    image: "https://via.placeholder.com/150",
    social: {
      linkedin: "#",
      github: "#",
      gmail: "mailto:smith.wilson@example.com",
    },
    profileLink: "#", // Add actual profile link
  },
  // Add more featured job seekers as needed
];

function FeaturedJobSeekers() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">
          Featured Job Seekers
        </h2>
        <a
          href="#find-other-jobseekers" // Replace with the actual link to the job seekers page
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          <span className="hover:underline">Find Other Job Seekers</span>
          <span className="ml-1 text-2xl">&#8594;</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredJobSeekers.map((seeker) => (
          <div
            key={seeker.id}
            className="bg-white p-4 rounded-lg shadow-xl flex flex-col items-center"
          >
            <img
              src={seeker.image}
              alt={seeker.name}
              className="w-24 h-24 rounded-full mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold text-gray-900">
              {seeker.name}
            </h3>
            <p className="text-gray-600 mb-1">{seeker.title}</p>
            <p className="text-gray-500 text-center mb-2">
              Experience: {seeker.experience}
            </p>
            <p className="text-gray-500 text-center mb-4 text-sm">
              {seeker.description}
            </p>
            <p className="text-gray-500 text-center mb-4 text-sm">
              {seeker.education}
            </p>
            <div className="flex space-x-3 gap-3">
              <a
                href={seeker.social.linkedin}
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={seeker.social.github}
                className="text-gray-700 hover:text-gray-900"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={seeker.social.gmail}
                className="text-red-600 hover:text-red-800"
              >
                <FaEnvelope size={20} />
              </a>
            </div>
            <a
              href={seeker.profileLink}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm"
            >
              View More
            </a>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href="#find-other-jobseekers" // Replace with the actual link to the job seekers page
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Find Other Job Seekers
        </a>
      </div>
    </div>
  );
}

export default FeaturedJobSeekers;
