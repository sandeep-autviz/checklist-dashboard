import React from "react";

export default function Header({ title, buttonTitle, setSearch, onClick }) {
  return (
    <header className="bg-stone-200 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
              Search
            </button>
          </div>
          <select className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring">
            <option value="filter1">Filter 1</option>
            <option value="filter2">Filter 2</option>
          </select>
          <button
            onClick={onClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Add {buttonTitle}
          </button>
        </div>
      </div>
    </header>
  );
}
