import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  PenLine,
  Hash,
  Image as ImageIcon,
  History,
  Eraser,
  Crown,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

const Layout = () => {
  const { user } = useUser();

  const navItems = [
    {
      name: "Dashboard",
      path: "/ai",
      icon: LayoutDashboard,
    },
    {
      name: "Write Article",
      path: "/ai/write-article",
      icon: PenLine,
    },
    {
      name: "Blog Titles",
      path: "/ai/blog-titles",
      icon: Hash,
    },
    {
      name: "Generate Images",
      path: "/ai/generate-images",
      icon: ImageIcon,
    },
    {
      name: "Remove Background",
      path: "/ai/remove-background",
      icon: Eraser,
    },
    {
      name: "History",
      path: "/ai/community",
      icon: History,
    },
  ];

  const userName = user?.fullName || "Tanisha Singh";
  const userInitial = user?.firstName?.[0] || "T";

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}
      <aside className="sidebar flex w-[180px] shrink-0 flex-col border-r border-slate-200 bg-white">

        {/* Profile */}
        <div className="px-3 pb-3 pt-4 text-center">

          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#65a82f] text-lg font-medium text-white">
            {userInitial}
          </div>

          <h2 className="mt-1.5 truncate text-[11px] font-bold uppercase tracking-wide text-slate-800">
            {userName}
          </h2>

          <p className="mt-0.5 text-[8px] text-slate-400">
            Free Plan
          </p>

        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2">

          <div className="space-y-0.5">

            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/ai"}
                  className={({ isActive }) =>
                    `
                    group flex min-h-[34px] items-center gap-2
                    rounded-md px-2.5 py-1.5
                    text-[10px] font-semibold
                    transition-all duration-150
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                    `
                  }
                >
                  <Icon
                    size={16}
                    strokeWidth={2}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    {item.name}
                  </span>
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* Upgrade */}
        <div className="px-2 pb-2">

          <div className="rounded-lg border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-2">

            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-100 text-violet-600">
              <Crown size={12} />
            </div>

            <h3 className="mt-1.5 text-[9px] font-bold text-slate-800">
              Upgrade to Pro
            </h3>

            <p className="mt-0.5 text-[7px] leading-[1.3] text-slate-400">
              Get unlimited generations,
              advanced models and more.
            </p>

            <button
              type="button"
              className="mt-1.5 w-full rounded-md bg-gradient-to-r from-violet-600 to-purple-600 py-1 text-[8px] font-semibold text-white transition hover:shadow-md"
            >
              Upgrade Now
            </button>

          </div>

        </div>

        {/* Bottom User */}
        <div className="border-t border-slate-200 px-2.5 py-2">

          <div className="flex items-center gap-1.5">

            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#65a82f] text-[11px] text-white">
              {userInitial}
            </div>

            <div className="min-w-0 flex-1">

              <p className="truncate text-[8px] font-bold text-slate-700">
                {userName}
              </p>

              <p className="text-[7px] text-slate-400">
                Free Plan
              </p>

            </div>

            <LogOut
              size={14}
              className="shrink-0 text-slate-400"
            />

          </div>

        </div>

      </aside>


      {/* =====================================================
          MAIN AREA
      ===================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        {/* Navbar */}
        <header className="navbar flex h-[48px] min-h-[48px] shrink-0 items-center justify-between bg-[#0b1120] px-4">

          {/* Logo */}
          <div className="text-[17px] font-bold tracking-tight text-violet-500">
            Quick.ai
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Search */}
            <div className="hidden h-7 w-52 items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-2.5 text-[9px] text-slate-500 md:flex">
              <Search size={12} />
              <span>Search your content...</span>
            </div>

            {/* Notification */}
            <button
              type="button"
              className="hidden text-slate-300 transition hover:text-white sm:block"
            >
              <Bell size={15} />
            </button>

            {/* Avatar */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#65a82f] text-[10px] font-medium text-white">
              {userInitial}
            </div>

          </div>

        </header>


        {/* Page Content */}
        <main className="min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Layout;