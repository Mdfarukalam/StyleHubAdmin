
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigate = useNavigate();


 

// Logout Function
const handleLogout = () => {
  localStorage.removeItem("token");
  setIsLogoutOpen(false);
  window.location.href = "/login";
};
 

  const menuItems = [
    { path: "/dashboard", icon: "📊", name: "Dashboard" },
    { path: "/users", icon: "👥", name: "Users" },
    { path: "/men", icon: "👔", name: "Men" },
    { path: "/women", icon: "👗", name: "Women" },
    { path: "/kids", icon: "🧒", name: "Kids" },
    { path: "/top-product", icon: "🔥", name: "Top Product" },
    { path: "/new-arrivals", icon: "🆕", name: "New Arrivals" },
  { path: "/Orders", icon: "📦", name: "Orders" },
  { path: "/ContactUsUser", icon: "📩", name: "Contact Us" },
   { path: "/Topimage", icon: "📩", name: "Top Image" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-[60] bg-[#1e2229] text-white p-2 rounded-lg"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 z-[40]"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-[240px]
          bg-[#0f1115] text-white border-r border-[#2a2e36]
          flex flex-col z-[50]
          transition-transform duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="h-[80px] flex items-center px-6 border-b border-[#2a2e36]">
          <h1 className="text-2xl font-bold">
            <span className="text-white">Style</span>
            <span className="text-pink-500">Hub</span>
          </h1>
        </div>

        {/* Menu */}
        <div className="p-4 flex-1 overflow-y-auto">

          <p className="text-xs font-semibold text-gray-500 uppercase mb-4 px-3">
            Management
          </p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `
                w-full flex items-center gap-3
                px-4 py-3 mb-1 rounded-lg
                transition-all duration-200
                ${
                  isActive
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-500/20"
                    : "text-gray-400 hover:bg-[#1e2229] hover:text-white"
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}

        </div>

        {/* Logout */}
        <div className="p-4 border-t border-[#2a2e36]">
 


<button
 onClick={() => setIsLogoutOpen(true)}
  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
>
  <span className="text-lg">🚪</span>
  <span className="font-medium">Logout</span>
</button>

{/* Logout Modal */}
<LogoutModal
  isOpen={isLogoutOpen}
  setIsOpen={setIsLogoutOpen}
  handleLogout={handleLogout}
/>
        </div>
      </aside>

 
    </>
  );
};

export default Sidebar;
