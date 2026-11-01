
import React from "react";
import Modal from "react-modal";
import { Trash2 } from "lucide-react";

function DeleteModal({
  isOpen,
  setIsOpen,
  selectedUser,
  setSelectedUser,
  handleDelete,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setSelectedUser(null);
      }}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className="bg-[#181b21] w-[calc(100%-32px)] max-w-[400px] border border-[#2a2e36] rounded-xl p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
    >
      <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
        <Trash2 size={22} className="text-red-400" />
      </div>

      <h2 className="text-lg font-semibold text-white">
        Delete User
      </h2>

      <p className="text-sm text-gray-400 mt-2 leading-6">
        Are you sure you want to delete{" "}
        <span className="text-white font-medium">
          {selectedUser?.name || "this user"}
        </span>
        ?

        <br />
        This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => {
            setIsOpen(false);
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
    </Modal>
  );
}

export default DeleteModal;