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
import ContactUsTablecolumns from "./ContactUsUserTable";
import { useEffect,  } from "react";
import toastService from "../component/toastService";
import AddModal from "../component/AddModal";

import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import DeleteModal from "../component/DeleteModal";
import CommonSearch from "../component/CommonSearch";
import AddProductButton from "../component/AddProductButton";

const ContactUsUser = () => {
  const [search, setSearch] = useState("");

const [isModalOpen, setIsModalOpen] = useState(false);
const [modalMode, setModalMode] = useState("add");
const [selectedProduct, setSelectedProduct] = useState(null);

 

 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [arrivalsProducts, setarrivalsProducts] = useState([]);

  const [selectedarrivalsProduct, setSelectedArrivalsProduct] = useState(null);


 
 
 

   const {
  data,
  isLoading,
  isError,
} = useGet(
  ["ContactUsUsers", search],
API.ContactUsUsers
);

 
useEffect(() => {
  if (data) {
    setarrivalsProducts(
      Array.isArray(data.ContactUs) ? data.ContactUs : []
    );
  }
}, [data]);

 

 
 
  return (
    






        <div className="min-h-screen bg-[#0f1117] text-white p-6 lg:p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold">
    User Contact  
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage your Contact User
          </p>
        </div>
 

      </div>


      {/* ================= PRODUCT TABLE ================= */}

  <CommonTable
  columns={ContactUsTablecolumns}
  data={arrivalsProducts}
 
/>


    

 

    </div>
  );
};

export default ContactUsUser;
