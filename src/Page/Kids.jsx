
import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import CommonTable from "../component/CommonTable";
import KidTablecolumns from "./KidTableControler";

import { useEffect,  } from "react";
import toastService from "../component/toastService";
import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import CommonSearch from "../component/CommonSearch";
import AddProductButton from "../component/AddProductButton";

const Kids = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedKidProduct, setSelectedKidProduct] = useState(null);



    const {
    data,
    isLoading,
    isError,
  } = useGet(["kid"], API.kidsget);

 
 
useEffect(() => {
  if (data) {
    setSelectedKidProduct(
      Array.isArray(data.Kid) ? data.Kid : []
    );
  }
}, [data]);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Cotton T-Shirt",
      category: "T-Shirts",
      price: "₹599",
      stock: 35,
      status: "Active",
    },
    {
      id: 2,
      name: "Kids Jeans",
      category: "Jeans",
      price: "₹899",
      stock: 24,
      status: "Active",
    },
    {
      id: 3,
      name: "Printed Dress",
      category: "Dresses",
      price: "₹799",
      stock: 18,
      status: "Active",
    },
    {
      id: 4,
      name: "Kids Denim Jacket",
      category: "Jackets",
      price: "₹1,299",
      stock: 0,
      status: "Out of Stock",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!form.name || !form.category || !form.price || !form.stock) {
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      price: `₹${form.price}`,
      stock: Number(form.stock),
      status: Number(form.stock) > 0 ? "Active" : "Out of Stock",
    };

    setProducts([...products, newProduct]);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowAddModal(false);
  };

  const openEdit = (product) => {
    setSelectedKidProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price.replace("₹", ""),
      stock: product.stock,
    });

    setShowEditModal(true);
  };

  const handleEdit = () => {
    setProducts(
      products.map((product) =>
        product.id === selectedKidProduct.id
          ? {
              ...product,
              name: form.name,
              category: form.category,
              price: `₹${form.price}`,
              stock: Number(form.stock),
              status:
                Number(form.stock) > 0 ? "Active" : "Out of Stock",
            }
          : product
      )
    );

    setShowEditModal(false);
    setSelectedKidProduct(null);
  };

  const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.kidsdelete,
  ["kidsdelete"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedKidProduct._id });
            toastService.success("Kid deleted successfully");

      setShowDeleteModal(false);
          setSelectedMenProduct(null);
 };

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">
        <div>
          <h1 className="text-[26px] font-semibold">
            Kids
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage kids' products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
             
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

     <CommonTable
        columns={KidTablecolumns}

        data={selectedKidProduct}
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
                          setSelectedKidProduct(item);
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
        selectedUser={selectedKidProduct}
        setSelectedUser={setSelectedKidProduct}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default Kids;

