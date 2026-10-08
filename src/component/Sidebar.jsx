
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-[#0f1115] text-white border-r border-[#2a2e36]">

      {/* Logo */}
      <div className="h-[80px] flex items-center px-6 border-b border-[#2a2e36]">
        <h1 className="text-2xl font-bold">
          <span className="text-white">Style</span>
          <span className="text-pink-500">Hub</span>
        </h1>
      </div>

      {/* Menu */}
      <div className="p-4">

        <p className="text-xs font-semibold text-gray-500 uppercase mb-4 px-3">
          Management
        </p>
        <Link
  to="/dashboard"
  className="
    w-full flex items-center gap-3
    px-4 py-3
    rounded-lg
    text-gray-400
    hover:bg-[#1e2229]
    hover:text-white
    transition
  "
>
  <span className="text-lg">📊</span>
  <span className="font-medium">Dashboard</span>
</Link>

        {/* Users */}
        <Link
          to="/users"
          className="
            w-full flex items-center gap-3
            px-4 py-3
            rounded-lg
            text-gray-400
            hover:bg-[#1e2229]
            hover:text-white
            transition
          "
        >
          <span className="text-lg">👥</span>
          <span className="font-medium">Users</span>
        </Link>

        {/* Men */}
        <Link
          to="/men"
          className="
            w-full flex items-center gap-3
            px-4 py-3
            rounded-lg
            text-gray-400
            hover:bg-[#1e2229]
            hover:text-white
            transition
          "
        >
          <span className="text-lg">👔</span>
          <span className="font-medium">Men</span>
        </Link>

        {/* Women */}
        <Link
          to="/women"
          className="
            w-full flex items-center gap-3
            px-4 py-3
            rounded-lg
            text-gray-400
            hover:bg-[#1e2229]
            hover:text-white
            transition
          "
        >
          <span className="text-lg">👗</span>
          <span className="font-medium">Women</span>
        </Link>

        {/* Kids */}
        <Link
          to="/kids"
          className="
            w-full flex items-center gap-3
            px-4 py-3
            rounded-lg
            text-gray-400
            hover:bg-[#1e2229]
            hover:text-white
            transition
          "
        >
          <span className="text-lg">🧒</span>
          <span className="font-medium">Kids</span>
        </Link>



               {/* Kids */}
{/* Top Product */}
<Link
  to="/top-product"
  className="
    w-full flex items-center gap-3
    px-4 py-3
    rounded-lg
    text-gray-400
    hover:bg-[#1e2229]
    hover:text-white
    transition
  "
>
  <span className="text-lg">🔥</span>
  <span className="font-medium">Top Product</span>
</Link>


{/* New Arrivals */}
<Link
  to="/new-arrivals"
  className="
    w-full flex items-center gap-3
    px-4 py-3
    rounded-lg
    text-gray-400
    hover:bg-[#1e2229]
    hover:text-white
    transition
  "
>
  <span className="text-lg">🆕</span>
  <span className="font-medium">New Arrivals</span>
</Link>


      </div>

    </aside>
  );
};

export default Sidebar;
