import React, { useEffect, useState } from "react";
import {
  Search,
  Trash2,
  Ban,
  CheckCircle,
  Users,
} from "lucide-react";

import { toast } from "react-toastify";
import API from "../ApiEndPoint/ApiUrl";
import useGet from "../service/hooks/useGet";
import CommonTable from "../component/CommonTable";
import CommonSearch from "../component/CommonSearch";
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



  const columns = [
    {
      label: "Customer",
      key: "fullName",
      render: (user) => (
        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[#252932] flex items-center justify-center text-sm font-semibold text-gray-300">
            {(user.fullName || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-sm font-medium text-gray-200">
              {user.fullName || "Unknown User"}
            </p>

            <p className="text-xs text-gray-500 mt-0.5">
              User #{String(user._id || "")}
            </p>
          </div>

        </div>
      ),
    },
    {
      label: "Email", key: "Email",
      render: (user) => (
        <p className="text-sm text-gray-300">
          {user.Email || "No email"}
        </p>

      ),
    },
    {
      label: "Contact No", key: "phoneNumber",
      render: (user) => (
        <p className="text-xs text-gray-500 mt-1">
          {user.phoneNumber || user.phoneNumber || "No phone"}
        </p>
      )
    },

    {
      key: "createdAt",
      label: "Created Date",
      render: (item) => (
        <div className="px-6 py-4 text-sm text-gray-400">
          {item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            : "-"}
        </div>
      ),
    },
  ];

 
  // Open delete modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Delete user
  const handleDelete = () => {
    if (!selectedUser) return;

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user._id !== selectedUser._id
      )
    );

    toast.success("User deleted successfully");

    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-gray-300">
        Loading users...
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="min-h-screen bg-[#0f1115] flex items-center justify-center text-red-400">
        Failed to load users. Please try again.
      </div>
    );
  }

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
             currentPage={currentPage}
    totalPages={1}
    totalRecords={filteredUsers?.length}
    onPageChange={setCurrentPage}
        />

      

  



      {/* DELETE MODAL */}
      {showDeleteModal && selectedUser && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[400px] bg-[#181b21] border border-[#2a2e36] rounded-xl p-6">

            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
              <Trash2 size={22} className="text-red-400" />
            </div>

            <h2 className="text-lg font-semibold text-white">
              Delete User
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">

              Are you sure you want to delete{" "}

              <span className="text-white font-medium">
                {selectedUser.fullName}
              </span>
              ?

              <br />

              This action cannot be undone.

            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#292e37] text-sm text-gray-300 hover:bg-[#333842]"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-medium text-white"
              >
                Delete User
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default User;