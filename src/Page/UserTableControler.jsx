   const columns =   [
    {
      label: "Customer",
      key: "fullName",
   render: (user) => {
  const productImage = user.colorVariants?.[0]?.images;

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#2a2e36] bg-[#252932] flex items-center justify-center shrink-0">
        {productImage ? (
          <img
            src={productImage}
            alt={user.name || "Product"}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="w-full h-full items-center justify-center text-gray-500 text-xl"
          style={{ display: productImage ? "none" : "flex" }}
        >
          📦
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-200">
          {user.name || "Unknown Product"}
        </p>

        <p className="text-xs text-gray-500 mt-0.5">
          Product #{String(user._id || "")}
        </p>

        <p className="text-xs text-gray-500 mt-0.5">
          {user.colorVariants?.length || 0} Colors
        </p>
      </div>
    </div>
  );
},
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