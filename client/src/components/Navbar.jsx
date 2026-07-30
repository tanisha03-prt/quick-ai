import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  useClerk,
  useUser,
  UserButton,
} from "@clerk/clerk-react";

import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed top-0 left-0 w-full z-10 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32">

      {/* Logo */}

      <img
        src={assets.logo}
        alt="Quick.ai"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Right Side */}

      {user ? (
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-11 h-11",
            },
          }}
        />
      ) : (
        <button
          onClick={() => openSignIn()}
          className="flex items-center gap-2 rounded-full bg-primary text-white px-7 sm:px-10 py-2.5 text-sm font-medium hover:scale-105 transition-all duration-300"
        >
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;