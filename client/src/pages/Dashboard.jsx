import React, { useContext, useEffect, useState } from "react";
import { Sparkles, Gem } from "lucide-react";
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
    <div className="h-full overflow-y-auto p-6">

      {/* Welcome */}

      <h1 className="text-3xl font-bold text-slate-800 mb-1">
        Welcome, {userData?.name || "User"} 👋
      </h1>

      <p className="text-slate-500 mb-6">
        {userData?.email}
      </p>

      {/* Cards */}

      <div className="flex justify-start gap-4 flex-wrap">

        {/* Total Creations */}

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">

          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>

            <h2 className="text-xl font-semibold">
              {creations.length}
            </h2>
          </div>

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center">
            <Sparkles className="w-5 h-5" />
          </div>

        </div>

        {/* Credits */}

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">

          <div className="text-slate-600">
            <p className="text-sm">Available Credits</p>

            <h2 className="text-xl font-semibold">
              {userData?.credits ?? 0}
            </h2>
          </div>

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex justify-center items-center">
            💰
          </div>

        </div>

        {/* Active Plan */}

        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">

          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>

            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>

          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center">
            <Gem className="w-5 h-5" />
          </div>

        </div>

      </div>

      {/* Recent Creations */}

      <div className="space-y-3">

        <p className="mt-8 mb-4 text-lg font-medium text-slate-800">
          Recent Creations
        </p>

        {creations.map((item) => (
          <CreationItem
            key={item.id}
            item={item}
          />
        ))}

      </div>

    </div>
  );
};

export default Dashboard;