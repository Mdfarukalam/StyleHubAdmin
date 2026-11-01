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
import New_ArrivalsTablecolumns from "./New_ArrivalsControler";
import { useEffect,  } from "react";
import toastService from "../component/toastService";


import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import CommonSearch from "../component/CommonSearch";
import AddProductButton from "../component/AddProductButton";

const New_Arrivals = () => {
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedarrivalsProduct, setSelectedArrivalsProduct] = useState(null);


     const {
    data,
    isLoading,
    isError,
  } = useGet(["arrivals"], API.arrivals.get);

 
 
useEffect(() => {
  if (data) {
    setSelectedArrivalsProduct(
      Array.isArray(data.GetArrivalsProduts) ? data.GetArrivalsProduts : []
    );
  }
}, [data]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Floral Print Saree",
      category: "Women",
      price: "₹1,199",
      date: "08 Oct 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Relaxed Fit Jeans",
      category: "Men",
      price: "₹1,599",
      date: "07 Oct 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Kids Printed Hoodie",
      category: "Kids",
      price: "₹899",
      date: "06 Oct 2026",
      status: "Active",
    },
    {
      id: 4,
      name: "Oversized Casual T-Shirt",
      category: "Men",
      price: "₹699",
      date: "05 Oct 2026",
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    date: "",
  });

  // Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= ADD PRODUCT =================

  const handleAdd = () => {
    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.date
    ) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: `₹${form.price}`,
      date: form.date,
      status: "Active",
    };

    setProducts([...products, newProduct]);

    setForm({
      name: "",
      category: "",
      price: "",
      date: "",
    });

    setShowAddModal(false);
  };

  // ================= OPEN EDIT =================

  const openEdit = (product) => {
    setSelectedArrivalsProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price.replace("₹", ""),
      date: product.date,
    });

    setShowEditModal(true);
  };

  // ================= EDIT PRODUCT =================

  const handleEdit = () => {
    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.date
    ) {
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === selectedarrivalsProduct.id
          ? {
              ...product,
              name: form.name,
              category: form.category,
              price: `₹${form.price}`,
              date: form.date,
            }
          : product
      )
    );

    setShowEditModal(false);
    setSelectedArrivalsProduct(null);
  };

  // ================= DELETE PRODUCT =================

    const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.arrivals.delete,
  ["arrivals"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedarrivalsProduct._id });
      setShowDeleteModal(false);
          setSelectedMenProduct(null);
          toastService.success("User deleted successfully");
};

  return (
    






        <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
            New Arrivals
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage your latest products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

           <CommonSearch
          search={search}
          setSearch={setSearch}
          placeholder="Search users..."
        />

             {/* Add Product */}
         <AddProductButton
  onClick={() => setShowAddModal(true)}
/>

        </div>

      </div>


      {/* ================= PRODUCT TABLE ================= */}

        <CommonTable
        columns={New_ArrivalsTablecolumns}

        data={selectedarrivalsProduct}
        actions={(item) => (

          <div className="flex justify-end items-center gap-1 px-6 py-4">

          <div className="flex justify-end gap-1">

                      {/* Edit */}
                      <button
                        title="Edit"
                        onClick={() => openEdit(item)}
                        className="w-9 h-9 flex items-center justify-center
                        rounded-lg
                        text-gray-400
                        hover:text-white
                        hover:bg-[#252a36]
                        transition"
                      >
                        <Pencil size={17} />
                      </button>


                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => {
                          setSelectedArrivalsProduct(item);
                          setShowDeleteModal(true);
                        }}
                        className="w-9 h-9 flex items-center justify-center
                        rounded-lg
                        text-gray-400
                        hover:text-red-400
                        hover:bg-red-500/10
                        transition"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

          </div>
        )}
     
      />


    

      <DeleteModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        selectedUser={selectedarrivalsProduct}
        setSelectedUser={setSelectedArrivalsProduct}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default New_Arrivals;