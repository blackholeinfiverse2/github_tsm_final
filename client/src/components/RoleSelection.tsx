// RoleSelection.tsx
import { useWeb3Context } from "../context/Web3Context";
import { useNavigate } from "react-router-dom";

const RoleSelection = () => {
  const { setUserRole } = useWeb3Context();
  const navigate = useNavigate();

  const selectRole = (role: string) => {
    setUserRole(role); // Set the user role in the context
    sessionStorage.setItem("userRole", role); // Store the role in sessionStorage

    // Redirect based on the selected role
    if (role === "Admin") {
      navigate("/dashboard");
    } 
    else {
      navigate("/tasks");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center 
      h-[calc(100vh-100px)] 
      bg-gradient-to-r from-blue-400 to-green-400 p-4 md:p-8 
      shadow-2xl rounded-lg backdrop-filter backdrop-blur-lg text-gray-800">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white text-center">
        Select Your Role
      </h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          onClick={() => selectRole("Admin")}
        >
          Admin
        </button>
        <button
          className="bg-green-600 hover:bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg transform transition duration-300 ease-in-out hover:scale-105"
          onClick={() => selectRole("Employee")}
        >
          Employee
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
