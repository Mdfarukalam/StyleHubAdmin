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
import Top_Latest_Tablecolumns from "./TopimagesTables";
import { useEffect,  } from "react";
import toastService from "../component/toastService";
import AddModal from "../component/AddModal";

import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import CommonSearch from "../component/CommonSearch";
import AddProductButton from "../component/AddProductButton";

const Topimage = () => {
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


 

 

   const {
  data,
  isLoading,
  isError,
} = useGet(
  ["Addimage"],
  API.Addimage.GetLatestImage
);

 
useEffect(() => {
  if (data) {
    setarrivalsProducts(
      Array.isArray(data.LatestImages) ? data.LatestImages : []
    );
  }
}, [data]);

 

 

    const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.Addimage.DeletedLatestImage,
  ["Addimage"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedarrivalsProduct._id });
     toastService.success("Latest Image deleted successfully");
      setShowDeleteModal(false);
          setSelectedMenProduct(null);
        
};

  return (
    






        <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
      Latest Image  
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage your  Latest Image upload in Web Site
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

 
          <AddProductButton  onClick={handleAdd} title="Add Latest Image Product"></AddProductButton>

 <AddModal
  category="Addimage"
  mode={modalMode}
  product={selectedProduct}
  isOpen={isModalOpen}
  onClose={() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }}
/>
             {/* Add Product */}
 

        </div>

      </div>


      {/* ================= PRODUCT TABLE ================= */}

        <CommonTable
        columns={Top_Latest_Tablecolumns}

        data={arrivalsProducts}
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

export default Topimage;