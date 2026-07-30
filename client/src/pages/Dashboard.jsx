import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    // Backend connect hone ke baad yahan API call karenge
    setCreations([]);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard
      </h1>

      <div className="flex flex-wrap gap-4">
        {/* Total Creations Card */}
        <div className="w-72 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Creations
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-800">
            {creations.length}
          </h2>
        </div>

        {/* Active Plan Card */}
        <div className="w-72 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Current Plan
          </p>

          <h2 className="mt-2 text-2xl font-bold text-indigo-600">
            Free
          </h2>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Recent Creations
        </h2>

        {creations.length === 0 ? (
          <p className="text-gray-500">
            No creations yet.
          </p>
        ) : (
          <div>
            {/* Backend connect hone ke baad creations yahan render karenge */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;