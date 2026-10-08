
import React, { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const Kids = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

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
    setSelectedProduct(product);

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
        product.id === selectedProduct.id
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
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    setProducts(
      products.filter(
        (product) => product.id !== selectedProduct.id
      )
    );

    setShowDeleteModal(false);
    setSelectedProduct(null);
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
          <div className="relative w-full sm:w-[280px]">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full h-[42px] pl-10 pr-4
                bg-[#151821]
                border border-[#292e3a]
                rounded-lg
                text-sm text-gray-200
                outline-none
                focus:border-pink-500
              "
            />
          </div>

          {/* Add Product */}
          <button
            onClick={() => setShowAddModal(true)}
            className="
              h-[42px] px-4
              bg-pink-500
              hover:bg-pink-600
              rounded-lg
              flex items-center justify-center gap-2
              text-sm font-medium
            "
          >
            <Plus size={18} />
            Add Product
          </button>

        </div>
      </div>

      {/* Table */}
      <div className="bg-[#151821] border border-[#292e3a] rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px]">

            <thead>
              <tr className="bg-[#1b1f2a] border-b border-[#292e3a]">

                <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-400">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-400">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-400">
                  Price
                </th>

                <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-400">
                  Stock
                </th>

                <th className="px-6 py-4 text-left text-[11px] uppercase tracking-wider text-gray-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-[11px] uppercase tracking-wider text-gray-400">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-[#292e3a]">

              {filteredProducts.map((product) => (

                <tr
                  key={product.id}
                  className="hover:bg-[#1b1f2a] transition"
                >

                  {/* Product */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div>
                        <p className="text-sm font-medium text-gray-200">
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          Product #{String(product.id).padStart(4, "0")}
                        </p>
                      </div>

                    </div>

                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {product.category}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-200">
                    {product.price}
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {product.stock}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-2 text-xs font-medium ${
                        product.status === "Active"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.status === "Active"
                            ? "bg-emerald-400"
                            : "bg-red-400"
                        }`}
                      />

                      {product.status}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end gap-1">

                      <button
                        title="Edit"
                        onClick={() => openEdit(product)}
                        className="
                          w-9 h-9 flex items-center justify-center
                          rounded-lg
                          text-gray-400
                          hover:text-white
                          hover:bg-[#252a36]
                          transition
                        "
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowDeleteModal(true);
                        }}
                        className="
                          w-9 h-9 flex items-center justify-center
                          rounded-lg
                          text-gray-400
                          hover:text-red-400
                          hover:bg-red-500/10
                          transition
                        "
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="h-[58px] px-6 border-t border-[#292e3a] flex items-center justify-between">

          <p className="text-xs text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          <p className="text-xs text-gray-600">
            Kids' Collection
          </p>

        </div>

      </div>

      {/* ADD MODAL */}
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

      {/* EDIT MODAL */}
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

      {/* DELETE MODAL */}
      {showDeleteModal && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[400px] bg-[#151821] border border-[#292e3a] rounded-xl p-6">

            <h2 className="text-lg font-semibold">
              Delete Product
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">

              Are you sure you want to delete{" "}

              <span className="text-white font-medium">
                {selectedProduct?.name}
              </span>

              ?

              <br />

              This action cannot be undone.

            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-[#252a36] text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-medium"
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Kids;

