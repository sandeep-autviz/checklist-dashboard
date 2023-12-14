import React, { useRef, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "sonner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const AddHeader = ({ title, buttonTitle, id, onClick }) => {
  console.log("asdf", id);

  const [file, setFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleButtonClick = async () => {
    setOpen(false);
    try {
      if (!file) {
        console.log("Please select a file.");
        return;
      }

      console.log("we have a file.");
      const formData = new FormData();
      formData.append("file", file);

      // Replace 'YOUR_API_ENDPOINT' with your actual endpoint

      if (title === "Tasks") {
        const response = await axios.post("YOUR_API_ENDPOINT_TASKS", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const response = await axios.post("YOUR_API_ENDPOINT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      toast.success("File uploaded successfully");

      console.log("File uploaded successfully:", response.data);
      // Additional logic after successful upload
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error uploading file:", error);
      // Additional error handling
    }
  };

  return (
    <header className="inner-head-bg bg-stone-200 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative top-input">
            <button
              onClick={handleOpen}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Add {buttonTitle}
            </button>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  style={{ fontSize: "30px", marginLeft: "auto" }}
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Add CSV
                </Typography>
                <div className="pb-3 pt-5">
                  <input
                    // onChange={(e) => setCatValue(e.target.value)}

                    onChange={handleFileChange}
                    className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                    type="file"
                    name="taskName"
                    // value={taskData.taskName}
                    // onChange={handleInputChange}
                    placeholder="Enter Task Name"
                  />
                </div>
                <div class="submit-btn mt-3 flex gap-2">
                  <button
                    onClick={handleButtonClick}
                    className="inner-head-bg hover:bg-blue-700 text-white font-bold rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleButtonClick}
                    className="inner-head-bg hover:bg-blue-700 text-white font-bold rounded"
                  >
                    Cancel
                  </button>
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AddHeader;

{
  /* <input
              type="file"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: "none" }}
            /> */
}
{
  /* Button to trigger file selection */
}
// <button
//   onClick={handleButtonClick}
//   className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
// >
//   Add {buttonTitle}
// </button>
