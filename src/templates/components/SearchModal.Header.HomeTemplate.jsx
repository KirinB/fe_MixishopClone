import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";

const SearchModalHeaderHomeTemplate = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`${pathDefault.search}?q=${search.trim()}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Search Box */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white p-6 shadow-lg w-full flex justify-center">
        <form className="relative w-1/2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-full border border-gray-300 rounded-full p-4 focus:outline-none relative"
            autoFocus
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black rounded-full h-10 w-10 flex items-center justify-center hover:bg-black/80 transition-all duration-300"
            type="submit"
          >
            <FiSearch className="text-white" size={20} />
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchModalHeaderHomeTemplate;
