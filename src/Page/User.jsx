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

const User = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

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

  // User status
  const getUserStatus = (user) => {
    return user.status || "Active";
  };

  // Open block modal
  const openBlockModal = (user) => {
    setSelectedUser(user);
    setShowBlockModal(true);
  };

  // Block / Unblock user
  const handleBlock = () => {
    if (!selectedUser) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === selectedUser._id
          ? {
            ...user,
            status:
              getUserStatus(user) === "Active"
                ? "Blocked"
                : "Active",
          }
          : user
      )
    );

    toast.success(
      getUserStatus(selectedUser) === "Active"
        ? "User blocked successfully"
        : "User unblocked successfully"
    );

    setShowBlockModal(false);
    setSelectedUser(null);
  };

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

        {/* Search */}
        <div className="relative w-full lg:w-[320px]">

          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-[42px] pl-10 pr-4 bg-[#181b21] border border-[#2a2e36] rounded-lg text-sm text-gray-200 outline-none placeholder:text-gray-500 focus:border-gray-500 transition"
          />

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        {/* Total Users */}
        <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-400">
                Total Users
              </p>

              <h2 className="text-2xl font-semibold text-white mt-1">
                {users.length}
              </h2>
            </div>

            <div className="w-10 h-10 rounded-lg bg-[#22262e] flex items-center justify-center">
              <Users size={20} className="text-gray-300" />
            </div>

          </div>

        </div>

        {/* Active Users */}
        {/* <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl p-5">

          <p className="text-sm text-gray-400">
            Active Users
          </p>

          <h2 className="text-2xl font-semibold text-white mt-1">
            {users.filter(
              (user) => getUserStatus(user) === "Active"
            ).length}
          </h2>

        </div> */}

        {/* Blocked Users */}
        {/* <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl p-5">

          <p className="text-sm text-gray-400">
            Blocked Users
          </p>

          <h2 className="text-2xl font-semibold text-white mt-1">
            {users.filter(
              (user) => getUserStatus(user) === "Blocked"
            ).length}
          </h2>

        </div> */}

      </div>

      {/* Users Table */}
      <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="bg-[#14171c] border-b border-[#2a2e36]">

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Contact No
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Joined
                </th>



                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-[#252931]">

              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => {
                  const status = getUserStatus(user);

                  return (
                    <tr
                      key={user._id}
                      className="hover:bg-[#1e2229] transition"
                    >

                      {/* Customer */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-[#252932] flex items-center justify-center text-sm font-semibold text-gray-300">
                            {(user.fullName || "U")
                              .charAt(0)
                              .toUpperCase()}
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

                      </td>

                      {/* Contact */}
                      <td className="px-6 py-4">

                        <p className="text-sm text-gray-300">
                          {user.Email || "No email"}
                        </p>



                      </td>
                      <td className="px-6 py-4">



                        <p className="text-xs text-gray-500 mt-1">
                          {user.phoneNumber || user.phoneNumber || "No phone"}
                        </p>

                      </td>
                      {/* Joined */}
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                          : "N/A"}
                      </td>




                      {/* Status */}
                      {/* <td className="px-6 py-4">

                        <span
                          className={`inline-flex items-center gap-2 text-xs font-medium ${
                            status === "Active"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }`}
                        >

                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              status === "Active"
                                ? "bg-emerald-500"
                                : "bg-red-500"
                            }`}
                          />

                          {status}

                        </span>

                      </td> */}

                      {/* Actions */}
                      <td className="px-6 py-4">

                        <div className="flex justify-end items-center gap-1">

                          {/* Block / Unblock */}
                          {/* <button
                            title={
                              status === "Active"
                                ? "Block"
                                : "Unblock"
                            }
                            onClick={() => openBlockModal(user)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 transition"
                          >
                            {status === "Active" ? (
                              <Ban size={17} strokeWidth={1.8} />
                            ) : (
                              <CheckCircle
                                size={17}
                                strokeWidth={1.8}
                              />
                            )}
                          </button> */}

                          {/* Delete */}
                          <button
                            title="Delete"
                            onClick={() => openDeleteModal(user)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
                          >
                            <Trash2 size={17} strokeWidth={1.8} />
                          </button>

                        </div>

                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-12 text-gray-500 text-sm"
                  >
                    No users found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* Footer */}
        <div className="h-[58px] px-6 border-t border-[#2a2e36] flex items-center justify-between">

          <p className="text-xs text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>

          <div className="text-xs text-gray-600">
            Customer Management
          </div>

        </div>

      </div>

      {/* BLOCK / UNBLOCK MODAL */}
      {/* {showBlockModal && selectedUser && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[420px] bg-[#181b21] border border-[#2a2e36] rounded-xl p-6">

            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">

              {getUserStatus(selectedUser) === "Active" ? (
                <Ban size={22} className="text-orange-400" />
              ) : (
                <CheckCircle size={22} className="text-emerald-400" />
              )}

            </div>

            <h2 className="text-lg font-semibold text-white">
              {getUserStatus(selectedUser) === "Active"
                ? "Block User"
                : "Unblock User"}
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">

              Are you sure you want to{" "}

              <span className="text-white font-medium">
                {getUserStatus(selectedUser) === "Active"
                  ? "block"
                  : "unblock"}
              </span>{" "}

              <span className="text-white font-medium">
                {selectedUser.fullName}
              </span>
              ?

              {getUserStatus(selectedUser) === "Active" && (
                <>
                  <br />
                  This user will no longer be able to access
                  their account.
                </>
              )}

            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#292e37] text-sm text-gray-300 hover:bg-[#333842]"
              >
                Cancel
              </button>

              <button
                onClick={handleBlock}
                className={`px-5 py-2 rounded-lg text-sm font-medium text-white ${
                  getUserStatus(selectedUser) === "Active"
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-emerald-500 hover:bg-emerald-600"
                }`}
              >
                {getUserStatus(selectedUser) === "Active"
                  ? "Block User"
                  : "Unblock User"}
              </button>

            </div>

          </div>

        </div>

      )} */}

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