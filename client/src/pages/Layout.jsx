import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser, SignIn } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

import { assets } from "../assets/assets";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const navigate = useNavigate();

  const [sidebar, setSidebar] = useState(false);

  const { user } = useUser();

  return user ? (
    <div className="flex flex-col h-screen">
      {/* Navbar */}

      <nav className="w-full px-8 h-14 flex items-center justify-between border-b border-gray-200 bg-white">

        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden cursor-pointer"
          />
        )}
      </nav>

      {/* Body */}

      <div className="flex flex-1 overflow-hidden">

        <div className="w-60 bg-red-500 text-white">
        Sidebar Test
        </div>

        <main className="flex-1 bg-[#F4F7FB] overflow-y-auto p-6">
          <Outlet />
        </main>

      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default Layout;