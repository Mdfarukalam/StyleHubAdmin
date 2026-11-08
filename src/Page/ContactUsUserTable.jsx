const ContactUsTablecolumns = [
  {
    label: "Customer",
    key: "name",
    render: (user) => (
      <div>
        <p className="text-sm font-medium text-gray-200">
          {user.name || "Unknown User"}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Contact ID: #{String(user._id || "").slice(-8).toUpperCase()}
        </p>
      </div>
    ),
  },

  {
    label: "Email",
    key: "email",
    render: (user) => (
      <p className="text-sm text-gray-300">
        {user.email || "No Email"}
      </p>
    ),
  },

  {
    label: "Subject",
    key: "subject",
    render: (user) => (
      <p className="text-sm text-gray-300">
        {user.subject || "No Subject"}
      </p>
    ),
  },

  {
    label: "Message",
    key: "message",
    render: (user) => (
      <div className="max-w-[250px]">
        <p className="text-sm text-gray-400 break-words">
          {user.message || "No Message"}
        </p>
      </div>
    ),
  },

  {
    key: "createdAt",
    label: "Created Date",
    render: (item) => (
      <div className="text-sm text-gray-400">
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

export default ContactUsTablecolumns;