
import { Plus } from "lucide-react";

function AddProductButton({ onClick, title = "Add Product" }) {
  return (
    <button
      onClick={onClick}
      className="h-[42px] px-4 bg-pink-500 hover:bg-pink-600 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-white transition"
    >
      <Plus size={18} />
      {title}
    </button>
  );
}

export default AddProductButton;
