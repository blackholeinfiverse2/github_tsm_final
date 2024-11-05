// src/pages/Register.tsx
import React, { useState } from "react";
import { useWeb3Context } from "../context/Web3Context";

const Register: React.FC = () => {
  const { registerEmployee } = useWeb3Context();
  const [employeeName, setEmployeeName] = useState("");
  const [account, setAccount] = useState(""); // New state for account

  const handleRegister = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default action
    registerEmployee(account,employeeName); // Pass account along with employeeName
  };

  return (
    <div className="register-container bg-gradient-to-br from-blue-400 to-blue-100 h-[calc(100vh-100px)] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-5xl font-extrabold text-center text-white mb-6">
          Register Employee
        </h1>
        <div className="rounded-lg shadow-lg bg-white p-8 space-y-6">
          
          <input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)} // Set account input
            placeholder="Enter employee account address"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter employee name"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
