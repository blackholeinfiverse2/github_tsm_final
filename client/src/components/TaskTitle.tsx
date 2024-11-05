import clsx from "clsx";
import React from "react";
import { IoMdAdd } from "react-icons/io";

// Define the props interface for the TaskTitle component
interface TaskTitleProps {
  label: string;   // Label text
  className?: string; // Optional className for the colored dot
}

const TaskTitle: React.FC<TaskTitleProps> = ({ label, className }) => {
  return (
    <div className='w-full h-10 md:h-12 px-3 md:px-4 rounded bg-white flex items-center justify-between shadow-md'>
      <div className='flex gap-2 items-center'>
        <div className={clsx("w-4 h-4 rounded-full", className)} />
        <p className='text-sm md:text-base text-gray-600'>{label}</p>
      </div>

      <button className='block md:hidden'>
        <IoMdAdd className='text-lg text-black' />
      </button>
      
      <button className='hidden md:block'>
        <IoMdAdd className='text-lg text-black' />
      </button>
    </div>
  );
};

export default TaskTitle;
