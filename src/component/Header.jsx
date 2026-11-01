
const Header = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header
      className={`
        fixed top-0 right-0 z-30
        h-[80px] bg-[#0f1115]
        border-b border-[#2a2e36]
        flex items-center px-4 md:px-6
        transition-all duration-300
        ${sidebarOpen ? "md:left-[240px]" : "left-0"}
      `}
    >

      {/* Sidebar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-2xl text-gray-400 hover:text-pink-500 transition"
      >
        ☰
      </button>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3 md:gap-4">

        <span className="text-sm text-gray-400">
          Admin
        </span>

        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#22262e] flex items-center justify-center">
          👤
        </div>

      </div>

    </header>
  );
};

export default Header;
