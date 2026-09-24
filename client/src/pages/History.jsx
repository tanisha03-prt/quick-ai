import React, { useContext, useMemo, useState } from "react";
import {
  History as HistoryIcon,
  Search,
  FileText,
  Image as ImageIcon,
  Hash,
  Sparkles,
  CalendarDays,
  Eye,
  Copy,
  Check,
} from "lucide-react";

import { AppContext } from "../context/AppContext";

const History = () => {
  const { userData } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(null);

  const creations = userData?.creations || [];

  const filteredCreations = useMemo(() => {
    return creations.filter((item) => {
      const type = item.type?.toLowerCase() || "";

      const matchesFilter =
        filter === "All" ||
        (filter === "Articles" && type === "article") ||
        (filter === "Titles" && type.includes("title")) ||
        (filter === "Images" && type === "image");

      const matchesSearch =
        !search.trim() ||
        item.prompt?.toLowerCase().includes(search.toLowerCase()) ||
        item.content?.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [creations, filter, search]);

  const getIcon = (type) => {
    const value = type?.toLowerCase();

    if (value === "image") return ImageIcon;
    if (value === "article") return FileText;

    return Hash;
  };

  const getLabel = (type) => {
    const value = type?.toLowerCase();

    if (value === "image") return "IMAGE";
    if (value === "article") return "ARTICLE";

    return "BLOG TITLE";
  };

  const copyContent = async (content, index) => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);

      setCopied(index);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="history-page h-full overflow-hidden bg-[#f8fafc] p-2.5">

      {/* ================= HEADER ================= */}

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
            <HistoryIcon size={17} />
          </div>

          <div>
            <h1 className="text-[14px] font-bold leading-5 text-slate-800">
              History
            </h1>

            <p className="text-[8px] text-slate-400">
              View and manage your AI creations
            </p>
          </div>

        </div>

        <div className="flex items-center gap-1.5 rounded-full border border-violet-100 bg-white px-2.5 py-1 text-[8px] font-semibold text-violet-600">
          <Sparkles size={10} />
          {creations.length} Creations
        </div>

      </div>


      {/* ================= TOOLBAR ================= */}

      <div className="mb-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2">

        {/* Search */}

        <div className="relative min-w-0 flex-1">

          <Search
            size={12}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your creations..."
            className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-[8px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-2 focus:ring-violet-100"
          />

        </div>


        {/* Filters */}

        <div className="flex shrink-0 items-center gap-1">

          {["All", "Articles", "Titles", "Images"].map((item) => (

            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`
                rounded-md px-2.5 py-1.5 text-[7px] font-semibold
                transition
                ${
                  filter === item
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-slate-50 text-slate-500 hover:bg-violet-50 hover:text-violet-600"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div>


      {/* ================= CONTENT ================= */}

      <div className="history-content">


        {/* EMPTY */}

        {filteredCreations.length === 0 && (

          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-slate-200 bg-white">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-50 to-blue-50 text-violet-600">
              <HistoryIcon size={25} />
            </div>

            <h3 className="mt-3 text-[11px] font-bold text-slate-700">
              No creations found
            </h3>

            <p className="mt-1 max-w-xs text-center text-[8px] leading-4 text-slate-400">
              Your generated articles, titles and images
              will appear here.
            </p>

          </div>

        )}


        {/* CREATIONS */}

        {filteredCreations.length > 0 && (

          <div className="grid grid-cols-1 gap-1.5 overflow-y-auto pr-1">

            {filteredCreations.map((item, index) => {

              const Icon = getIcon(item.type);

              const isImage =
                item.type?.toLowerCase() === "image";

              const label = getLabel(item.type);

              return (

                <div
                  key={item._id || item.id || index}
                  className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-2 transition-all duration-150 hover:-translate-y-[1px] hover:border-violet-200 hover:shadow-sm"
                >

                  {/* ICON */}

                  <div
                    className={`
                      flex h-8 w-8 shrink-0 items-center
                      justify-center rounded-md
                      ${
                        isImage
                          ? "bg-emerald-50 text-emerald-600"
                          : item.type?.toLowerCase() === "article"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-violet-50 text-violet-600"
                      }
                    `}
                  >
                    <Icon size={14} />
                  </div>


                  {/* CONTENT */}

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-1.5">

                      <span className="text-[7px] font-bold tracking-wide text-violet-600">
                        {label}
                      </span>

                      <span className="flex items-center gap-1 rounded-full bg-slate-100 px-1.5 py-0.5 text-[6px] font-medium text-slate-400">
                        <Sparkles size={7} />
                        AI
                      </span>

                    </div>

                    <p className="mt-0.5 truncate text-[9px] font-semibold text-slate-700">
                      {item.prompt || "Untitled creation"}
                    </p>

                    <div className="mt-0.5 flex items-center gap-2 text-[6px] text-slate-400">

                      <span className="flex items-center gap-1">
                        <CalendarDays size={8} />
                        {formatDate(
                          item.createdAt || item.created_at
                        )}
                      </span>

                      <span>•</span>

                      <span>
                        {item.type || "Creation"}
                      </span>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex shrink-0 items-center gap-1">

                    {isImage && item.content && (

                      <img
                        src={item.content}
                        alt="Creation"
                        className="h-9 w-9 rounded-md border border-slate-200 object-cover"
                      />

                    )}

                    {!isImage && item.content && (

                      <button
                        type="button"
                        onClick={() =>
                          copyContent(item.content, index)
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                        title="Copy"
                      >
                        {copied === index ? (
                          <Check size={10} />
                        ) : (
                          <Copy size={10} />
                        )}
                      </button>

                    )}

                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 text-slate-400 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                      title="View"
                    >
                      <Eye size={11} />
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default History;