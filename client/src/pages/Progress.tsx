import React, { useState } from "react";
import { useWeb3Context } from "../context/Web3Context";

const CreateTask: React.FC = () => {
  const { createTask } = useWeb3Context();
  const [taskName, setTaskName] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");

  const handleCreate = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default action
    if (taskName && employeeAddress) {
      await createTask(taskName, employeeAddress); // Call the createTask function
      console.log(`Task "${taskName}" created Successfully !`);
      // Reset form fields after submission
      setTaskName("");
      setEmployeeAddress("");
    } else {
      console.log("Please fill in all fields.");
    }
  };

  return (
    <div
      className="create-task-container 
      bg-gradient-to-r 
      from-pink-400 
      to-red-400 
      h-[calc(100vh-100px)] 
      flex flex-col justify-center items-center 
      px-4 sm:px-6 lg:px-8 
      shadow-lg 
      rounded-lg 
      backdrop-filter backdrop-blur-md 
      p-6 
      text-white"
    >
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-5xl font-extrabold text-center text-white mb-6">
          Create New Task
        </h1>
        <div className="rounded-lg shadow-lg bg-white text-black p-8 space-y-6">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter Task Name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <input
            type="text"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            placeholder="Enter Employee Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <button
            onClick={handleCreate}
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
