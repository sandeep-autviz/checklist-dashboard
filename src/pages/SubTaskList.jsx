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
  async function handleDelete(id) {
    console.log(id);
    try {
      axios.delete(`${base_Url}/data/mission-tasks/${id}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
    const data = subTaskData.filter((item) => item.id != id);
    setSubTaskData(data);
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
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
                  <button onClick={() => handleDelete(row.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
