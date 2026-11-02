
import { useState, useEffect, useMemo } from "react";
import Modal from "react-modal";
import { productFields } from "../config/productFields.js";
import useMutationApi from "../service/hooks/useMutationApi.js";
import API from "../ApiEndPoint/ApiUrl.js";
import toastService from "./toastService.jsx";

Modal.setAppElement("#root");

const createEmptyVariant = () => ({
  color: "",
  images: "",
  sizes: [],
});

function AddModal({
  category = "men",
  mode = "add",
  product = null,
  isOpen,
  onClose,
}) {
  const config = productFields[category];
  const fields = config?.fields || [];

  const initialData = useMemo(
    () =>
      Object.fromEntries(
        fields
          .filter((field) => field.type !== "colorVariants")
          .map((field) => [
            field.name,
            field.name === "category"
              ? field.defaultValue || field.options?.[0] || ""
              : field.type === "checkbox"
              ? false
              : field.type === "number"
              ? 0
              : "",
          ])
      ),
    [category]
  );

  const [formData, setFormData] = useState(initialData);

  const [colorVariants, setColorVariants] = useState([
    createEmptyVariant(),
  ]);

  const [sizeInputs, setSizeInputs] = useState({});

  const [isUploading, setIsUploading] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState(null);

  // API endpoints
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

  const { mutate: addProduct, isPending: isAdding } = useMutationApi(
    "POST",
    endpoint?.add,
    [category]
  );

  const { mutate: updateProduct, isPending: isUpdating } = useMutationApi(
    "PUT",
    endpoint?.update,
    [category]
  );

  const inputClass =
    "w-full border border-[#343a46] bg-[#1e222b] text-white p-3 rounded-lg outline-none focus:border-pink-500";

  // Normal form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add new color variant
  const addVariant = () => {
    setColorVariants((prev) => [
      ...prev,
      createEmptyVariant(),
    ]);
  };

  // Remove color variant
  const removeVariant = (index) => {
    setColorVariants((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setSizeInputs((prev) => {
      const updated = {};

      Object.keys(prev).forEach((key) => {
        const oldIndex = Number(key);

        if (oldIndex < index) {
          updated[oldIndex] = prev[key];
        } else if (oldIndex > index) {
          updated[oldIndex - 1] = prev[key];
        }
      });

      return updated;
    });
  };

  // Change variant field
  const handleVariantChange = (index, field, value) => {
    setColorVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? { ...variant, [field]: value }
          : variant
      )
    );
  };

  // Add multiple sizes
  const addSize = (index) => {
    const size = (sizeInputs[index] || "").trim();

    if (!size) return;

    setColorVariants((prev) =>
      prev.map((variant, i) => {
        if (i !== index) return variant;

        const alreadyExists = variant.sizes.some(
          (item) => item.toLowerCase() === size.toLowerCase()
        );

        if (alreadyExists) {
          toastService.error("Size already exists");
          return variant;
        }

        return {
          ...variant,
          sizes: [...variant.sizes, size],
        };
      })
    );

    setSizeInputs((prev) => ({
      ...prev,
      [index]: "",
    }));
  };

  // Remove size
  const removeSize = (variantIndex, size) => {
    setColorVariants((prev) =>
      prev.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              sizes: variant.sizes.filter(
                (item) => item !== size
              ),
            }
          : variant
      )
    );
  };

  // Upload single image for each color
  const handleImageUpload = async (e, variantIndex) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toastService.error("Please select a valid image");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toastService.error("Image must be less than 5 MB");
      e.target.value = "";
      return;
    }

    try {
      setIsUploading(true);
      setUploadingIndex(variantIndex);

      const uploadData = new FormData();
      uploadData.append("image", file);

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

      if (!data.imageUrl) {
        throw new Error("Image URL not received");
      }

      handleVariantChange(
        variantIndex,
        "images",
        data.imageUrl
      );

      toastService.success("Image uploaded successfully");
    } catch (error) {
      toastService.error(error.message);
    } finally {
      setIsUploading(false);
      setUploadingIndex(null);
      e.target.value = "";
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialData);
    setColorVariants([createEmptyVariant()]);
    setSizeInputs({});
  };

  // Edit mode
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && product) {
      const editData = { ...initialData };

      fields.forEach((field) => {
        if (field.type === "colorVariants") return;

        const value = product[field.name];

        if (field.type === "array") {
          editData[field.name] = Array.isArray(value)
            ? value.join(", ")
            : value || "";
        } else if (field.type === "checkbox") {
          editData[field.name] = Boolean(value);
        } else {
          editData[field.name] =
            value ?? editData[field.name];
        }
      });

      setFormData(editData);

      setColorVariants(
        product.colorVariants?.length
          ? product.colorVariants.map((variant) => ({
              color: variant.color || "",
              images: variant.images || "",
              sizes: variant.sizes || [],
            }))
          : [createEmptyVariant()]
      );

      setSizeInputs({});
    } else {
      setFormData(initialData);
      setColorVariants([createEmptyVariant()]);
      setSizeInputs({});
    }
  }, [isOpen, mode, product, category]);

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isUploading) {
      toastService.error("Please wait for image upload to finish");
      return;
    }

    // Validate variants
    if (!colorVariants.length) {
      toastService.error("Please add at least one color");
      return;
    }

    const incompleteVariant = colorVariants.find(
      (variant) =>
        !variant.color.trim() ||
        !variant.images ||
        !variant.sizes.length
    );

    if (incompleteVariant) {
      toastService.error(
        "Please add color, image and at least one size for every variant"
      );
      return;
    }

    // Check duplicate colors
    const colors = colorVariants.map((variant) =>
      variant.color.trim().toLowerCase()
    );

    if (new Set(colors).size !== colors.length) {
      toastService.error("Duplicate colors are not allowed");
      return;
    }

    // Create payload
    const productData = {};

    fields.forEach((field) => {
      if (field.type === "colorVariants") {
        productData.colorVariants = colorVariants.map(
          (variant) => ({
            color: variant.color.trim(),
            images: variant.images,
            sizes: variant.sizes,
          })
        );

        return;
      }

      const value = formData[field.name];

      if (field.type === "number") {
        productData[field.name] = Number(value);
      } else if (field.type === "array") {
        productData[field.name] = value
          ? value
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [];
      } else {
        productData[field.name] = value;
      }
    });

    // Update product
    if (mode === "edit") {
      updateProduct(
        {
          ...productData,
          id: product._id,
        },
        {
          onSuccess: () => {
            toastService.success(
              `${config.title} updated successfully`
            );

            resetForm();
            onClose();
          },
          onError: (error) => {
            toastService.error(error.message);
          },
        }
      );
    } else {
      // Add product
      addProduct(productData, {
        onSuccess: () => {
          toastService.success(
            `${config.title} added successfully`
          );

          resetForm();
          onClose();
        },
        onError: (error) => {
          toastService.error(error.message);
        },
      });
    }
  };

  if (!config || !endpoint) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        resetForm();
        onClose();
      }}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      className="bg-[#151821] border border-[#292e3a] w-[calc(100%-32px)] max-w-[800px] max-h-[90vh] overflow-y-auto p-8 rounded-xl outline-none"
      overlayClassName="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
    >
      <button
        type="button"
        onClick={() => {
          resetForm();
          onClose();
        }}
        className="float-right text-xl text-gray-400"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold text-center text-white mb-6">
        {mode === "edit" ? "Edit" : "Add"} {config.title}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">

          {fields.map((field) => (
            <div
              key={field.name}
              className={
                [
                  "textarea",
                  "checkbox",
                  "colorVariants",
                ].includes(field.type)
                  ? "col-span-2"
                  : ""
              }
            >
              {/* Color Variants */}
              {field.type === "colorVariants" ? (
                <div className="col-span-2">

                  <div className="flex justify-between items-center mb-4">
                    <label className="text-white font-semibold">
                      {field.label}
                    </label>

                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                    >
                      + Add More
                    </button>
                  </div>

                  <div className="space-y-5">
                    {colorVariants.map((variant, index) => (
                      <div
                        key={index}
                        className="border border-[#343a46] bg-[#1e222b] rounded-lg p-4"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-white font-semibold">
                            Variant {index + 1}
                          </h3>

                          {colorVariants.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVariant(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Remove ✕
                            </button>
                          )}
                        </div>

                        {/* Color */}
                        <label className="text-white block mb-2">
                          Color
                        </label>

                        <input
                          type="text"
                          value={variant.color}
                          onChange={(e) =>
                            handleVariantChange(
                              index,
                              "color",
                              e.target.value
                            )
                          }
                          placeholder="Enter color (Black, Blue...)"
                          className={inputClass}
                          required
                        />

                        {/* Single Image */}
                        <label className="text-white block mt-4 mb-2">
                          Upload Image
                        </label>

                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, index)
                          }
                          className={inputClass}
                          disabled={isUploading}
                        />

                        {isUploading && uploadingIndex === index && (
                          <p className="text-pink-400 text-sm mt-2">
                            Uploading image...
                          </p>
                        )}

                        {variant.images && (
                          <div className="relative mt-3 w-24">
                            <img
                              src={variant.images}
                              alt={variant.color || "Product"}
                              className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                handleVariantChange(
                                  index,
                                  "images",
                                  ""
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
                            >
                              ✕
                            </button>
                          </div>
                        )}

                        {/* Multiple Sizes */}
                        <label className="text-white block mt-4 mb-2">
                          Sizes
                        </label>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={sizeInputs[index] || ""}
                            onChange={(e) =>
                              setSizeInputs((prev) => ({
                                ...prev,
                                [index]: e.target.value,
                              }))
                            }
                            placeholder="Enter size (S, M, L, XL)"
                            className={inputClass}
                          />

                          <button
                            type="button"
                            onClick={() => addSize(index)}
                            disabled={!(sizeInputs[index] || "").trim()}
                            className="bg-pink-500 text-white px-4 rounded-lg whitespace-nowrap disabled:opacity-50"
                          >
                            + Add Size
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {variant.sizes.map((size) => (
                            <span
                              key={size}
                              className="bg-[#343a46] text-white px-3 py-2 rounded-lg"
                            >
                              {size}

                              <button
                                type="button"
                                onClick={() =>
                                  removeSize(index, size)
                                }
                                className="ml-3 text-red-400"
                              >
                                ✕
                              </button>
                            </span>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              ) : field.type === "select" ? (
                <>
                  <label className="text-white block mb-2">
                    {field.label}
                  </label>

                  <select
                    name={field.name}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>

              ) : field.type === "textarea" ? (
                <>
                  <label className="text-white block mb-2">
                    {field.label}
                  </label>

                  <textarea
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    className={inputClass}
                    required={field.required}
                  />
                </>

              ) : field.type === "checkbox" ? (
                <label className="flex items-center gap-3 text-white">
                  <input
                    type="checkbox"
                    name={field.name}
                    checked={Boolean(formData[field.name])}
                    onChange={handleChange}
                  />
                  {field.label}
                </label>

              ) : (
                <>
                  <label className="text-white block mb-2">
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name] ?? ""}
                    onChange={handleChange}
                    required={field.required}
                    className={inputClass}
                  />
                </>
              )}
            </div>
          ))}

        </div>

        <button
          type="submit"
          disabled={isAdding || isUpdating || isUploading}
          className="w-full mt-5 bg-pink-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
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
  );
}

export default AddModal;
