import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import CommonSearch from "../component/CommonSearch";
import DeleteModal from "../component/DeleteModal";
import { useEffect,  } from "react";
import toastService from "../component/toastService";

import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import CommonTable from "../component/CommonTable";
import MenTablecolumns from "./MenTableControler";
import AddProductButton from "../component/AddProductButton";
const Men = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedMenProduct, setSelectedMenProduct] = useState(null);



 
  const {
    data,
    isLoading,
    isError,
  } = useGet(["men"], API.menget);

 
 

 useEffect(() => {
  if (data) {
    const userData = Array.isArray(data)
      ? data
      : data.GetMenProduts || [];

    setSelectedMenProduct(
      Array.isArray(userData) ? userData : []
    );
  }
}, [data]);





  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Regular Fit T-Shirt",
      category: "T-Shirts",
      price: "₹799",
      stock: 42,
      status: "Active",
    },
    {
      id: 2,
      name: "Slim Fit Jeans",
      category: "Jeans",
      price: "₹1,499",
      stock: 28,
      status: "Active",
    },
    {
      id: 3,
      name: "Casual Shirt",
      category: "Shirts",
      price: "₹999",
      stock: 12,
      status: "Active",
    },
    {
      id: 4,
      name: "Denim Jacket",
      category: "Jackets",
      price: "₹1,899",
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

  // Add Product
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

  // Open Edit
  const openEdit = (product) => {
    setSelectedMenProduct(product);

    setForm({
      name: product.name,
      category: product.category,
      price: product.price.replace("₹", ""),
      stock: product.stock,
    });

    setShowEditModal(true);
  };

  // Update Product
  const handleEdit = () => {
    setProducts(
      products.map((product) =>
        product.id === selectedMenProduct.id
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
    setSelectedMenProduct(null);
  };



  const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.mendelete,
  ["men"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedMenProduct._id });
      setShowDeleteModal(false);
    setSelectedMenProduct(null);
    toastService.success("User deleted successfully");
};

   
 

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
            Men
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage men's products
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




   <CommonTable
        columns={MenTablecolumns}

        data={selectedMenProduct}
        actions={(item) => 
        {
          console.log(item,"item")
          return(
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
                          setSelectedMenProduct(item);
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
          )
        }
        }
     
      />

   

      {/* ================= ADD MODAL ================= */}

      {showAddModal && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[500px] bg-[#151821] border border-[#292e3a] rounded-xl">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#292e3a]">

              <h2 className="text-lg font-semibold">
                Add Product
              </h2>

              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>


            <div className="p-6 space-y-4">

              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

            </div>


            <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#292e3a]">

              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg bg-[#252a36] text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-sm font-medium"
              >
                Add Product
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ================= EDIT MODAL ================= */}

      {showEditModal && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[500px] bg-[#151821] border border-[#292e3a] rounded-xl">

            <div className="flex items-center justify-between px-6 py-5 border-b border-[#292e3a]">

              <h2 className="text-lg font-semibold">
                Edit Product
              </h2>

              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>


            <div className="p-6 space-y-4">

              <input
                type="text"
                placeholder="Product name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

              <input
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
                className="w-full h-11 px-4 bg-[#0f1117] border border-[#292e3a] rounded-lg outline-none text-sm"
              />

            </div>


            <div className="flex justify-end gap-3 px-6 py-5 border-t border-[#292e3a]">

              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-lg bg-[#252a36] text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleEdit}
                className="px-5 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-sm font-medium"
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}


   

      <DeleteModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        selectedUser={selectedMenProduct}
        setSelectedUser={setSelectedMenProduct}
        handleDelete={handleDelete}
      />

    </div>
  );
};

export default Men;