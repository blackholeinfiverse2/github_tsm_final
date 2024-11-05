// src/components/Task.tsx
import { useEffect, useState } from "react";
import { useWeb3Context } from "../context/Web3Context";

const Task = () => {
  const { fetchAdditionalContractInfo, completedTaskIds } = useWeb3Context();
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Fetch tasks from the blockchain
  useEffect(() => {
    const getTasks = async () => {
      const contractData = await fetchAdditionalContractInfo();
      if (contractData) {
        const { taskNames, taskStartTimes, taskEndTime, totalTasks } = contractData;
  
        const fetchedTasks = Array.from({ length: Number(totalTasks) }, (_, index) => {
          const taskId = 1000 + index; // Calculate the actual task ID
          return {
            id: taskId,
            name: taskNames[index],
            startTime: taskStartTimes[index],
            endTime: taskEndTime,
            status: completedTaskIds.has(taskId) ? "Completed" : "Pending", // Check with taskId
          };
        });
  
        setTasks(fetchedTasks);
      }
    };
  
    getTasks();
  }, [fetchAdditionalContractInfo, completedTaskIds]);
  

  // Filter tasks based on selected status
  const filteredTasks =
    selectedStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === selectedStatus);

  return (
    <div className="task-list-container bg-gray-50 min-h-screen flex flex-col justify-start items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl p-4 w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Tasks
          </h1>
          
        </div>
        <div className="flex flex-wrap justify-center mb-4 space-x-2">
          {/* Filter Buttons */}
          <button
            className={`px-4 py-2 rounded-md text-white ${
              selectedStatus === "All" ? "bg-indigo-600" : "bg-gray-400"
            }`}
            onClick={() => setSelectedStatus("All")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              selectedStatus === "Completed" ? "bg-indigo-600" : "bg-gray-400"
            }`}
            onClick={() => setSelectedStatus("Completed")}
          >
            Completed
          </button>
          <button
            className={`px-4 py-2 rounded-md text-white ${
              selectedStatus === "Pending" ? "bg-indigo-600" : "bg-gray-400"
            }`}
            onClick={() => setSelectedStatus("Pending")}
          >
            Pending
          </button>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-lg divide-y divide-gray-200">
          {filteredTasks.length > 0 ? (
            [...filteredTasks].reverse().map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 cursor-default"
              >
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-medium text-gray-900">
                    ID: {task.id}
                  </p>
                  <p className="text-lg font-medium text-gray-900">{task.name}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-md text-sm ${
                    task.status === "Completed"
                      ? "bg-green-200 text-green-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center">No tasks available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
