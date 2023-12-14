import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { base_Url } from "../api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlusCircle, Trash2 } from "lucide-react";
//import * as React from 'react';


import Button from '@mui/material/Button';

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


export default function Task() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mData, setMData] = useState([]);
  //const [open, setOpen] = React.useState(false);
  const [catId, setCatId] = useState(null);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");
  //const handleClose = () => setOpen(false);

 // const [open2, setOpen2] = React.useState(false);
  
  useEffect(() => {
    getMissionD(token);
    getCat();
  }, []);

  async function getMissionD(token) {
    try {
      const res = await axios.get(`${base_Url}data/missions/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(res.data.data.result, "userData");
      setMData(res.data.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  async function getCat() {
    try {
      const res = await axios.get(`${base_Url}/data/mission-type-dropdown/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      console.log(res.data.data.mission_type_list);
      setCat(res.data.data.mission_type_list);
    } catch (error) {
      console.log(error);
    }
  }
  function onAddMissionClick() {
    navigate("/addMission");
  }
  async function handleDelete(id) {
    try {
      await axios.delete(`${base_Url}/data/missions/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      toast.success("Deleted succesfully");
    } catch (error) {
      console.log(error);
    }
    const data = mData.filter((item) => item.id != id);
    setMData(data);
  }
  const [task, setTask] = useState("");

  //const navigate = useNavigate();
  //const { userId } = useParams();
  //console.log(userId, "parm id");
  //const token = localStorage.getItem("authtoken");
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      console.log("Adding subtask:", task);
      handleClose();
      const res = await axios.post(
        `${base_Url}data/mission-tasks/`,
        { name: task, mission: userId },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      toast.success("Subtask added successfully");
      //navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
    setTask("");
  };
  return (
    <>
      <Header
        title="Mission"
        buttonTitle="Mission"
        cat={cat}
        setCatId={setCatId}
        mission={true}
       // onClick={handleOpen2}
        mData={mData}
        setMData={setMData}
      />
      <TableContainer className="" component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          // className="mt-5"
          className="head-padding"
        >
          <TableHead style={{ background: "#C8D9ED" }}>
            <TableRow>
              <TableCell align="left">
                <b>Mission Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Total Tasks</b>
              </TableCell>
              <TableCell style={{ paddingRight: "60px" }} align="right">
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  onClick={() => navigate(`/tasks-view/${row.id}`)}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.tasks.length}</TableCell>
                <TableCell align="right">
                  <button
                    style={{}}
                    onClick={
                      //navigate(`/addSubtask/${row.id}`);
                      handleOpen
                    }
                    className="inner-head-bg  hover:bg-blue-200 text-white font-bold mx-3 py-2 px-4 rounded"
                  >
                    <PlusCircle size={18} />
                  </button>
                  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        {/* <div className="bg-white  add-subtask shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-xl font-semibold mb-4"
            htmlFor="taskInput"
          >
            Add Subtask
          </label>
          <input
            className="shadow 
            appearance-none
             border 
            rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="taskInput"
            type="text"
            placeholder="Enter subtask..."
            value={task}
            onChange={handleChange}
          />
        </div>
        <div className="submit-btn">
          <button
            className="inner-head-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      {/* </div> */}
        </Box>
      </Modal>
                  <button
                    className="inner-head-bg  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </>
  );
}
