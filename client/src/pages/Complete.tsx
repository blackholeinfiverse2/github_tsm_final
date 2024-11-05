import React, { useState } from "react";
import { useWeb3Context } from "../context/Web3Context";

const SubmitTask: React.FC = () => {
  const { completeTask } = useWeb3Context();
  const [taskId, setTaskId] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default action
    if (taskId && employeeAddress) {
      await completeTask(Number(taskId), employeeAddress); // Pass taskId and employeeAddress
      // You might want to add some feedback here for success/error
      // Reset the input fields after the task is completed
      setTaskId("");
      setEmployeeAddress("");
      console.log(`Task ${taskId} completed for employee ${employeeAddress}`);
    } else {
      console.log("Please fill in both fields.");
    }
  };

  return (
    <div
      className="submit-task-container 
    bg-gradient-to-br 
    from-purple-400 
    to-blue-500 
    h-[calc(100vh-100px)] 
    flex flex-col justify-center items-center 
    px-4 sm:px-6 lg:px-8 
    shadow-lg 
    rounded-lg 
    backdrop-filter backdrop-blur-md 
    p-6 
    text-white"
    >
      {" "}
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-5xl font-extrabold text-center text-white mb-6">
          Submit Completed Task
        </h1>
        <div className="rounded-lg shadow-lg bg-white text-black p-8 space-y-6">
          <input
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.target.value)}
            placeholder="Enter Task ID: eg 1001"
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
            onClick={handleSubmit}
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
          >
            Submit Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitTask;
