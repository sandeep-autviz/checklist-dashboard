import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useParams } from "react-router-dom";
import { base_Url } from "../api";

export default function ConfigMissions() {
  const [missionData, setMissionData] = useState([]);
  const token = localStorage.getItem("authtoken");
  const { catId } = useParams();
  console.log(catId, "param");
  async function getCatMission() {
    try {
      const res = await axios.get(
        `${base_Url}/data/missions/?mission_type=${10}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(res.data.data.result);

      setMissionData(res.data.data.result);
    } catch (error) {

      console.log(error);
    }
  }
  useEffect(() => {
    getCatMission();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell align="right">Subtask count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {missionData.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th"  scope="row">
                  {row.name}
                </TableCell>             
                <TableCell align="right">{row.tasks.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
