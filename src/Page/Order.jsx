import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";


import CommonTable from "../component/CommonTable";
 import useMutationApi from "../service/hooks/useMutationApi";
import OrdersTablecolumns from "./OrdersTablecolumns";
import { useEffect,  } from "react";
import toastService from "../component/toastService";
import AddModal from "../component/AddModal";

import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import CommonSearch from "../component/CommonSearch";
import AddProductButton from "../component/AddProductButton";

const Orders = () => {
  const [search, setSearch] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState("add");
const [selectedProduct, setSelectedProduct] = useState(null);

const handleAdd = () => {
  setSelectedProduct(null);
  setModalMode("add");
  setIsModalOpen(true);
};

const handleEdit = (product) => {
  setSelectedProduct(product);
  setModalMode("edit");
  setIsModalOpen(true);
};
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [arrivalsProducts, setarrivalsProducts] = useState([]);

  const [selectedarrivalsProduct, setSelectedArrivalsProduct] = useState(null);


 
const orderStatuses = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];
 

   const {
  data,
  isLoading,
  isError,
} = useGet(
  ["Orderall_products", search],
API.Orderall_products
);

 
useEffect(() => {
  if (data) {
    setarrivalsProducts(
      Array.isArray(data.orders) ? data.orders : []
    );
  }
}, [data]);

 

 
 
const updateOrder = useMutationApi(
  "PUT",
  API.updateOrderStatuss,
  ["Orderall_products"]
);

const handleStatusChange = (item, newStatus) => {
  if (item.orderStatus === newStatus) return;

  updateOrder.mutate(
    {
      id: item._id,
      orderStatus: newStatus,
    },
    {
      onSuccess: () => {
        toastService.success("Order status updated successfully");
      },
      onError: () => {
        toastService.error("Failed to update order status");
      },
    }
  );
};
  return (
    






        <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
            New Order
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage your latest Order
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

           {/* <CommonSearch
          search={search}
          setSearch={setSearch}
          placeholder="Search users..."
        /> */}
       

 
             {/* Add Product */}
 

        </div>

      </div>


      {/* ================= PRODUCT TABLE ================= */}

  <CommonTable
  columns={OrdersTablecolumns}
  data={arrivalsProducts}
  actions={(item) => (
    <div className="px-4 py-3">
      <select
        value={item.orderStatus || "Pending"}
        onChange={(e) => handleStatusChange(item, e.target.value)}
        className="w-full min-w-[135px] rounded-lg border border-[#2a2e36]
        bg-[#181b21] px-3 py-2 text-sm text-gray-200
        outline-none focus:border-pink-500"
      >
        {orderStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  )}
/>


    

 

    </div>
  );
};

export default Orders;
