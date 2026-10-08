
import React, { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Ban,
  CheckCircle,
  Users,
  MoreHorizontal,
  X,
} from "lucide-react";

const User = () => {
  const [search, setSearch] = useState("");

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Selected user
  const [selectedUser, setSelectedUser] = useState(null);

  // Users
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Kumar",
      email: "rahul@gmail.com",
      phone: "+91 98765 43210",
      status: "Active",
      joined: "12 Sep 2026",
    },
    {
      id: 2,
      name: "Aman Singh",
      email: "aman@gmail.com",
      phone: "+91 98765 43211",
      status: "Active",
      joined: "15 Sep 2026",
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "+91 98765 43212",
      status: "Blocked",
      joined: "18 Sep 2026",
    },
    {
      id: 4,
      name: "Neha Verma",
      email: "neha@gmail.com",
      phone: "+91 98765 43213",
      status: "Active",
      joined: "20 Sep 2026",
    },
  ]);

  // Edit form
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Search
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Open Edit Modal
  const openEditModal = (user) => {
    setSelectedUser(user);

    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });

    setShowEditModal(true);
  };

  // Save Edit
  const handleEdit = () => {
    if (!form.name || !form.email || !form.phone) {
      return;
    }

    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              name: form.name,
              email: form.email,
              phone: form.phone,
            }
          : user
      )
    );

    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Open Block Modal
  const openBlockModal = (user) => {
    setSelectedUser(user);
    setShowBlockModal(true);
  };

  // Block / Unblock
  const handleBlock = () => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? {
              ...user,
              status:
                user.status === "Active"
                  ? "Blocked"
                  : "Active",
            }
          : user
      )
    );

    setShowBlockModal(false);
    setSelectedUser(null);
  };

  // Open Delete Modal
  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Delete User
  const handleDelete = () => {
    setUsers(
      users.filter(
        (user) => user.id !== selectedUser.id
      )
    );

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
            className="
              w-full
              h-[42px]
              pl-10
              pr-4
              bg-[#181b21]
              border border-[#2a2e36]
              rounded-lg
              text-sm
              text-gray-200
              outline-none
              placeholder:text-gray-500
              focus:border-gray-500
              transition
            "
          />

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

        {/* Total */}
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

        {/* Active */}
        <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl p-5">

          <p className="text-sm text-gray-400">
            Active Users
          </p>

          <h2 className="text-2xl font-semibold text-white mt-1">
            {users.filter((user) => user.status === "Active").length}
          </h2>

        </div>

        {/* Blocked */}
        <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl p-5">

          <p className="text-sm text-gray-400">
            Blocked Users
          </p>

          <h2 className="text-2xl font-semibold text-white mt-1">
            {users.filter((user) => user.status === "Blocked").length}
          </h2>

        </div>

      </div>

      {/* Table */}
      <div className="bg-[#181b21] border border-[#2a2e36] rounded-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="bg-[#14171c] border-b border-[#2a2e36]">

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-[#252931]">

              {filteredUsers.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-[#1e2229] transition"
                >

                  {/* Customer */}
                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-[#252932] flex items-center justify-center text-sm font-semibold text-gray-300">
                        {user.name.charAt(0)}
                      </div>

                      <div>

                        <p className="text-sm font-medium text-gray-200">
                          {user.name}
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                          User #{String(user.id).padStart(4, "0")}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Contact */}
                  <td className="px-6 py-4">

                    <p className="text-sm text-gray-300">
                      {user.email}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {user.phone}
                    </p>

                  </td>

                  {/* Joined */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {user.joined}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex items-center gap-2 text-xs font-medium ${
                        user.status === "Active"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >

                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        }`}
                      />

                      {user.status}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">

                    <div className="flex justify-end items-center gap-1">

               

                      {/* Block */}
                      <button
                        title={
                          user.status === "Active"
                            ? "Block"
                            : "Unblock"
                        }
                        onClick={() => openBlockModal(user)}
                        className="
                          w-9 h-9
                          flex items-center justify-center
                          rounded-lg
                          text-gray-500
                          hover:text-orange-400
                          hover:bg-orange-500/10
                          transition
                        "
                      >
                        {user.status === "Active" ? (
                          <Ban size={17} strokeWidth={1.8} />
                        ) : (
                          <CheckCircle
                            size={17}
                            strokeWidth={1.8}
                          />
                        )}
                      </button>

                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => openDeleteModal(user)}
                        className="
                          w-9 h-9
                          flex items-center justify-center
                          rounded-lg
                          text-gray-500
                          hover:text-red-400
                          hover:bg-red-500/10
                          transition
                        "
                      >
                        <Trash2 size={17} strokeWidth={1.8} />
                      </button>

                  

                    </div>

                  </td>

                </tr>

              ))}

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

   

      {/* ================= BLOCK / UNBLOCK MODAL ================= */}

      {showBlockModal && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[420px] bg-[#181b21] border border-[#2a2e36] rounded-xl p-6">

            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
              {selectedUser?.status === "Active" ? (
                <Ban
                  size={22}
                  className="text-orange-400"
                />
              ) : (
                <CheckCircle
                  size={22}
                  className="text-emerald-400"
                />
              )}
            </div>

            <h2 className="text-lg font-semibold text-white">
              {selectedUser?.status === "Active"
                ? "Block User"
                : "Unblock User"}
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">

              Are you sure you want to{" "}

              <span className="text-white font-medium">
                {selectedUser?.status === "Active"
                  ? "block"
                  : "unblock"}
              </span>{" "}

              <span className="text-white font-medium">
                {selectedUser?.name}
              </span>
              ?

              {selectedUser?.status === "Active" && (
                <>
                  <br />
                  This user will no longer be able to access
                  their account.
                </>
              )}

            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowBlockModal(false)}
                className="
                  px-4 py-2
                  rounded-lg
                  bg-[#292e37]
                  text-sm
                  text-gray-300
                  hover:bg-[#333842]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleBlock}
                className={`
                  px-5 py-2
                  rounded-lg
                  text-sm
                  font-medium
                  text-white
                  ${
                    selectedUser?.status === "Active"
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-emerald-500 hover:bg-emerald-600"
                  }
                `}
              >
                {selectedUser?.status === "Active"
                  ? "Block User"
                  : "Unblock User"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ================= DELETE MODAL ================= */}

      {showDeleteModal && (

        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4">

          <div className="w-full max-w-[400px] bg-[#181b21] border border-[#2a2e36] rounded-xl p-6">

            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">

              <Trash2
                size={22}
                className="text-red-400"
              />

            </div>

            <h2 className="text-lg font-semibold text-white">
              Delete User
            </h2>

            <p className="text-sm text-gray-400 mt-2 leading-6">

              Are you sure you want to delete{" "}

              <span className="text-white font-medium">
                {selectedUser?.name}
              </span>
              ?

              <br />

              This action cannot be undone.

            </p>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="
                  px-4 py-2
                  rounded-lg
                  bg-[#292e37]
                  text-sm
                  text-gray-300
                  hover:bg-[#333842]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="
                  px-5 py-2
                  rounded-lg
                  bg-red-500
                  hover:bg-red-600
                  text-sm
                  font-medium
                  text-white
                "
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
