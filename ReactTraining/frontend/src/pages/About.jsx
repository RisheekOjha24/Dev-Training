import React from "react";
import Navbar from "../components/Navbar";
import manImg from "../assets/man.png";

const About = () => {
  return (
    <div className="flex h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-gray-100 h-full rounded-lg p-8 list-container-box ">
          {/* Header Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-extrabold text-blue-600">About Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Learn more about our mission, team, and values.
            </p>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">
              Our Mission
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our mission is to create high-quality, user-friendly products that
              solve real-world problems and empower our customers. We believe in
              innovation, collaboration, and the power of technology to change
              the world.
            </p>
          </section>

          {/* Team Section */}
          <section className="bg-white py-12 mb-16 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Meet Our Team
            </h2>
            <p className="mt-4 text-lg text-center text-gray-600 max-w-2xl mx-auto">
              Our team is a diverse group of passionate individuals working
              together to build solutions that make an impact. With expertise in
              various fields, we bring innovation and creativity to everything
              we do.
            </p>

            {/* Team Members Grid */}
            <div className="flex justify-center p-4">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img
                  src={manImg}  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                    Risheek Ojha
                </h3>
                <p className="mt-2 text-gray-600">Software Developer</p>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 text-center">Our Vision</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our vision is to empower individuals and businesses with tools
              that simplify processes, enhance productivity, and create lasting
              impact. We aim to make the world a better place through our
              innovative solutions.
            </p>
          </section>

          {/* Contact Section */}
          <section className="text-center py-12 bg-blue-600 text-white rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold">Get in Touch</h2>
            <p className="mt-4 text-lg">
              Have questions or want to collaborate? We're here to help! Reach
              out to us anytime.
            </p>
            <a
              href="mailto:contact@example.com"
              className="mt-8 inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-200 transition duration-300"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
