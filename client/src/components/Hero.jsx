import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[url('/gradientBackground.png')] bg-cover bg-no-repeat min-h-screen">

      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-[1.2]">
          Create amazing content <br />
          with <span className="text-primary">AI tools</span>
        </h1>

        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-sm sm:text-base text-gray-600">
          Transform your content creation with our suite of premium AI tools.
          Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-105 transition cursor-pointer"
        >
          Start creating now
        </button>

        <button
          className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-105 transition cursor-pointer"
        >
          Watch demo
        </button>
      </div>

      {/* Users */}
      <div className="flex items-center justify-center gap-4 mt-8 text-gray-600">
        <img
          src={assets.user_group}
          alt="Users"
          className="h-8"
        />
        <p>Trusted by 10k+ people</p>
      </div>

    </div>
  );
};

export default Hero;