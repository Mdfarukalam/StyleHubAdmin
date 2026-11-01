   const columns =   [
    {
      label: "Customer",
      key: "fullName",
      render: (user) => (
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[#252932] flex items-center justify-center text-sm font-semibold text-gray-300">
            {(user.fullName || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-200">
              {user.fullName || "Unknown User"}
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              User #{String(user._id || "")}
            </p>
          </div>

        </div>
      ),
    },
    {
      label: "Email", key: "Email",
      render: (user) => (
        <p className="text-sm text-gray-300">
          {user.Email || "No email"}
        </p>

      ),
    },
    {
      label: "Contact No", key: "phoneNumber",
      render: (user) => (
        <p className="text-xs text-gray-500 mt-1">
          {user.phoneNumber || user.phoneNumber || "No phone"}
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

  export default columns;