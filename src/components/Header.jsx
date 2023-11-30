import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import React from "react";
import { base_Url } from "../api";
import { Search } from "lucide-react";

export default function Header({
  title,
  buttonTitle,
  setSearch,
  onClick,
  cat,
  setCatId,
  mData,
  setMData,
}) {
  // http://127.0.0.1:8000/data/missions/?mission_type=10
  const token = localStorage.getItem("authtoken");
  async function filterBasedOnCatagory(id) {
    try {
      const res = await axios.get(
        `${base_Url}/data/missions/?mission_type=${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(res.data.data.result, "filtered data");
      setMData(res.data.data.result);
    } catch (error) {}
  }
  return (
    <header className="inner-head-bg bg-stone-200 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative top-input">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search..." 
              className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200">
            <Search />
            </button>
            
          </div>
          {/* <select className="bg-gray-700 text-white rounded-md py-1 px-3 focus:outline-none focus:ring">
            <option value="filter1">Filter 1</option>
            <option value="filter2">Filter 2</option>
          </select> */}
          {title === "Mission" ? (
            <Autocomplete className="bg-white"
              disablePortal
              id="combo-box-demo"
              getOptionLabel={(option) => option.mission_type}
              onChange={(a, b) => {
                console.log(b.id, " iam a option");
                // const filteredData = mData.filter(
                //   (item) => item.mission_type === b.id
                // );
                filterBasedOnCatagory(b.id);
                // setCatId(b.id);
                // console.log(filteredData, "filtered data");
                // setMData(filteredData);
              }}
              options={cat}
              sx={{ width: 220 }}
              renderInput={(params) => (
                <TextField {...params} label="Categories" />
              )}
            />
          ) : (
            <></>
          )}
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
