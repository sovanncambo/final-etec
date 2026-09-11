import { useMemo, useState } from "react";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaCheck,
  FaXmark,
  FaTag,
  FaMagnifyingGlass,
  FaLayerGroup,
  FaBoxOpen,
  FaCrown,
} from "react-icons/fa6";

const COLOR_PALETTE = [
  { bg: "bg-red-100", text: "text-red-600", bar: "bg-red-500" },
  { bg: "bg-orange-100", text: "text-orange-600", bar: "bg-orange-500" },
  { bg: "bg-amber-100", text: "text-amber-600", bar: "bg-amber-500" },
  { bg: "bg-green-100", text: "text-green-600", bar: "bg-green-500" },
  { bg: "bg-teal-100", text: "text-teal-600", bar: "bg-teal-500" },
  { bg: "bg-blue-100", text: "text-blue-600", bar: "bg-blue-500" },
  { bg: "bg-indigo-100", text: "text-indigo-600", bar: "bg-indigo-500" },
  { bg: "bg-purple-100", text: "text-purple-600", bar: "bg-purple-500" },
  { bg: "bg-pink-100", text: "text-pink-600", bar: "bg-pink-500" },
];

const Categories = ({ categories = [], setCategories, ProductData = [] }) => {
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [adding, setAdding] = useState(false);

  const countFor = (cat) =>
    ProductData.filter((p) => p?.category === cat).length;

  const normalizedExists = (name, ignoreIndex = -1) =>
    categories.some(
      (c, i) =>
        i !== ignoreIndex &&
        c.trim().toLowerCase() === name.trim().toLowerCase()
    );

  const stats = useMemo(() => {
    const counts = categories.map((c) => countFor(c));
    const totalItems = counts.reduce((a, b) => a + b, 0);
    const maxCount = Math.max(0, ...counts);
    const topCategory =
      maxCount > 0 ? categories[counts.indexOf(maxCount)] : null;
    return {
      totalCategories: categories.length,
      totalItems,
      maxCount,
      topCategory,
    };
  }, [categories, ProductData]);

  const filteredCategories = categories
    .map((cat, index) => ({ cat, index }))
    .filter(({ cat }) => cat.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = (e) => {
    e.preventDefault();
    const trimmed = newCategory.trim();

    if (!trimmed) {
      setError("Category name can't be empty.");
      return;
    }
    if (normalizedExists(trimmed)) {
      setError("That category already exists.");
      return;
    }

    setCategories((prev) => [...prev, trimmed]);
    setNewCategory("");
    setError("");
    setAdding(false);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingValue(categories[index]);
    setError("");
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  const saveEditing = (index) => {
    const trimmed = editingValue.trim();
    if (!trimmed) {
      setError("Category name can't be empty.");
      return;
    }
    if (normalizedExists(trimmed, index)) {
      setError("Another category already has that name.");
      return;
    }

    setCategories((prev) => prev.map((c, i) => (i === index ? trimmed : c)));
    setEditingIndex(null);
    setEditingValue("");
    setError("");
  };

  const confirmDelete = (index) => {
    setCategories((prev) => prev.filter((_, i) => i !== index));
    setDeleteTarget(null);
  };

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Categories
            </h1>
            <p className="text-sm text-gray-400">
              Organize your menu into categories customers can browse.
            </p>
          </div>
          <button
            onClick={() => {
              setAdding(true);
              setError("");
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
          >
            <FaPlus className="text-xs" /> Add Category
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <FaLayerGroup />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Categories</p>
              <p className="text-xl font-bold text-gray-800">
                {stats.totalCategories}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <FaBoxOpen />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Total Items</p>
              <p className="text-xl font-bold text-gray-800">
                {stats.totalItems}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
            <span className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center shrink-0">
              <FaCrown />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400">Most Popular</p>
              <p className="text-xl font-bold text-gray-800 truncate">
                {stats.topCategory || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white shadow rounded-md px-4 py-2.5 mb-5 max-w-sm">
          <FaMagnifyingGlass className="text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add-category tile */}
          {adding && (
            <form
              onSubmit={handleAdd}
              className="bg-white rounded-2xl shadow p-5 border-2 border-dashed border-red-200 flex flex-col gap-3"
            >
              <p className="text-sm font-medium text-gray-600">
                New category
              </p>
              <input
                autoFocus
                type="text"
                value={newCategory}
                onChange={(e) => {
                  setNewCategory(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setAdding(false);
                    setNewCategory("");
                    setError("");
                  }
                }}
                placeholder="e.g. Sandwich, Noodles, Coffee..."
                className="bg-gray-100 rounded-md px-3 py-2 text-sm outline-none placeholder:text-gray-400"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-1 px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold cursor-pointer"
                >
                  <FaCheck className="text-xs" /> Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAdding(false);
                    setNewCategory("");
                    setError("");
                  }}
                  className="px-4 py-2 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {filteredCategories.length === 0 && !adding ? (
            <div className="col-span-full text-center text-gray-400 text-sm py-14 bg-white rounded-2xl shadow">
              {categories.length === 0
                ? "No categories yet. Click \u201cAdd Category\u201d to get started."
                : "No categories match your search."}
            </div>
          ) : (
            filteredCategories.map(({ cat, index }) => {
              const color = COLOR_PALETTE[index % COLOR_PALETTE.length];
              const count = countFor(cat);
              const share =
                stats.maxCount > 0
                  ? Math.round((count / stats.maxCount) * 100)
                  : 0;

              return (
                <div
                  key={`${cat}-${index}`}
                  className="group bg-white rounded-2xl shadow hover:shadow-md transition-shadow p-5 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`w-11 h-11 rounded-full ${color.bg} ${color.text} flex items-center justify-center shrink-0 text-lg`}
                    >
                      <FaTag />
                    </span>

                    {editingIndex !== index && deleteTarget !== index && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-50 cursor-pointer transition-colors"
                          title="Rename"
                        >
                          <FaPen className="text-xs" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(index)}
                          className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-50 cursor-pointer transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    )}
                  </div>

                  {editingIndex === index ? (
                    <div className="flex flex-col gap-2">
                      <input
                        autoFocus
                        type="text"
                        value={editingValue}
                        onChange={(e) => {
                          setEditingValue(e.target.value);
                          setError("");
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEditing(index);
                          if (e.key === "Escape") cancelEditing();
                        }}
                        className="bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveEditing(index)}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-full bg-green-500 hover:bg-green-600 text-white text-xs font-semibold cursor-pointer"
                        >
                          <FaCheck className="text-xs" /> Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 text-xs font-semibold cursor-pointer"
                        >
                          <FaXmark className="text-xs" />
                        </button>
                      </div>
                    </div>
                  ) : deleteTarget === index ? (
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-gray-800 truncate">
                        {cat}
                      </p>
                      <p className="text-xs text-gray-500">
                        Delete this category?
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => confirmDelete(index)}
                          className="flex-1 py-1.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-xs font-semibold cursor-pointer"
                        >
                          Yes, delete
                        </button>
                        <button
                          onClick={() => setDeleteTarget(null)}
                          className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 text-xs font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="font-semibold text-gray-800 truncate">
                          {cat}
                        </p>
                        <p className="text-xs text-gray-400">
                          {count} item{count === 1 ? "" : "s"}
                        </p>
                      </div>

                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${color.bar} rounded-full transition-all`}
                          style={{ width: `${share}%` }}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;