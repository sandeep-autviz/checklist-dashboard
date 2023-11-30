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
export default function Task() {
  const [mData, setMData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [catId, setCatId] = useState(null);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("authtoken");
  const handleClose = () => setOpen(false);
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

  return (
    <>
      <Header
        title="Mission"
        buttonTitle="Mission"
        cat={cat}
        setCatId={setCatId}
        mission={true}
        onClick={onAddMissionClick}
        mData={mData}
        setMData={setMData}
      />
      <TableContainer className="table-striped" component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mission Name</TableCell>
              <TableCell align="right">Total Tasks</TableCell>
              <TableCell align="right">Action</TableCell>
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
                <TableCell align="right">{row.tasks.length}</TableCell>
                <TableCell align="right">
                  <button
                    onClick={(e) => {
                      navigate(`/addSubtask/${row.id}`);
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-3 py-2 px-4 rounded"
                  >
                    <PlusCircle />
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(row.id)}
                  >
                    <Trash2 />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a task
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <input
                onChange={(e) => setCatValue(e.target.value)}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
                type="text"
                name="taskName"
                // value={taskData.taskName}
                // onChange={handleInputChange}
                placeholder="Enter Task Name"
              />
            </Typography>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add{" "}
            </button>
          </Box>
        </Modal>
      </div>
    </>
  );
}
