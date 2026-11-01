import React, { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Ban,
  CheckCircle,
  Users,
} from "lucide-react";

import toastService from "../component/toastService";
import useMutationApi from "../service/hooks/useMutationApi";
import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import CommonTable from "../component/CommonTable";
import CommonSearch from "../component/CommonSearch";
import columns from "./UserTableControler";
import DeleteModal from "../component/DeleteModal";

const User = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // GET ALL USERS API
  const {
    data,
    isLoading,
    isError,
  } = useGet(["users"], API.users);

  // API response ko users array mein convert karna
  useEffect(() => {
    if (data) {
      const userData = Array.isArray(data)
        ? data
        : data.users ||
        data.User ||
        data.data?.users ||
        data.data ||
        [];

      setUsers(Array.isArray(userData) ? userData : []);
    }
  }, [data]);

  // Search users
  const filteredUsers = users.filter((user) => {
    const name = user.fullName || "";
    const email = user.Email || "";

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase())
    );
  });






  // Open delete modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const { mutate: deleteProduct } = useMutationApi(
  "DELETE",
  API.DeletedUsers,
  ["DeletedUsers"]
);

const handleDelete = () => {
  deleteProduct({ id: selectedUser._id });
   toastService.success("User deleted successfully");
      setShowDeleteModal(false);
    setSelectedUser(null);
              

};




  return (
    <div className="min-h-screen bg-[#0f1115] p-6 lg:p-8 text-gray-200">

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7">

        <div>
          <h1 className="text-[26px] font-semibold text-white tracking-tight">
            Users
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Manage and monitor registered customers
          </p>
        </div>



        <CommonSearch
          search={search}
          setSearch={setSearch}
          placeholder="Search users..."
        />

      </div>





      <CommonTable
        columns={columns}

        data={filteredUsers}
        actions={(item) => (

          <div className="flex justify-end items-center gap-1 px-6 py-4">

            {/* Delete */}
            <button
              title="Delete"
              onClick={() => openDeleteModal(item)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <Trash2 size={17} strokeWidth={1.8} />
            </button>

          </div>
        )}
     
      />





      <DeleteModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        handleDelete={handleDelete}
      />



    </div>
  );
};

export default User;