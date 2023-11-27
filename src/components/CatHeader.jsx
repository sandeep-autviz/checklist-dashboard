import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import React from "react";
import { base_Url } from "../api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CatHeader = ({ setActiveTab, activeTab }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [catValue, setCatValue] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    const res = localStorage.getItem("authtoken");
    setToken(res);
  }, []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  async function saveCat(token) {
    console.log("run");
    try {
      const fData = new FormData();
      // const data = {};

      fData.append("mission_type", catValue);
      console.log(fData, "fdata");
      const res = await axios.post(`${base_Url}data/mission-type/`, fData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      toast.success("Category added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log("cat ", catValue);
  return (
    <div className="bg-gray-200 p-4">
      <div>
        <button
          onClick={handleOpen}
          className={`${"bg-blue-500 text-white"} px-4 py-2 rounded-md`}
        >
          Add Category
        </button>
      </div>
      <div className="flex justify-center">
        <button
          className={`${
            activeTab === "active"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => handleTabClick("active")}
        >
          Active
        </button>

        <button
          className={`${
            activeTab === "inactive"
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-700"
          } px-4 py-2 rounded-r-md`}
          onClick={() => handleTabClick("inactive")}
        >
          Inactive
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Category
          </Typography>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="taskName"
          >
            Category Name:
          </label>
          <input
            onChange={(e) => setCatValue(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            type="text"
            name="taskName"
            // value={taskData.taskName}
            // onChange={handleInputChange}
            placeholder="Enter Task Name"
          />
          <input
            // onChange={(e) => setCatValue(e.target.value)}
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
            type="file"
            name="taskName"
            // value={taskData.taskName}
            // onChange={handleInputChange}
            placeholder="Enter Task Name"
          />
          <button
            onClick={() => saveCat(token)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CatHeader;
