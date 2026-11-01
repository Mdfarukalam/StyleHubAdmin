
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function MenModel() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "T-Shirts",
    price: "",
    originalPrice: "",
    discount: "",
    description: "",
    images: "",
    colors: "",
    sizes: "",
    stock: 0,
    rating: 0,
    isActive: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discount: Number(formData.discount),
      stock: Number(formData.stock),
      rating: Number(formData.rating),
      colors: formData.colors.split(",").map((item) => item.trim()).filter(Boolean),
      sizes: formData.sizes.split(",").map((item) => item.trim()).filter(Boolean),
    };

    console.log(productData);

    // Yahan POST API integrate karenge
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const inputClass =
    "w-full border border-[#343a46] bg-[#1e222b] text-white p-3 rounded-lg mb-4 outline-none focus:border-pink-500";

  return (
    <>
      <button
        onClick={openModal}
        className="bg-pink-500 text-white px-5 py-2 rounded-lg hover:bg-pink-600 transition"
      >
        Add Men Product
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={!loading}
        shouldCloseOnEsc={!loading}
        className="bg-[#151821] border border-[#292e3a] w-[calc(100%-32px)] max-w-[800px] max-h-[90vh] overflow-y-auto p-8 rounded-xl outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="float-right text-xl text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Add Men Product
        </h2>

        <form onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4"> 
          <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} required className={inputClass} />

          <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} required className={inputClass} />

          <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
            <option value="T-Shirts">T-Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Shirts">Shirts</option>
            <option value="Jackets">Jackets</option>
          </select>

          <input type="number" name="price" placeholder="Selling Price" value={formData.price} onChange={handleChange} required className={inputClass} />

          <input type="number" name="originalPrice" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} required className={inputClass} />

          <input type="number" name="discount" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} required className={inputClass} />

          <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleChange} className={inputClass} />

          <input name="images" placeholder="Image URL" value={formData.images} onChange={handleChange} required className={inputClass} />

          <input name="colors" placeholder="Colors (Black, White, Blue)" value={formData.colors} onChange={handleChange} required className={inputClass} />

          <input name="sizes" placeholder="Sizes (S, M, L, XL)" value={formData.sizes} onChange={handleChange} required className={inputClass} />

          <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className={inputClass} />

          <input type="number" name="rating" placeholder="Rating" min="0" max="5" value={formData.rating} onChange={handleChange} className={inputClass} />

          <label className="flex items-center gap-3 text-white mb-5">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active Product
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white p-3 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-60"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default MenModel;
