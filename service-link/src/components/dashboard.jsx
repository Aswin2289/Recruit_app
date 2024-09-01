import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";
import servicePic1 from "../assest/service_image.jpg";
import servicePic2 from "../assest/service_image1.jpg";
import image1 from "../assest/image1.jpg";
import categoryPic1 from "../assest/cat1.jpg";
import categoryPic2 from "../assest/cat2.jpg";
import productPic1 from "../assest/product1.jpg";
import productPic2 from "../assest/product2.jpg";
import productPic3 from "../assest/product3.jpg";

function Dashboard() {
  const services = [
    {
      title: "AC Mechanic Services",
      description: "Expert AC repair and maintenance.",
    },
    {
      title: "Hospitality Services",
      description: "Top-notch hospitality for your events.",
    },
    {
      title: "Plumbing Services",
      description: "Professional plumbing solutions.",
    },
    {
      title: "Electrical Services",
      description: "Safe and reliable electrical services.",
    },
    {
      title: "Cleaning Services",
      description: "Comprehensive cleaning for home and office.",
    },
    {
      title: "View More",
      description: "", // No description needed for the button
      isButton: true, // Flag to indicate it's a button
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image: categoryPic1,
    },
    {
      name: "Fashion",
      image: categoryPic2,
    },
    {
      name: "Camera",
      image: categoryPic1,
    },
    // Add more categories as needed
  ];

  const featuredProducts = [
    {
      name: "Product 1",
      image: productPic1,
      price: "$99.99",
    },
    {
      name: "Product 2",
      image: productPic2,
      price: "$149.99",
    },
    {
      name: "Product 3",
      image: productPic3,
      price: "$199.99",
    },
    // Add more products as needed
  ];

  const testimonials = [
    {
      name: "John Doe",
      feedback: "Amazing service! Highly recommend.",
    },
    {
      name: "Jane Smith",
      feedback: "Fantastic quality and customer service.",
    },
    {
      name: "Alice Johnson",
      feedback: "A wonderful experience from start to finish.",
    },
    // Add more testimonials as needed
  ];

  const videos = [
    {
      title: "Product Demo 1",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual video URL
    },
    {
      title: "Product Demo 2",
      url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", // Replace with actual video URL
    },
    {
      title: "Product Demo 3",
      url: "https://www.youtube.com/embed/OtAOWyYooqQ", // Replace with actual video URL
    },
    {
      title: "Product Demo 4",
      url: "https://www.youtube.com/embed/HUSAOKKFnEg", // Replace with actual video URL
    },
    // Add more videos as needed
  ];

  return (
    <div className="container mx-auto p-4">
      {/* Hero Banner */}
      <div className="relative w-full h-64 mb-8">
        <img
          src={servicePic1} // Hero image
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store!</h1>
          <p className="text-lg mb-6">
            Discover the best deals and latest products
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
      </div>

      {/* Category Links */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={`/category/${category.name.toLowerCase()}`}
              className="relative block bg-gray-200 rounded-lg overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-lg font-bold">{product.price}</p>
              <button className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Image Carousel */}
      <div
        className="flex justify-center items-center mb-8 mt-9"
        style={{ minHeight: "50vh" }}
      >
        <div className="relative w-full max-w-4xl">
          <Carousel
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
            showArrows={true}
            className="h-full"
            showStatus={false}
            centerMode={true}
            centerSlidePercentage={80}
          >
            <div className="flex justify-center items-center h-full">
              <img
                src={servicePic1}
                alt="Service 1"
                className="h-full w-auto object-cover"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src={servicePic2}
                alt="Service 2"
                className="h-full w-auto object-cover"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src={image1}
                alt="Service 3"
                className="h-full w-auto object-cover"
              />
            </div>
            <div className="flex justify-center items-center h-full">
              <img
                src={servicePic1}
                alt="Service 4"
                className="h-full w-auto object-cover"
              />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
        <div className="flex flex-wrap gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-lg w-full md:w-1/3"
            >
              <p className="text-lg mb-4">"{testimonial.feedback}"</p>
              <p className="font-semibold">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product Videos */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="relative bg-gray-200 rounded-lg overflow-hidden"
            >
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-64 object-cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
