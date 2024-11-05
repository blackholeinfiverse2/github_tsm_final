// Other imports remain unchanged
import React, { useEffect, useState } from "react";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import clsx from "clsx";
import { useWeb3Context } from "../context/Web3Context";

interface Task {
  task: string;
  name: string;
  status: string;
}

interface FetchAdditionalContractInfoType {
  employeeName?: string;
  tasks?: Task[];
  noOfEmployees?: number;
  totalTasks?: number;
  currentEmployee?: string;
}

interface Task {
  task: string;
  name: string;
  status: string;
}

type User = {
  name: string | null;
  role?: string | null;
  address: string | null;
  team: string | null;
};

type ContractInteractionDataType = {
  employeeId: number;
  name: string;
  totalTasks: number;
  totalTasksCompleted: number;
  taskNames: string[];
  taskStartTimes: number | number[];
  taskEndTime: number | number[];
};

const EmployeeTable: React.FC<{
  employees: User[];
  contractData: FetchAdditionalContractInfoType | undefined;
}> = ({ employees, contractData }) => {
  const TableHeader = () => (
    <thead className="border-b border-gray-300 bg-gray-50">
      <tr className="text-black text-left">
        <th className="py-3 px-4 font-semibold">Name</th>
        <th className="py-3 px-4 font-semibold">Role</th>
        <th className="py-3 px-4 font-semibold">Address</th>
        <th className="py-3 px-4 font-semibold hidden md:table-cell">Team</th>
      </tr>
    </thead>
  );

  const TableRow: React.FC<{ employee: User }> = ({ employee }) => (
    <tr className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 text-gray-700">
      <td className="py-3 px-4">
        <div className="text-base font-medium text-black">
          {employee.name || "No Name"}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-base font-medium text-black">
          {employee.role || "No Role"}
        </div>
      </td>
      <td className="py-3 px-4">
        <div className="text-base font-medium text-black">
          {employee.address || "No Address"}
        </div>
      </td>
      <td className="py-3 px-4 hidden md:table-cell">
        <span className="text-base text-gray-500">
          {employee.team || "No Team"}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="w-full md:w-3/4 bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full table-auto">
        <TableHeader />
        <tbody>
          {employees?.map((employee, id) => (
            <TableRow key={id} employee={employee} />
          ))}
          {/* Add a new row for contractData if available */}
          {contractData && (
            <tr>
              <td className="py-3 px-4">
                {contractData.employeeName || "No Employee Selected"}
              </td>
              <td className="py-3 px-4">Contract Info</td>{" "}
              {/* You can add more relevant info here */}
              <td className="py-3 px-4">
                {contractData.currentEmployee || "N/A"}
              </td>
              <td className="py-3 px-4 hidden md:table-cell">
                {contractData.noOfEmployees || 0}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ContractData: React.FC = () => {
  const { fetchAdditionalContractInfo, completedTaskIds, setEmployeeAddress } =
    useWeb3Context();

  // State to store data from fetchAdditionalContractInfo
  const [contractData, setContractData] = useState<
    ContractInteractionDataType | null | undefined
  >(null);
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdditionalContractInfo();
      setContractData(data); // Now TypeScript knows `data` is of the correct type
    };
    fetchData();
  }, [fetchAdditionalContractInfo]);

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmployeeId(value);
    setEmployeeAddress(value);
  };

  return (
    <div className="w-full bg-white p-6 shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-6 text-start">Employee Details</h2>

      {/* Employee Input */}
      <div className="mb-6">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="employeeId"
        >
          Enter Employee ID:
        </label>
        <input
          type="text"
          id="employeeId"
          value={employeeId}
          onChange={handleInputChange}
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Employee ID"
        />
      </div>

      {/* Display Task Status */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-700">Task Status:</h3>
        <ul className="text-gray-600 mt-2 space-y-2">
          <div className="task-list rounded-lg shadow-lg divide-y divide-gray-200">
            {contractData && contractData.taskNames.length > 0 ? (
              contractData.taskNames.map((task, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center px-4 py-3 ${
                    completedTaskIds.has(index + 1000)
                      ? "text-green-700"
                      : "text-yellow-600"
                  }`}
                >
                  <p className="text-lg font-medium">
                    {index + 1}. {task}
                  </p>
                  <span
                    className={`inline-flex items-center justify-center px-2 py-1 text-xs font-semibold rounded-full ${
                      completedTaskIds.has(index + 1000)
                        ? "bg-green-200 text-green-700"
                        : "bg-yellow-200 text-yellow-600"
                    }`}
                  >
                    {completedTaskIds.has(index + 1000) ? "Completed" : "Pending"}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-center text-gray-500">
                No tasks available
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { fetchAdditionalContractInfo } = useWeb3Context();
  const [contractData, setContractData] =
    useState<ContractInteractionDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAdditionalContractInfo();
      setContractData(data); // Now TypeScript knows `data` is of the correct type
    };
    fetchData();
  }, [fetchAdditionalContractInfo]);

  // Example of employee data
  const employees: User[] = [
    {
      name: "Alice Johnson",
      role: "Manager",
      address: "0x1A2b3c",
      team: "Operations",
    },
    {
      name: "Bob Smith",
      role: "Lead Developer",
      address: "0x2B3c4d",
      team: "Engineering",
    },
    {
      name: "Charlie Davis",
      role: "Frontend Developer",
      address: "0x3C4d5e",
      team: "Engineering",
    },
    {
      name: "David Martin",
      role: "Backend Developer",
      address: "0x4D5e6f",
      team: "Engineering",
    },
    {
      name: "Eve Taylor",
      role: "UI/UX Designer",
      address: "0x5E6f7g",
      team: "Design",
    },
    {
      name: "Fiona Clark",
      role: "Product Designer",
      address: "0x6F7g8h",
      team: "Design",
    },
    {
      name: "George Wilson",
      role: "Accountant",
      address: "0x7G8h9i",
      team: "Finance",
    },
    {
      name: "Hannah Lewis",
      role: "HR Manager",
      address: "0x8H9i0j",
      team: "Human Resources",
    },
    {
      name: "Isaac Brown",
      role: "DevOps Engineer",
      address: "0x9I0j1k",
      team: "Engineering",
    },
    {
      name: "Jack Thompson",
      role: "QA Engineer",
      address: "0x0J1k2l",
      team: "Quality Assurance",
    },
    {
      name: "Kara Moore",
      role: "Business Analyst",
      address: "0x1K2l3m",
      team: "Operations",
    },
    {
      name: "Liam Miller",
      role: "Marketing Specialist",
      address: "0x2L3m4n",
      team: "Marketing",
    },
  ];

  const stats = [
    {
      _id: "1",
      label: "CURRENT EMPLOYEE",
      total: contractData?.name
        ? contractData.name.length > 10
          ? `${contractData.name.slice(0, 10)}...`
          : contractData.name
        : "0",

      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "2",
      label: "TOTAL TASK",
      total: contractData?.totalTasks?.toString() || "0",
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "3",
      label: "TASK COMPLETED",
      total: contractData?.totalTasksCompleted?.toString() || "0",
      icon: <FaUsers />,
      bg: "bg-[#ca8a04]",
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-100px)] ">
      <div className="col-span-12 md:col-span-12 flex flex-row gap-4">
        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="flex flex-col gap-4">
            {stats.map((stat) => (
              <div
                key={stat._id}
                className={clsx(
                  "rounded-md p-3 text-white flex gap-3",
                  stat.bg
                )}
              >
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <p className="text-xl font-bold">{stat.total}</p>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
          <ContractData />
        </div>

        <div className="col-span-12 md:col-span-8 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold mb-4">Employees List</h2>
          {/* Only pass contractData if it's not null */}
          <EmployeeTable
            employees={employees}
            contractData={contractData || undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
