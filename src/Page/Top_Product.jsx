import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import Top_productTablecolumns from "./Top_ProductTableContrler";
import CommonTable from "../component/CommonTable";

import { useEffect,  } from "react";

import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import CommonSearch from "../component/CommonSearch";
import AddProductButton from "../component/AddProductButton";
import toastService from "../component/toastService";

const Top_Product = () => {
  const [search, setSearch] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedTopProduct, setSelectedTopProduct] = useState(null);


  const {
    data,
    isLoading,
    isError,
  } = useGet(["topProducts"], API.topProducts.get);

 
 

 useEffect(() => {
  if (data) {
    const userData = Array.isArray(data)
      ? data
      : data.TopProduct || [];

    setSelectedTopProduct(
      Array.isArray(userData) ? userData : []
    );
  }
}, [data]);


  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Premium Silk Saree",
      category: "Women",
      price: "₹1,299",
      sales: 125,
      status: "Active",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      category: "Men",
      price: "₹1,499",
      sales: 98,
      status: "Active",
    },
    {
      id: 3,
      name: "Kids Printed T-Shirt",
      category: "Kids",
      price: "₹599",
      sales: 76,
      status: "Active",
    },
    {
      id: 4,
      name: "Women Casual Kurti",
      category: "Women",
      price: "₹899",
      sales: 64,
      status: "Active",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    sales: "",
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
      !form.sales
    ) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: `₹${form.price}`,
      sales: Number(form.sales),
      status: "Active",
    };

    setProducts([...products, newProduct]);

    setForm({
      name: "",
      category: "",
      price: "",
      sales: "",
    });

    setShowAddModal(false);
  };

  // ================= OPEN EDIT =================

  const openEdit = (product) => {
    setSelectedTopProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price.replace("₹", ""),
      sales: product.sales,
    });

    setShowEditModal(true);
  };

  // ================= EDIT PRODUCT =================

  const handleEdit = () => {
    if (
      !form.name ||
      !form.category ||
      !form.price ||
      !form.sales
    ) {
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === selectedTopProduct.id
          ? {
              ...product,
              name: form.name,
              category: form.category,
              price: `₹${form.price}`,
              sales: Number(form.sales),
            }
          : product
      )
    );

    setShowEditModal(false);
    setSelectedTopProduct(null);
  };

  // ================= DELETE PRODUCT =================

  const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.topProducts.delete,
  ["topProducts"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedTopProduct._id });
            toastService.success("Top Product deleted successfully");

      setShowDeleteModal(false);
          setSelectedMenProduct(null);
};

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
            Top Products
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage your best selling products
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
        columns={Top_productTablecolumns}

        data={selectedTopProduct}
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
                          setSelectedTopProduct(item);
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
        selectedUser={selectedTopProduct}
        setSelectedUser={setSelectedTopProduct}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default Top_Product;