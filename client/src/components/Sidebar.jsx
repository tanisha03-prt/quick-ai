import React from "react";
import { NavLink } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

import {
  LayoutDashboard,
  Image,
  Scissors,
  Eraser,
  FileText,
  Users,
  SquarePen,
  Hash,
  LogOut,
  X,
} from "lucide-react";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    icon: SquarePen,
  },
  {
    to: "/ai/blog-titles",
    label: "Blog Titles",
    icon: Hash,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    icon: Image,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    icon: Scissors,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    icon: Eraser,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    icon: FileText,
  },
  {
    to: "/ai/community",
    label: "Community",
    icon: Users,
  },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <aside
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between transition-all duration-300

      max-sm:fixed
      max-sm:top-14
      max-sm:bottom-0
      max-sm:left-0
      max-sm:z-50

      ${
        sidebar
          ? "translate-x-0"
          : "max-sm:-translate-x-full"
      }`}
    >
      <div>
        {/* User */}

        <div className="py-7 border-b relative">

          <img
            src={user?.imageUrl}
            alt="avatar"
            onClick={openUserProfile}
            className="w-16 h-16 rounded-full mx-auto cursor-pointer object-cover"
          />

          <h2 className="text-center font-semibold mt-2">
            {user?.fullName}
          </h2>

          <X
            className="sm:hidden absolute right-4 top-4 cursor-pointer"
            onClick={() => setSidebar(false)}
          />
        </div>

        {/* Navigation */}

        <div className="px-2 py-4">

          {navItems.map(({ to, label, icon: Icon }) => (

            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition

                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{label}</span>

            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout */}

      <div className="p-4 border-t">

        <button
          onClick={() => signOut()}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white rounded-lg py-3"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;