
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
import AddModal from "../component/AddModal";
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

  const [selectedKidProduct, setSelectedKidProduct] = useState(null);



 

  const {
  data,
  isLoading,
  isError,
} = useGet(
  ["kids", search],
  `${API.kidsget}?search=${encodeURIComponent(search)}`
);
 
useEffect(() => {
  if (data) {
    setSelectedKidProduct(
      Array.isArray(data.Kid) ? data.Kid : []
    );
  }
}, [data]);

 
 

 

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
          <AddProductButton  onClick={handleAdd} title="Add Kids Product"></AddProductButton>

 <AddModal
  category="kids"
  mode={modalMode}
  product={selectedProduct}
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }}
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
                                 onClick={() => handleEdit(item)}
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

