import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function Search({ searchItem, setSearchItem }) {
  return (
    <div className="relative flex items-center w-full max-w-md">
      <span className="absolute left-3 text-gray-400 bg-red-">
        <FiSearch size={18} />
      </span>
      <input
        type="text"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        placeholder="Search food, categories, users..."
        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-all"
      />
    </div>
  );
}