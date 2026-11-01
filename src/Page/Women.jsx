 
import React, { useState,useEffect } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";
import toastService from "../component/toastService";
import CommonSearch from "../component/CommonSearch";
import CommonTable from "../component/CommonTable";
import WomenTablecolumns from "./WomenTableControler";
import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import AddProductButton from "../component/AddProductButton";
import AddModal from "../component/AddModal";
const Women = () => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedWomenProduct, setSelectedWomenProduct] = useState(null);



  const {
    data,
    isLoading,
    isError,
  } = useGet(["women"], API.women.get);

 
  useEffect(() => {
   if (data) {
     const userData = Array.isArray(data)
       ? data
       : data.GetWomenProducts || [];
 
     setSelectedWomenProduct(
       Array.isArray(userData) ? userData : []
     );
   }
 }, [data]);

 


  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Regular Fit Top",
      category: "Tops",
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
      name: "Casual Kurti",
      category: "Kurtis",
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
    setSelectedWomenProduct(product);

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
        product.id === selectedWomenProduct.id
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
    setSelectedWomenProduct(null);
  };

  const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.women.delete,
  ["women"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedWomenProduct._id });
   toastService.success("Women deleted successfully");
      setShowDeleteModal(false);
    setSelectedMenProduct(null);
              

};

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
            Women
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage women's products
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
<AddModal category="women" />

        </div>
      </div>




         <CommonTable
        columns={WomenTablecolumns}

        data={selectedWomenProduct}
        actions={(item) => (

          <div className="flex justify-end items-center gap-1 px-6 py-4">

          <div className="flex justify-end gap-1">

            
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


         
                      <button
                        title="Delete"
                        onClick={() => {
                          setSelectedWomenProduct(item);
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
        selectedUser={selectedWomenProduct}
        setSelectedUser={setSelectedWomenProduct}
        handleDelete={handleDelete}
      />


 
    </div>
  );
};

export default Women;

