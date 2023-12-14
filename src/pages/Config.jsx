import { useState } from "react";
import CatHeader from "../components/CatHeader";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { base_Url } from "../api";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Config() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");
  const [activeCatData, setActiveCatData] = useState([]);
  const [inActiveCatData, setInActiveCatData] = useState([]);

  const [token, setToken] = useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("authtoken");
    setToken(token);
    console.log("i am token", token);
    getActiveCatData(token);
    getInActiveCatData(token);
  }, [activeTab]);

  async function getActiveCatData(token) {
    try {
      const res = await axios.get(
        `${base_Url}/data/mission-type/?is_active=True`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("res", res.data.data.result);
      setActiveCatData(res.data.data.result);
    } catch (error) {
      console.log("error", error);
    }
  }

  async function getInActiveCatData(token) {
    try {
      const res = await axios.get(
        `${base_Url}/data/mission-type/?is_active=False`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("res", res.data.data.result);
      setInActiveCatData(res.data.data.result);
    } catch (error) {
      console.log("error");
    }
  }

  async function handleSwitch(id, token, action) {
    try {
      const res = await axios.patch(
        `${base_Url}data/mission-type/${id}`,
        {
          is_active: action,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      if (action === false) {
        const data = activeCatData.filter((item) => item.id != id);
        setActiveCatData(data);
      }
      if (action === true) {
        const data = inActiveCatData.filter((item) => item.id != id);
        setInActiveCatData(data);
      }
      // navigate("/dashboard");
      toast.success("Category switched successfully");
    } catch (error) {
      console.log(error);
    }
   
  }

  function handleViewButton(id) {
    navigate(`/catmissionList/${id}`);
  }
  return (
    <>
      <div>
        <CatHeader
          title="Configuration"
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </div>
      {activeTab === "active" ? (
        <>
          <TableContainer component={Paper}>
            <Table
              className=" table head-padding"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead style={{ background: "#C8D9ED" }}>
                <TableRow>
                  <TableCell>
                    {" "}
                    <b>Name</b>{" "}
                  </TableCell>
                  <TableCell style={{ paddingRight: "100px" }} align="right">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activeCatData.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.mission_type}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => handleViewButton(row.id)}
                        title="View Missions"
                      />
                      <button
                        onClick={() => handleSwitch(row.id, token, false)}
                        className="inner-head-bg  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        {activeTab === "active" ? "Inactive" : ""}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table
              className="table-striped mt-5"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Catagories Name</b>
                  </TableCell>
                  <TableCell style={{ paddingRight: "40px" }} align="right">
                    <b>Action</b>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inActiveCatData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.mission_type}
                    </TableCell>
                    <TableCell align="right">
                      {activeTab === "active" ? (
                        <Button
                          onClick={handleViewButton}
                          title="View Mission"
                        />
                      ) : (
                        <></>
                      )}
                      <button
                        onClick={(e) => handleSwitch(row.id, token, true)}
                        className="inner-head-bg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        Active
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
