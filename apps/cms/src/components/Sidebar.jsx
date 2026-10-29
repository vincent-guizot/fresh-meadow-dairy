import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Home,
  Package,
  LayoutGrid,
  Archive,
  ShoppingCart,
  ArrowLeftRight,
  CreditCard,
  Users,
  UserCheck,
  Settings,
  X,
} from "lucide-react";

export default function Sidebar() {
  const { isMobileSidebarOpen, setIsMobileSidebarOpen } = useApp();
  const location = useLocation();

  const navItems = [
    {
      to: "/overview",
      label: "Overview",
      icon: Home,
      matchPrefix: "/overview",
    },
    {
      to: "/products",
      label: "Products",
      icon: Package,
      matchPrefix: "/products",
    },
    {
      to: "/categories",
      label: "Categories",
      icon: LayoutGrid,
      matchPrefix: "/categories",
    },
    {
      to: "/inventory",
      label: "Inventory",
      icon: Archive,
      matchPrefix: "/inventory",
    },
    {
      to: "/orders",
      label: "Orders",
      icon: ShoppingCart,
      matchPrefix: "/orders",
    },
    {
      to: "/transactions",
      label: "Transactions",
      icon: ArrowLeftRight,
      matchPrefix: "/transactions",
    },
    {
      to: "/payments",
      label: "Payments",
      icon: CreditCard,
      matchPrefix: "/payments",
    },
    {
      to: "/customers",
      label: "Customers",
      icon: Users,
      matchPrefix: "/customers",
    },
    { to: "/staff", label: "Staff", icon: UserCheck, matchPrefix: "/staff" },
    {
      to: "/settings",
      label: "Settings",
      icon: Settings,
      matchPrefix: "/settings",
    },
  ];

  const handleLinkClick = () => {
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full max-h-screen bg-[#FAF8F3] border-r border-[#EBE5D8] w-56 md:w-60 select-none relative overflow-hidden">
      {/* Brand Header with Centered Logo */}
      <div className="shrink-0 pt-4 pb-3 px-3 flex items-center justify-center relative">
        <NavLink
          to="/overview"
          onClick={handleLinkClick}
          className="flex items-center justify-center w-full"
        >
          <img
            src="/assets/logo.png"
            alt="Fresh Meadow Dairy"
            className="h-16 w-auto object-contain mx-auto mb-2"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </NavLink>

        {/* Mobile close button */}
        <button
          onClick={() => setIsMobileSidebarOpen(false)}
          className="lg:hidden absolute right-2 top-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation List - Fixed Height with Independent Scroll on Overflow */}
      <nav className="flex-1 min-h-0 px-3 py-1.5 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.to ||
            (item.matchPrefix !== "/overview" &&
              location.pathname.startsWith(item.matchPrefix)) ||
            (item.to === "/overview" && location.pathname === "/");

          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-[#1F62AC] text-white shadow-sm shadow-blue-700/20"
                  : "text-[#163654] hover:bg-[#F2ECE0] text-opacity-95 hover:text-opacity-100"
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-[#163654]"}`}
              />
              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Pastoral Meadow & Cow Artwork */}
      <div className="shrink-0 mt-auto pointer-events-none relative w-full overflow-hidden flex flex-col justify-end">
        <img
          src="/assets/sidebar-bottom-image.png"
          alt="Dairy Pasture"
          className="w-full h-auto object-cover object-bottom"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar with Fixed Viewport Height */}
      <aside className="hidden lg:flex shrink-0 h-screen max-h-screen">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Drawer */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative flex-1 flex flex-col w-52 max-w-[220px] h-screen bg-[#FAF8F3] shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
