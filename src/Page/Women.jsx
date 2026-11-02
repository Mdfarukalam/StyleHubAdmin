 
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
const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState("add");
const [selectedProduct, setSelectedProduct] = useState(null);
const [womenProducts, setwomenProducts] = useState([]);

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

  const [selectedWomenProduct, setSelectedWomenProduct] = useState(null);


 const {
  data,
  isLoading,
  isError,
} = useGet(
  ["women", search],
  `${API.women.get}?search=${encodeURIComponent(search)}`
);
 

 
  useEffect(() => {
   if (data) {
     const userData = Array.isArray(data)
       ? data
       : data.GetWomenProducts || [];
 
     setwomenProducts(
       Array.isArray(userData) ? userData : []
     );
   }
 }, [data]);

 


 

 

 

 
 

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
          <AddProductButton  onClick={handleAdd} title="Add Women Product"></AddProductButton>

 <AddModal
  category="women"
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
        columns={WomenTablecolumns}

        data={womenProducts}
        actions={(item) => (

          <div className="flex justify-end items-center gap-1 px-6 py-4">

          <div className="flex justify-end gap-1">

            
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

