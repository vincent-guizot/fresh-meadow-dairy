import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastContainer from "./common/Toast";

export default function Layout() {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-[#FAF7EF] text-[#17324D] font-sans">
      {/* Fixed Height Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area with Fixed Topbar and Scrollable Main */}
      <div className="flex-1 flex flex-col min-w-0 h-screen max-h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-4 py-3 md:px-3 md:py-3 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet />
        </main>
      </div>

      {/* Global Alert Toasts */}
      <ToastContainer />
    </div>
  );
}
