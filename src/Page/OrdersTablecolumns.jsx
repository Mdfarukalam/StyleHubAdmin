
const OrdersTablecolumns = [
  {
    label: "Order ID",
    key: "_id",
    render: (order) => (
      <div>
        <p className="text-sm font-medium text-gray-200">
          #{String(order._id || "").slice(-8).toUpperCase()}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {order.items?.length || 0} Items
        </p>
      </div>
    ),
  },

  {
    label: "Customer",
    key: "userId",
    render: (order) => (
      <div>
        <p className="text-sm font-medium text-gray-200">
          {order.userId?.fullName || "Unknown User"}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {order.userId?.Email || "No Email"}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {order.userId?.phoneNumber || "No Phone"}
        </p>
      </div>
    ),
  },

  {
    label: "Product",
    key: "items",
    render: (order) => {
      const product = order.items?.[0];

      return (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#2a2e36] bg-[#252932] flex items-center justify-center shrink-0">
            {product?.image ? (
              <img
                src={product.image}
                alt={product.name || "Product"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <span>📦</span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-200">
              {product?.name || "Unknown Product"}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {product?.brand || "No Brand"}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              {order.items?.length > 1
                ? `+${order.items.length - 1} more products`
                : `Qty: ${product?.quantity || 0}`}
            </p>
          </div>
        </div>
      );
    },
  },

  {
    label: "Total Amount",
    key: "totalAmount",
    render: (order) => (
      <div>
        <p className="text-sm font-semibold text-gray-200">
          ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          Shipping: ₹{order.shipping || 0}
        </p>
      </div>
    ),
  },

  {
    label: "Payment",
    key: "paymentMethod",
    render: (order) => (
      <div>
        <p className="text-sm text-gray-300">
          {order.paymentMethod || "COD"}
        </p>

        <p className={`text-xs mt-1 ${
          order.paymentStatus === "Paid"
            ? "text-green-500"
            : "text-yellow-500"
        }`}>
          {order.paymentStatus || "Pending"}
        </p>
      </div>
    ),
  },

  {
    label: "Order Status",
    key: "orderStatus",
    render: (order) => {
      const statusStyles = {
        Pending: "bg-yellow-500/10 text-yellow-500",
        Processing: "bg-purple-500/10 text-purple-400",
        Shipped: "bg-blue-500/10 text-blue-400",
        Delivered: "bg-green-500/10 text-green-500",
        Cancelled: "bg-red-500/10 text-red-500",
      };

      return (
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
            statusStyles[order.orderStatus] ||
            "bg-gray-500/10 text-gray-400"
          }`}
        >
          {order.orderStatus || "Pending"}
        </span>
      );
    },
  },

  {
    key: "createdAt",
    label: "Order Date",
    render: (order) => (
      <div className="text-sm text-gray-400">
        {order.createdAt
          ? new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "-"}
      </div>
    ),
  },
];

export default OrdersTablecolumns;
