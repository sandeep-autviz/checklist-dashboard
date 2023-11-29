import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Header from "../components/Header";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { base_Url } from "../api";
export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState([]);
 
  async function getUserData() {
    try {
      const res = await axios.get(`${base_Url}account/users/`, {
        headers: {
          Authorization: `Token caff76fc134cbad91726812cbc04dd040b9bf62e`,
        },
      });
      console.log(res.data.data.result, " i am a response");
      setUserData(res.data.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);
  console.log(search);
  return (
    <>
      <Header
        // search={search}
        setSearch={setSearch}
        buttonTitle="User"
        title="User Page"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .filter((item) =>
                item.username.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.first_name}
                  </TableCell>
                  <TableCell align="right">{item.last_name}</TableCell>
                  <TableCell align="right">{item.username}</TableCell>
                  <TableCell align="right">{item.email}</TableCell>
                  <TableCell align="right">
                    {item.is_active ? "active" : "false"}
                  </TableCell>
                  <TableCell align="right">
                    <button className=" bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                      <CiEdit fontSize={20} />
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
