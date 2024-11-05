import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { toast } from "sonner";
import clsx from "clsx";
import { FaList } from "react-icons/fa";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmationDialog from "../Dialogs";

// Type definitions for the task object
interface TeamMember {
  _id: string;
  name: string;
  avatar: string;
}

interface Task {
  _id: string;
  title: string;
  priority: "high" | "medium" | "low";
  date: string;
  stage: string;
  activities: any[];
  assets: any[];
  subTasks: any[];
  team: TeamMember[];
}

interface TableProps {
  tasks: Task[];
}

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table: React.FC<TableProps> = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const deleteClicks = (id: string) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {
    // TODO: Add delete logic
    toast.success("Task deleted successfully!");
  };

  const TableHeader = () => (
    <thead className='w-full border-b border-gray-300'>
      <tr className='w-full text-black text-left'>
        <th className='py-2'>Task Title</th>
        <th className='py-2'>Priority</th>
        <th className='py-2 hidden md:table-cell'>Created At</th>
        <th className='py-2 hidden md:table-cell'>Assets</th>
        <th className='py-2'>Team</th>
        <th className='py-2'>Actions</th>
      </tr>
    </thead>
  );

  const TableRow: React.FC<{ task: Task }> = ({ task }) => (
    <tr className='border-b border-gray-200 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          <div className={clsx("w-4 h-4 rounded-full", task.stage)} />
          <p className='w-full line-clamp-2 text-base text-black'>{task?.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className={"flex gap-1 items-center"}>
          <span className={clsx("text-lg", task.priority)}>
            {ICONS[task?.priority]}
          </span>
          <span className='capitalize line-clamp-1'>{task?.priority} Priority</span>
        </div>
      </td>

      <td className='py-2 hidden md:table-cell'>
        <span className='text-sm text-gray-600'>{task.date}</span>
      </td>

      <td className='py-2 hidden md:table-cell'>
        <div className='flex items-center gap-3'>
          <div className='flex gap-1 items-center text-sm text-gray-600'>
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600'>
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className='flex gap-1 items-center text-sm text-gray-600'>
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task?.team?.map((m, index) => (
            <div
              key={m._id}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1"
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>

      <td className='py-2 flex gap-2 md:gap-4 justify-end'>
        <Button
          className='text-blue-600 hover:text-blue-500 sm:px-0 text-sm md:text-base'
          label='Edit'
          type='button'
        />
        <Button
          className='text-red-700 hover:text-red-500 sm:px-0 text-sm md:text-base'
          label='Delete'
          type='button'
          onClick={() => deleteClicks(task._id)}
        />
      </td>
    </tr>
  );

  return (
    <>
      <div className='bg-white px-2 md:px-4 pt-4 pb-9 shadow-md rounded'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <TableHeader />
            <tbody>
              {tasks.map((task) => (
                <TableRow key={task._id} task={task} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />
    </>
  );
};

export default Table;
