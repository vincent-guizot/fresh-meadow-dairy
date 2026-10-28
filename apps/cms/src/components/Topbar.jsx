import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";
import {
  Menu,
  Bell,
  ChevronDown,
  LogOut,
  AlertTriangle,
  Clock,
  User,
  Settings,
  Check,
  X,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const { currentUser, logout, switchRole, setIsMobileSidebarOpen } = useApp();
  const navigate = useNavigate();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setIsNotificationsOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const demoRoles = [
    { name: "Admin", desc: "Full store access & staff management" },
    { name: "Product Manager", desc: "Manage catalog & categories" },
    { name: "Inventory Staff", desc: "Stock movements & cold storage" },
    { name: "Order Manager", desc: "Manage customer orders & fulfillment" },
    { name: "Content Staff", desc: "Product info & SEO" },
  ];

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    navigate("/login");
  };

  const handleOpenProfile = () => {
    setIsProfileOpen(false);
    setIsProfileModalOpen(true);
  };

  return (
    <>
      <header className="h-14 shrink-0 bg-[#FAF8F3]/80 backdrop-blur-md border-b border-[#EBE5D8] px-4 md:px-6 flex items-center justify-between sticky top-0 z-20">
        {/* Left: Mobile hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="hidden sm:inline-block text-xs font-medium text-slate-500">
            Fresh Meadow Dairy Portal
          </span>
        </div>

        {/* Right Utility Bar */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative p-1.5 rounded-xl bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-50 hover:text-slate-800 transition-colors shadow-2xs"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-1.5 w-80 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 z-40 animate-fadeIn text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-bold text-slate-800">
                    Alerts & Notifications
                  </span>
                  <span className="bg-red-50 text-red-600 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    3 New
                  </span>
                </div>
                <div className="mt-2 space-y-2.5">
                  <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100/70 flex items-start space-x-2.5">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-amber-900 block">
                        Expiry Watch
                      </span>
                      <span className="text-amber-800/90 text-[11px] block">
                        Fresh Milk 1L (FM-261028) expires in 3 days.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-red-50/70 border border-red-100/70 flex items-start space-x-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-red-900 block">
                        Restock Alert
                      </span>
                      <span className="text-red-800/90 text-[11px] block">
                        Cheddar Cheese Block 200g is completely out of stock.
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-100/70 flex items-start space-x-2.5">
                    <Bell className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-blue-900 block">
                        Order Processing
                      </span>
                      <span className="text-blue-800/90 text-[11px] block">
                        New order #FM-2048 placed by Amelia Putri.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account Login Dropdown (Profile & Logout) */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 pl-1.5 pr-2.5 py-1 bg-white border border-slate-200/90 rounded-full hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <img
                src={currentUser?.avatar || "/assets/admin-avatar.png"}
                alt={currentUser?.name || "User"}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
                onError={(e) => {
                  e.currentTarget.src = "/assets/user-vincent.png";
                }}
              />
              <span className="text-xs font-semibold text-slate-800 hidden md:inline-block">
                {currentUser?.name ? currentUser.name.split(" ")[0] : "Admin"}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                ({currentUser?.role || "Admin"})
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-1.5 w-60 bg-white border border-slate-100 rounded-2xl shadow-xl p-2.5 z-40 animate-fadeIn text-xs">
                {/* Account info header */}
                <div className="px-2.5 py-2 border-b border-slate-100 mb-1.5">
                  <span className="font-bold text-slate-800 block text-xs truncate">
                    {currentUser?.name || "Vincent Guizot"}
                  </span>
                  <span className="text-slate-400 text-[11px] block truncate">
                    {currentUser?.email || "vincent@freshmeadow.com"}
                  </span>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-blue-50 text-[#2563A6] font-semibold text-[10px]">
                    Role: {currentUser?.role || "Admin"}
                  </span>
                </div>

                {/* Dropdown Menu Actions */}
                <div className="space-y-0.5 py-1">
                  {/* Profile action */}
                  <button
                    onClick={handleOpenProfile}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#2563A6] flex items-center space-x-2.5 font-medium transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="block text-xs font-semibold">
                        Profile
                      </span>
                      <span className="block text-[10px] text-slate-400 font-normal">
                        Account & Personal details
                      </span>
                    </div>
                  </button>

                  {/* Settings action */}
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/settings");
                    }}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-[#2563A6] flex items-center space-x-2.5 font-medium transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <div>
                      <span className="block text-xs font-semibold">
                        Settings
                      </span>
                      <span className="block text-[10px] text-slate-400 font-normal">
                        Store preferences
                      </span>
                    </div>
                  </button>
                </div>

                {/* Collapsible/Compact Demo Switcher for convenience */}
                <div className="border-t border-slate-100 my-1 pt-1.5 px-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1.5 block mb-1">
                    Switch Demo Role
                  </span>
                  <div className="space-y-0.5 max-h-32 overflow-y-auto">
                    {demoRoles.map((r) => (
                      <button
                        key={r.name}
                        onClick={() => {
                          switchRole(r.name);
                          setIsProfileOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-lg flex items-center justify-between text-[11px] transition-colors ${
                          currentUser?.role === r.name
                            ? "bg-blue-50 font-bold text-[#2563A6]"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <span>{r.name}</span>
                        {currentUser?.role === r.name && (
                          <Check className="w-3 h-3 text-[#2563A6] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Logout action */}
                <div className="border-t border-slate-100 mt-1 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-2.5 py-2 rounded-xl text-red-600 hover:bg-red-50 flex items-center space-x-2.5 font-semibold transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Account Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FAF8F3] border-b border-[#EBE5D8] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#2563A6]" />
                <h3 className="text-sm font-bold text-[#17324D]">
                  Staff Profile
                </h3>
              </div>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center space-x-4">
                <img
                  src={currentUser?.avatar || "/assets/admin-avatar.png"}
                  alt={currentUser?.name || "User"}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/assets/user-vincent.png";
                  }}
                />
                <div>
                  <h4 className="text-base font-extrabold text-[#17324D]">
                    {currentUser?.name || "Vincent Guizot"}
                  </h4>
                  <div className="flex items-center space-x-1.5 text-slate-500 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>
                      {currentUser?.email || "vincent@freshmeadow.com"}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EBF2FB] text-[#2563A6]">
                      {currentUser?.role || "Administrator"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Department</span>
                  <span className="font-semibold text-slate-800">
                    Fresh Meadow Dairy Headquarters
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Account Type</span>
                  <span className="font-semibold text-slate-800">
                    Internal Staff / CMS
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-400">Access Status</span>
                  <span className="inline-flex items-center text-emerald-600 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                    Active & Authenticated
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Permissions</span>
                  <span className="font-semibold text-slate-800">
                    Full System Administration
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                onClick={() => {
                  setIsProfileModalOpen(false);
                  navigate("/settings");
                }}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Open Settings
              </button>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 bg-[#2563A6] text-white rounded-xl text-xs font-semibold hover:bg-[#1C4E86] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
