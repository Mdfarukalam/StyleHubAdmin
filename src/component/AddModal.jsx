
import { useState , useEffect} from "react";
import Modal from "react-modal";
import { productFields } from "../config/productFields.js";
import useMutationApi from "../service/hooks/useMutationApi.js";
import API from "../ApiEndPoint/ApiUrl.js";
import toastService from "./toastService.jsx";
Modal.setAppElement("#root");

function AddModal({   category = "men",
  mode = "add",
  product = null,  isOpen,
  onClose, }) {
  const config = productFields[category];

 if (!config) return null;
 const [imagePreview, setImagePreview] = useState("");
const [isUploading, setIsUploading] = useState(false);
const initialData = Object.fromEntries(
  config.fields.map((field) => [
    field.name,
    field.name === "category"
      ? field.options?.[0] || ""
      : field.type === "checkbox"
      ? false
      : field.name === "stock" || field.name === "rating"
      ? 0
      : "",
  ])
);

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const productEndpoints = {
  men: {
    add: API.menadd,
    update: API.menedit,
  },
  women: {
    add: API.women.add,
    update: API.women.edit,
  },
  kids: {
    add: API.kidsadd,
    update: API.kidsedit,
  },
  arrivals: {
    add: API.arrivals.add,
    update: API.arrivals.edit,
  },
  topProducts: {
    add: API.topProducts.add,
    update: API.topProducts.edit,
  },
};
const endpoint = productEndpoints[category];

if (!endpoint) {
  console.error("Invalid category:", category);
  return null;
}
const { mutate: addProduct, isPending: isAdding } = useMutationApi(
  "POST",
  productEndpoints[category].add,
  [category]
);

const { mutate: updateProduct, isPending: isUpdating } = useMutationApi(
  "PUT",
  productEndpoints[category].update,
  [category]
);

const handleSubmit = (e) => {
  e.preventDefault();

  const productData = {};

  config.fields.forEach((field) => {
    const value = formData[field.name];

    if (field.type === "number") {
      productData[field.name] = Number(value);
    } else if (field.type === "array") {
      productData[field.name] = value
        ? value.split(",").map((item) => item.trim()).filter(Boolean)
        : [];
    } else {
      productData[field.name] = value;
    }
  });

  if (mode === "edit") {
  updateProduct(
    { ...productData, id: product._id },
    {
      onSuccess: () => {
        toastService.success(`${config.title} updated successfully`);
        onClose();
      },
      onError: (error) => toastService.error(error.message),
    }
  );
} else {
    addProduct(productData, {
      onSuccess: () => {
        toastService.success(`${config.title} added successfully`);
   onClose();
      },
      onError: (error) => toastService.error(error.message),
    });
  }
};

 


const handleImageUpload = async (e, fieldName) => {
  const file = e.target.files[0];

  if (!file) return;

  // File type validation
  if (!file.type.startsWith("image/")) {
    toastService.error("Please select a valid image");
    return;
  }

  // 5 MB validation
  if (file.size > 5 * 1024 * 1024) {
    toastService.error("Image size must be less than 5 MB");
    return;
  }

  const uploadData = new FormData();
  uploadData.append("image", file);

  try {
    setIsUploading(true);

    const response = await fetch(
      "https://stylehub-backend-3-pgrs.onrender.com/api/admin/upload",
      {
        method: "POST",
        body: uploadData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Image upload failed");
    }

    // Cloudinary URL automatically save
    setFormData((prev) => ({
      ...prev,
      [fieldName]: data.imageUrl,
    }));

    // Preview show
    setImagePreview(data.imageUrl);

    toastService.success("Image uploaded successfully");

  } catch (error) {
    toastService.error(error.message);
  } finally {
    setIsUploading(false);
    e.target.value = "";
  }
};


useEffect(() => {
  if (mode === "edit" && product) {
    const editData = { ...initialData };

    config.fields.forEach((field) => {
      const value = product[field.name];

      if (field.type === "array") {
        editData[field.name] = Array.isArray(value)
          ? value.join(", ")
          : value || "";
      } else if (field.type === "checkbox") {
        editData[field.name] = Boolean(value);
      } else {
        editData[field.name] = value ?? editData[field.name];
      }
    });

    setFormData(editData);
  } else {
    setFormData(initialData);
  }
}, [mode, product, category]);


console.log(product,"productproduct")
  const inputClass =
    "w-full border border-[#343a46] bg-[#1e222b] text-white p-3 rounded-lg outline-none focus:border-pink-500";

  if (!config) return null;

  return (
    <>
     

  <Modal
  isOpen={isOpen}
  onRequestClose={onClose}
  shouldCloseOnOverlayClick
  shouldCloseOnEsc
  className="bg-[#151821] border border-[#292e3a] w-[calc(100%-32px)] max-w-[800px] max-h-[90vh] overflow-y-auto p-8 rounded-xl outline-none"
  overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
>
        <button
    type="button"
    onClick={onClose}
    className="float-right text-xl text-gray-400"
  >
    ✕
  </button>

         <h2 className="text-2xl font-bold text-center text-white mb-6">
    {mode === "edit" ? "Edit" : "Add"} {config.title}
  </h2>

         <form onSubmit={handleSubmit}>
  <div className="grid grid-cols-2 gap-4">
    {config.fields.map((field) => (
      <div
        key={field.name}
        className={["textarea", "checkbox", "image"].includes(field.type)
          ? "col-span-2"
          : ""}
      >
        {field.type === "image" ? (
          <div>
            <label className="text-white block mb-2">
              {field.label}
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, field.name)}
              className={inputClass}
            />

            {isUploading && (
              <p className="text-pink-400 text-sm mt-2">
                Uploading image...
              </p>
            )}

            {(imagePreview || formData[field.name]) && (
              <img
                src={imagePreview || formData[field.name]}
                alt="Product Preview"
                className="w-32 h-32 object-cover rounded-lg mt-3 border border-gray-600"
              />
            )}
          </div>
        ) : field.type === "select" ? (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            className={`${inputClass} mb-0`}
          >
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.type === "textarea" ? (
          <textarea
            name={field.name}
            placeholder={field.label}
            value={formData[field.name]}
            onChange={handleChange}
            className={inputClass}
          />
        ) : field.type === "checkbox" ? (
          <label className="flex items-center gap-3 text-white">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name]}
              onChange={handleChange}
            />
            {field.label}
          </label>
        ) : (
          <input
            type={field.type}
            name={field.name}
            placeholder={field.label}
            value={formData[field.name]}
            onChange={handleChange}
            required={field.required}
            className={inputClass}
          />
        )}
      </div>
    ))}
  </div>

  <button
    type="submit"
    disabled={isAdding || isUpdating || isUploading}
    className="w-full mt-5 bg-pink-500 text-white p-3 rounded-lg font-semibold"
  >
    {isUploading
      ? "Uploading Image..."
      : isAdding || isUpdating
      ? "Please wait..."
      : mode === "edit"
      ? "Update Product"
      : "Add Product"}
  </button>
</form>
      </Modal>
    </>
  );
}

export default AddModal;
