import React, { useState } from "react";
import { useWeb3Context } from "../context/Web3Context";

interface TaskButtonProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskButton: React.FC<TaskButtonProps> = ({ setOpen }) => {
  const { createTask } = useWeb3Context();
  const [taskName, setTaskName] = useState("");
  const [account, setAccount] = useState("");

  const handleCreateTask = async () => {
    if (taskName && account) {
      await createTask(taskName, account); // Pass account along with taskName
      setTaskName(""); // Reset task name after creating task
      setAccount(""); // Reset account after creating task
      setOpen(false); // Close the task creation box
    } else {
      alert("Please enter both task name and account.");
    }
  };

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
      {/* Close Button */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        aria-label="Close"
      >
        &times; {/* You can replace this with an icon if you prefer */}
      </button>
      <h2 className="text-xl font-semibold mb-4 text-center">Create Task</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="text"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        placeholder="Enter account address"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleCreateTask}
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Create Task
      </button>
    </div>
  );
};

export default TaskButton;
