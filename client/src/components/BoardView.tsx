import React from "react";
import TaskCard from "./TaskCard";

// Define the structure of a task
interface Task {
  id: string; // or number depending on your data structure
  title: string;
  description?: string; // optional field
  // Add other relevant fields as necessary
}

interface BoardViewProps {
  tasks: Task[];
}

const BoardView: React.FC<BoardViewProps> = ({ tasks }) => {
  return (
    <>
    {/* <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {tasks.map((task, index) => (
        <TaskCard task={task} key={index} />
      ))}
    </div> */}
    </>
  );
};

export default BoardView;
