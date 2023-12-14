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
import { Trash2 } from "lucide-react";
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

  async function deleteUser(id) {
    try {
      await axios.delete(`${base_Url}account/users/${id}/`, {
        headers: {
          Authorization: `Token caff76fc134cbad91726812cbc04dd040b9bf62e`,
        },
      });

      // Filter out the deleted user from userData and update the state
      const updatedUserData = userData.filter((user) => user.id !== id);
      setUserData(updatedUserData);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(search);
  return (
    <>
      <Header
        // search={search}
        setSearch={setSearch}
        buttonTitle="User"
        title="Users"
      />
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          aria-label="simple table"
          className="head-padding"
        >
          <TableHead style={{ background: "#C8D9ED" }}>
            <TableRow>
              <TableCell>
                <b>First Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Last Name</b>
              </TableCell>
              <TableCell align="left">
                <b>Username</b>
              </TableCell>
              <TableCell align="left">
                <b>Email</b>
              </TableCell>
              <TableCell align="left">
                <b>Status</b>
              </TableCell>
              <TableCell style={{ paddingRight: "30px" }} align="right">
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData
              .filter(
                (item) =>
                  item.username.toLowerCase().includes(search.toLowerCase()) ||
                  item.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((item) => (
                <TableRow
                  // style={{ padding: "10px, 16px" }}
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.first_name}
                  </TableCell>
                  <TableCell align="left">{item.last_name}</TableCell>
                  <TableCell align="left">{item.username}</TableCell>
                  <TableCell align="left">{item.email}</TableCell>
                  <TableCell align="left">
                    {item.is_active ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell align="right">
                    <button className=" inner-head-bg  hover:bg-blue-600 text-white font-semibold  p-2 rounded"
                          onClick={() => deleteUser(item.id)}
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
