import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* PAGE TITLE */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-1">
          Welcome to StyleHub Admin Panel
        </p>
      </div>

      {/* VIDEO SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

        {/* WOMEN */}
        <div className="bg-[#181b24] border border-[#272b36] rounded-xl shadow-lg overflow-hidden">
          <div className="h-56 bg-[#222631] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 text-pink-500">▶</div>

              <p className="font-semibold text-gray-200">
                WOMEN SAREE VIDEO
              </p>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-lg text-white">
              Women Saree Collection
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Latest saree collection
            </p>
          </div>
        </div>

        {/* MEN */}
        <div className="bg-[#181b24] border border-[#272b36] rounded-xl shadow-lg overflow-hidden">
          <div className="h-56 bg-[#222631] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 text-pink-500">▶</div>

              <p className="font-semibold text-gray-200">
                MEN JEANS VIDEO
              </p>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-lg text-white">
              Men Jeans Collection
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Latest jeans collection
            </p>
          </div>
        </div>

        {/* KIDS */}
        <div className="bg-[#181b24] border border-[#272b36] rounded-xl shadow-lg overflow-hidden">
          <div className="h-56 bg-[#222631] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 text-pink-500">▶</div>

              <p className="font-semibold text-gray-200">
                KIDS VIDEO
              </p>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-lg text-white">
              Kids Collection
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Latest kids products
            </p>
          </div>
        </div>

        {/* MIX */}
        <div className="bg-[#181b24] border border-[#272b36] rounded-xl shadow-lg overflow-hidden">
          <div className="h-56 bg-[#222631] flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl mb-2 text-pink-500">▶</div>

              <p className="font-semibold text-gray-200">
                3 MIX PRODUCTS
              </p>
            </div>
          </div>

          <div className="p-4">
            <h2 className="font-semibold text-lg text-white">
              Featured Products
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Men, Women & Kids
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;