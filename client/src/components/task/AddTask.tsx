import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Button from "../Button";
import { useWeb3Context } from "../../context/Web3Context";

interface AddTaskProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface TextboxProps {
  placeholder: string;
  type: string;
  name: string;
  label: string;
  className: string;
  value: string; // Add value prop
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  error?: string;
}

// Textbox component definition within the same file
const Textbox: React.FC<TextboxProps> = ({
  placeholder,
  type,
  name,
  label,
  className,
  value,
  onChange,
  error
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`${className} w-full p-2 rounded border border-gray-300 focus:ring focus:ring-blue-500`}
        value={value}  // Set value to the input
        onChange={onChange}  // Set onChange handler to the input
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

const AddTask: React.FC<AddTaskProps> = ({ open, setOpen }) => {
  const { createTask } = useWeb3Context(); // Web3 context to create a task

  // State to store taskName and account
  const [taskName, setTaskName] = useState<string>("");
  const [account, setAccount] = useState<string>("");

  // Function to handle task creation
  const handleCreateTask = async () => {
    if (taskName && account) {
      await createTask(taskName, account); // Use both taskName and account
      setTaskName(""); // Reset task name after creating task
      setAccount("");  // Reset account after creating task
    } else {
      alert("Please enter both task name and account.");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded bg-white p-6 shadow-lg">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-lg font-bold leading-6 text-gray-900 mb-4">
              ADD TASK
            </h2>

            <div className="mt-2 flex flex-col gap-4">
              {/* Task Name Input */}
              <Textbox
                placeholder="Task Name"
                type="text"
                name="taskName"
                label="Task Name"
                className="border-gray-300"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)} // Update taskName state
              />

              {/* Account Input */}
              <Textbox
                placeholder="Account"
                type="text"
                name="account"
                label="Account"
                className="border-gray-300"
                value={account}
                onChange={(e) => setAccount(e.target.value)} // Update account state
              />

              <div className="flex flex-col sm:flex-row sm:gap-4 mt-4">
                <Button
                  label="Submit"
                  type="button"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                  onClick={handleCreateTask} // Trigger task creation
                />
                <Button
                  type="button"
                  className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto border border-gray-300 rounded"
                  onClick={() => setOpen(false)}
                  label="Cancel"
                />
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddTask;
