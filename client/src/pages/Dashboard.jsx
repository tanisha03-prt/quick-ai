import React, { useContext, useEffect, useState } from "react";
import {
  Sparkles,
  Gem,
  CreditCard,
  ArrowUpRight,
  Clock3,
} from "lucide-react";
import { Protect } from "@clerk/clerk-react";

import { dummyCreationData } from "../assets/assets";
import CreationItem from "../components/CreationItem";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const { userData } = useContext(AppContext);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-4">

      {/* ================= WELCOME ================= */}

      <div className="mb-4">

        <div className="flex items-center gap-1.5">

          <h1 className="text-xl font-bold text-slate-800">
            Welcome, {userData?.name || "User"}
          </h1>

          <span className="text-base">
            👋
          </span>

        </div>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {userData?.email}
        </p>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2.5">

        {/* Total Creations */}

        <div className="
          group
          flex
          items-center
          justify-between
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3
          py-2.5
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-violet-200
          hover:shadow-sm
        ">

          <div>

            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <Clock3 size={11} />
              Total Creations
            </div>

            <h2 className="mt-0.5 text-lg font-bold text-slate-800">
              {creations.length}
            </h2>

          </div>

          <div className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            bg-gradient-to-br
            from-violet-500
            to-indigo-500
            text-white
          ">
            <Sparkles size={15} />
          </div>

        </div>

        {/* Available Credits */}

        <div className="
          group
          flex
          items-center
          justify-between
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3
          py-2.5
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-cyan-200
          hover:shadow-sm
        ">

          <div>

            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <CreditCard size={11} />
              Available Credits
            </div>

            <h2 className="mt-0.5 text-lg font-bold text-slate-800">
              {userData?.credits ?? 0}
            </h2>

          </div>

          <div className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            bg-gradient-to-br
            from-cyan-500
            to-blue-500
            text-white
          ">
            <CreditCard size={15} />
          </div>

        </div>

        {/* Active Plan */}

        <div className="
          group
          flex
          items-center
          justify-between
          rounded-lg
          border
          border-slate-200
          bg-white
          px-3
          py-2.5
          transition-all
          duration-200
          hover:-translate-y-0.5
          hover:border-pink-200
          hover:shadow-sm
        ">

          <div>

            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <Gem size={11} />
              Active Plan
            </div>

            <h2 className="mt-0.5 text-lg font-bold text-slate-800">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>

          </div>

          <div className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-md
            bg-gradient-to-br
            from-pink-500
            to-violet-500
            text-white
          ">
            <Gem size={15} />
          </div>

        </div>

      </div>

      {/* ================= RECENT CREATIONS ================= */}

      <div className="mt-6">

        {/* Section Header */}

        <div className="mb-2.5 flex items-center justify-between">

          <div>

            <div className="flex items-center gap-1.5">

              <div className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-md
                bg-violet-100
                text-violet-600
              ">
                <Sparkles size={12} />
              </div>

              <h2 className="text-sm font-bold text-slate-800">
                Recent Creations
              </h2>

            </div>

            <p className="mt-0.5 ml-7.5 text-[9px] text-slate-400">
              Your latest AI-generated content
            </p>

          </div>

          {creations.length > 0 && (
            <button
              type="button"
              className="
                flex
                items-center
                gap-0.5
                rounded-md
                px-1.5
                py-1
                text-[10px]
                font-medium
                text-violet-600
                transition
                hover:bg-violet-50
              "
            >
              View All
              <ArrowUpRight size={11} />
            </button>
          )}

        </div>

        {/* Creation List */}

        <div className="space-y-1.5">

          {creations.length > 0 ? (

            creations.map((item) => (
              <CreationItem
                key={item.id}
                item={item}
              />
            ))

          ) : (

            <div className="
              rounded-lg
              border
              border-dashed
              border-slate-300
              bg-white
              p-6
              text-center
            ">

              <Sparkles
                size={26}
                className="mx-auto text-slate-300"
              />

              <p className="mt-2 text-xs font-medium text-slate-600">
                No creations yet
              </p>

              <p className="mt-0.5 text-[10px] text-slate-400">
                Start creating something with AI.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;