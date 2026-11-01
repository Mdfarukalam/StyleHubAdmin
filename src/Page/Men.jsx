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
import AddModal from "../component/AddModal";
 
const Men = () => {
  const [search, setSearch] = useState("");
 
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedMenProduct, setSelectedMenProduct] = useState(null);


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





 

 



  const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.mendelete,
  ["men"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedMenProduct._id });
      toastService.success("Men deleted successfully");

      setShowDeleteModal(false);
    setSelectedMenProduct(null);
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
          <AddProductButton  onClick={handleAdd} title="Add Men Product"></AddProductButton>
 
 
<AddModal
  category="men"
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