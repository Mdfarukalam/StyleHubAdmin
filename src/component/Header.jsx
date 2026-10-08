
const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="fixed top-0 left-[240px] right-0 z-50 h-[80px] bg-[#0f1115] border-b border-[#2a2e36] flex items-center px-6">

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-2xl text-gray-400 hover:text-pink-500 transition"
      >
        ☰
      </button>

      {/* Title */}
      {/* <h2 className="ml-5 text-xl font-semibold text-white">
        Admin Panel
      </h2> */}

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-4">

        <span className="text-sm text-gray-400">
          Admin
        </span>

        <div className="w-10 h-10 rounded-full bg-[#22262e] flex items-center justify-center">
          👤
        </div>

      </div>

    </header>
  );
};

export default Header;
