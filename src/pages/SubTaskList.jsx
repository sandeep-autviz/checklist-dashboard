import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { base_Url } from "../api";
import { useScrollTrigger } from "@mui/material";
import Button from "../components/Button";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function SubTaskList() {
  const token = localStorage.getItem("authtoken");
  const [subTaskData, setSubTaskData] = useState([]);

  const { missionId } = useParams();
  useEffect(() => {
    getSubTask();
  }, []);

  async function getSubTask() {
    try {
      const res = await axios.get(
        `${base_Url}/data/mission-tasks/?mission=${missionId}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setSubTaskData(res.data.data.result);
      console.log("rel", res.data.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subTaskData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.mission_category}</TableCell>
                <TableCell align="right">
                  <button>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
