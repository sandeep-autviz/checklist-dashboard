import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { base_Url } from "../api";
import { toast } from "sonner";

const TaskInput = () => {
  const [task, setTask] = useState("");

  const navigate = useNavigate();
  const { userId } = useParams();
  console.log(userId, "parm id");
  const token = localStorage.getItem("authtoken");
  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = async () => {
    try {
      console.log("Adding subtask:", task);
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
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
    setTask("");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="taskInput"
          >
            Add Subtask
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="taskInput"
            type="text"
            placeholder="Enter subtask..."
            value={task}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
