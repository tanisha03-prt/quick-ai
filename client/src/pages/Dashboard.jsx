import React, { useContext, useEffect, useMemo, useState } from "react";
import { Protect } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Hash,
  Image as ImageIcon,
  History,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Sparkles,
  Crown,
  PenLine,
  Zap,
  Lightbulb,
} from "lucide-react";

import { dummyCreationData } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);

  const [creations, setCreations] = useState([]);

  useEffect(() => {
    setCreations(dummyCreationData || []);
  }, []);

  const totalCreations = creations.length;

  const recentCreations = useMemo(() => {
    return creations.slice(0, 3);
  }, [creations]);

  const getIcon = (type) => {
    const value = type?.toLowerCase();

    if (value === "article") return FileText;
    if (value === "image") return ImageIcon;

    return Sparkles;
  };

  const getTypeColor = (type) => {
    const value = type?.toLowerCase();

    if (value === "article") {
      return {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
      };
    }

    if (value === "image") {
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-100",
      };
    }

    return {
      bg: "bg-violet-50",
      text: "text-violet-600",
      border: "border-violet-100",
    };
  };

  const formatDate = (date) => {
    if (!date) return "01 Jul 2025";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="dashboard-compact h-full overflow-y-auto bg-[#f8fafc] px-3 py-3">

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        {/* Write Article */}
        <button
          onClick={() => navigate("/ai/write-article")}
          className="group relative overflow-hidden rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-white p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/60"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 transition-transform duration-200 group-hover:scale-105">
              <FileText size={21} />
            </div>

            <ArrowRight
              size={19}
              className="mt-3 text-violet-500 transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-3 text-[15px] font-bold text-slate-800">
            Write Article
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Generate full articles
          </p>
        </button>

        {/* Blog Titles */}
        <button
          onClick={() => navigate("/ai/blog-titles")}
          className="group relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-white p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform duration-200 group-hover:scale-105">
              <Hash size={22} />
            </div>

            <ArrowRight
              size={19}
              className="mt-3 text-blue-500 transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-3 text-[15px] font-bold text-slate-800">
            Blog Titles
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Get catchy titles
          </p>
        </button>

        {/* Generate Images */}
        <button
          onClick={() => navigate("/ai/generate-images")}
          className="group relative overflow-hidden rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/60"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform duration-200 group-hover:scale-105">
              <ImageIcon size={21} />
            </div>

            <ArrowRight
              size={19}
              className="mt-3 text-emerald-500 transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-3 text-[15px] font-bold text-slate-800">
            Generate Images
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Create AI images
          </p>
        </button>

        {/* History */}
        <button
          onClick={() => navigate("/ai/community")}
          className="group relative overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-white p-4 text-left transition-all duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/60"
        >
          <div className="flex items-start justify-between">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform duration-200 group-hover:scale-105">
              <History size={21} />
            </div>

            <ArrowRight
              size={19}
              className="mt-3 text-orange-500 transition-transform duration-200 group-hover:translate-x-1"
            />
          </div>

          <h3 className="mt-3 text-[15px] font-bold text-slate-800">
            History
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            View your content
          </p>
        </button>
      </div>

      {/* ================= STATS ================= */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Generations */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <FileText size={19} />
          </div>

          <div>
            <p className="text-[10px] font-medium text-slate-500">
              Total Generations
            </p>

            <p className="mt-0.5 text-xl font-bold text-slate-800">
              {totalCreations}
            </p>
          </div>
        </div>

        {/* This Month */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays size={19} />
          </div>

          <div>
            <p className="text-[10px] font-medium text-slate-500">
              This Month
            </p>

            <p className="mt-0.5 text-xl font-bold text-slate-800">
              {totalCreations}
            </p>
          </div>
        </div>

        {/* Active Plan */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
            <Zap size={20} />
          </div>

          <div>
            <p className="text-[10px] font-medium text-slate-500">
              Active Plan
            </p>

            <p className="mt-0.5 text-xl font-bold text-slate-800">
              <Protect
                plan="premium"
                fallback="Free"
              >
                Premium
              </Protect>
            </p>
          </div>
        </div>

        {/* Usage */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              className="-rotate-90"
            >
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="4"
              />

              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="#10b981"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="113"
                strokeDashoffset="79"
              />
            </svg>

            <span className="absolute text-[10px] font-bold text-emerald-600">
              3/10
            </span>
          </div>

          <div>
            <p className="text-[10px] font-medium text-slate-500">
              Usage Limit
            </p>

            <p className="mt-0.5 text-sm font-bold text-slate-800">
              3 of 10 used
            </p>
          </div>
        </div>
      </div>

      {/* ================= RECENT CREATIONS ================= */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <Sparkles size={18} />
            </div>

            <div>
              <h2 className="text-[16px] font-bold text-slate-800">
                Recent Creations
              </h2>

              <p className="text-[10px] text-slate-400">
                Your latest AI-generated content
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/ai/community")}
            className="flex items-center gap-1 text-[11px] font-semibold text-violet-600 transition hover:text-violet-700"
          >
            View All
            <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Table Header */}
        <div className="hidden grid-cols-[70px_minmax(200px,1fr)_110px_120px_110px] items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-2.5 text-[9px] font-bold uppercase tracking-wide text-slate-400 md:grid">
          <span>Type</span>
          <span>Title</span>
          <span>Tag</span>
          <span>Date</span>
          <span className="text-right">Actions</span>
        </div>

        {/* Rows */}
        <div>
          {recentCreations.length > 0 ? (
            recentCreations.map((item, index) => {
              const Icon = getIcon(item.type);
              const colors = getTypeColor(item.type);

              return (
                <div
                  key={item.id || index}
                  className="group grid grid-cols-1 gap-2 border-b border-slate-100 px-4 py-3 transition-colors hover:bg-violet-50/30 md:grid-cols-[70px_minmax(200px,1fr)_110px_120px_110px] md:items-center md:gap-3"
                >
                  {/* Type */}
                  <div className="flex items-center gap-2 md:block">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${colors.bg} ${colors.text}`}
                    >
                      <Icon size={15} />
                    </div>

                    <span
                      className={`text-[9px] font-bold uppercase md:hidden ${colors.text}`}
                    >
                      {item.type || "AI"}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                      {item.prompt || "AI Generated Content"}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-[9px] text-slate-400 md:hidden">
                      <CalendarDays size={9} />
                      {formatDate(item.createdAt || item.created_at)}
                    </div>
                  </div>

                  {/* Tag */}
                  <div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-[9px] font-medium text-slate-500">
                      <Hash size={9} />
                      {item.type || "creation"}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="hidden items-center gap-1.5 text-[10px] text-slate-400 md:flex">
                    <CalendarDays size={12} />
                    {formatDate(item.createdAt || item.created_at)}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      type="button"
                      className="rounded-lg bg-violet-50 px-3 py-1.5 text-[10px] font-semibold text-violet-600 transition hover:bg-violet-100"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-violet-600"
                    >
                      <ArrowUpRight size={14} />
                    </button>

                    <button
                      type="button"
                      className="hidden h-7 w-7 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-100 hover:text-slate-600 sm:flex"
                    >
                      •••
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-5 py-12 text-center">
              <Sparkles
                size={30}
                className="mx-auto text-slate-300"
              />

              <p className="mt-2 text-sm font-semibold text-slate-600">
                No creations yet
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                Start creating something with AI.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2">
            <Lightbulb
              size={17}
              className="shrink-0 text-amber-500"
            />

            <p className="text-[10px] text-slate-500">
              <span className="font-semibold text-slate-700">
                Tip:
              </span>{" "}
              Use clear and specific prompts to get better results!
            </p>
          </div>

          <button
            onClick={() => navigate("/ai")}
            className="flex items-center gap-1 text-[10px] font-semibold text-violet-600 transition hover:text-violet-700"
          >
            Explore More Features
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* ================= PRO BANNER ================= */}
      <div className="mt-4 flex items-center justify-between rounded-xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-indigo-50 px-4 py-3">

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
            <Crown size={17} />
          </div>

          <div>
            <p className="text-[11px] font-bold text-slate-800">
              Unlock more with Quick.ai Pro
            </p>

            <p className="text-[9px] text-slate-500">
              Get unlimited generations and advanced AI tools.
            </p>
          </div>
        </div>

        <button className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-1.5 text-[9px] font-semibold text-white shadow-sm transition hover:shadow-md">
          Upgrade Now
        </button>
      </div>
    </div>
  );
};

export default Dashboard;