import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaImage, FaPlus } from "react-icons/fa";

const CATEGORY_OPTIONS = [
  "Burger",
  "Pizza",
  "Taco & Burrito",
  "Pastry",
  "Drink",
  "Dessert",
  "Other",
];

const AVAILABILITY_OPTIONS = ["In Stock", "Out of Stock"];

const emptyForm = {
  title: "",
  price: "",
  category: CATEGORY_OPTIONS[0],
  imgUrl: "",
  description: "",
  stock: "",
  discount: "",
  availability: AVAILABILITY_OPTIONS[0],
  tags: "",
};

const AddFood = ({ setProductData }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
    if (field === "imgUrl") setPreview(value);
    setSuccess(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);
      setForm((prev) => ({ ...prev, imgUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
    setSuccess(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Food name is required.";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price greater than 0.";
    if (!form.imgUrl) newErrors.imgUrl = "Add an image URL or upload a photo.";
    if (form.stock !== "" && Number(form.stock) < 0)
      newErrors.stock = "Stock can't be negative.";
    if (
      form.discount !== "" &&
      (Number(form.discount) < 0 || Number(form.discount) > 100)
    )
      newErrors.discount = "Discount must be between 0 and 100.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      setSuccess(false);
      return;
    }

    const newFood = {
      id: Date.now(),
      title: form.title.trim(),
      Price: Number(form.price).toFixed(2) * 1,
      category: form.category,
      description: form.description.trim(),
      img: form.imgUrl,
      stock: form.stock === "" ? 0 : Number(form.stock),
      discount: form.discount === "" ? 0 : Number(form.discount),
      availability: form.availability,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    setProductData((prev) => [newFood, ...prev]);
    setSuccess(true);
    setForm(emptyForm);
    setPreview("");
    setErrors({});
  };

  const handleReset = () => {
    setForm(emptyForm);
    setPreview("");
    setErrors({});
    setSuccess(false);
  };

  const priceNum = Number(form.price) || 0;
  const discountNum = Number(form.discount) || 0;
  const discountedPrice = discountNum > 0
    ? (priceNum - (priceNum * discountNum) / 100).toFixed(2)
    : null;
  const tagList = form.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const isOutOfStock = form.availability === "Out of Stock";

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6 items-start">
      <div className="bg-white rounded-2xl shadow p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Add New Food</h1>
            <p className="text-sm text-gray-400">
              Fill in the details below to add a new item to the menu.
            </p>
          </div>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-gray-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            &larr; Back to Dashboard
          </button>
        </div>

        {success && (
          <div className="mb-6 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3">
            Food item added successfully! It now appears on the Dashboard.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8">
          {/* Image preview / upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[200px] h-[200px] rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img
                  src={preview}
                  alt="Food preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 text-sm gap-2">
                  <FaImage className="text-3xl" />
                  <span>No image yet</span>
                </div>
              )}
            </div>

            <label className="w-full text-center text-sm bg-gray-100 hover:bg-gray-200 transition-colors rounded-md py-2 cursor-pointer">
              Upload photo
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <div className="w-full">
              <input
                type="text"
                placeholder="or paste an image URL"
                value={form.imgUrl.startsWith("data:") ? "" : form.imgUrl}
                onChange={handleChange("imgUrl")}
                className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-400"
              />
              {errors.imgUrl && (
                <p className="text-red-500 text-xs mt-1">{errors.imgUrl}</p>
              )}
            </div>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Food Name
              </label>
              <input
                type="text"
                placeholder="e.g. Crispy Chicken Burger"
                value={form.title}
                onChange={handleChange("title")}
                className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="e.g. 5.99"
                  value={form.price}
                  onChange={handleChange("price")}
                  className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm outline-none placeholder:text-gray-400"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={handleChange("category")}
                  className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm outline-none"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Description{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                placeholder="Short description of the dish..."
                value={form.description}
                onChange={handleChange("description")}
                rows={4}
                className="w-full bg-gray-100 rounded-md px-4 py-2.5 text-sm outline-none placeholder:text-gray-400 resize-none"
              />
            </div>

            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <FaPlus className="text-xs" /> Add Food
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 text-sm font-semibold transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Live preview card */}
      <div className="lg:sticky lg:top-6">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
          Live Preview
        </p>
        <div className="w-full max-w-[260px] mx-auto lg:mx-0 shadow rounded-[10px] bg-white overflow-hidden">
          <div className="relative w-full h-[170px] bg-gray-100">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                <FaImage className="text-3xl" />
                <span className="text-xs">Image preview</span>
              </div>
            )}

            <span className="absolute top-2 left-2 bg-white/90 text-[11px] font-medium px-2 py-0.5 rounded-full text-gray-700">
              {form.category}
            </span>
            
          </div>

          <div className="p-3 text-center">
            <p className="font-bold text-[16px] truncate">
              {form.title || "Food name"}
            </p>

            {discountedPrice ? (
              <p className="font-bold text-xl">
                <span className="text-red-600">${discountedPrice}</span>{" "}
                <span className="text-gray-400 text-sm line-through">
                  ${priceNum.toFixed(2)}
                </span>
              </p>
            ) : (
              <p className="font-bold text-xl text-red-600">
                ${priceNum.toFixed(2)}
              </p>
            )}

            {form.stock !== "" && (
              <p className="text-xs text-gray-400 mt-0.5">
                {form.stock} in stock
              </p>
            )}

            {tagList.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {tagList.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {form.description && (
              <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                {form.description}
              </p>
            )}

            <button
              type="button"
              disabled
              className="w-[85%] h-[36px] flex items-center justify-center gap-1 rounded-[10px] mt-3 mx-auto bg-yellow-400 text-sm font-medium cursor-default"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddFood;