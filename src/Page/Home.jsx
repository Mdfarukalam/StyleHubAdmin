
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 768
  );

  return (
    <div className="min-h-screen bg-[#0f1117]">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          w-[240px] h-screen
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </aside>

      {/* Main Area */}
      <div
        className={`
          min-h-screen transition-all duration-300
          ${sidebarOpen ? "md:ml-[240px]" : "ml-0"}
        `}
      >

        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content */}
        <main className="pt-[80px] min-h-screen bg-[#0f1115]">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default Home;
