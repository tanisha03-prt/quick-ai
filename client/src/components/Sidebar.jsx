import React from "react";
import { NavLink } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";

import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    icon: House,
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
    icon: Eraser,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    icon: Scissors,
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

const Sidebar = ({ setSidebar }) => {
  const { isLoaded, user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!isLoaded) {
    return (
      <div className="w-60 min-w-60 bg-white border-r border-gray-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-60 min-w-60 h-full bg-white border-r border-gray-200 flex flex-col">

      {/* Top Section */}

      <div className="flex-1 overflow-y-auto p-6">

        <img
          src={user?.imageUrl}
          alt="Profile"
          className="w-16 h-16 rounded-full mx-auto object-cover"
        />

        <h2 className="mt-3 text-center text-xl font-bold text-gray-800">
          {user?.fullName}
        </h2>

        <div className="mt-8 flex flex-col gap-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/ai"}
                onClick={() => setSidebar?.(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white shadow"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}

        </div>

      </div>

      {/* Bottom Section */}

      <div className="border-t border-gray-200 p-4 shrink-0">

        <div
          onClick={openUserProfile}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={user?.imageUrl}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />

          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {user?.fullName}
            </p>

            <p className="text-sm text-gray-500">
              Free Plan
            </p>
          </div>

          <LogOut
            size={18}
            className="cursor-pointer text-gray-500 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              signOut();
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default Sidebar;