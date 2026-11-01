   const New_ArrivalsTablecolumns =   [
    {
      label: "Product",
      key: "name",
      render: (user) => (
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[#252932] flex items-center justify-center text-sm font-semibold text-gray-300">
            {(user.name || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-200">
              {user.name || "Unknown Product"}
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              User #{String(user._id || "")}
            </p>
          </div>

        </div>
      ),
    },
    {
      label: "Category", key: "category",
      render: (user) => (
        <p className="text-sm text-gray-300">
          {user.category || "No category"}
        </p>

      ),
    },
    {
      label: "Price", key: "price",
      render: (user) => (
        <p className="text-xs text-gray-500 mt-1">
          {user.price || user.price || "No price"}
        </p>
      )
    },
      {
      label: "Stock", key: "stock",
      render: (user) => (
        <p className="text-xs text-gray-500 mt-1">
          {user.stock || user.stock || "No stock"}
        </p>
      )
    },

    {
      key: "createdAt",
      label: "Created Date",
      render: (item) => (
        <div className="px-6 py-4 text-sm text-gray-400">
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            : "-"}
        </div>
      ),
    },
  ];

  export default New_ArrivalsTablecolumns; 