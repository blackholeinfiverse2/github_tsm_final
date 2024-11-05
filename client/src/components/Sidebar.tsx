// Updated Sidebar component
import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa"; // Removed FaUserPlus for Register
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import { useWeb3Context } from "../context/Web3Context"; // Import Web3Context
import clsx from "clsx";

interface LinkData {
  label: string;
  link: string;
  icon: JSX.Element;
}

const Sidebar: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { userRole } = useWeb3Context(); // Get the userRole from context

  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  // Conditionally set sidebar links based on userRole
  const adminLinks: LinkData[] = [
    { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
    { label: "Create Task", link: "createTask", icon: <MdOutlinePendingActions /> },
  ];

  const employeeLinks: LinkData[] = [
    { label: "Tasks", link: "tasks", icon: <FaTasks /> },
    { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  ];

  const sidebarLinks: LinkData[] = userRole === "Admin" ? adminLinks : employeeLinks;

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink: React.FC<{ el: LinkData }> = ({ el }) => (
    <Link
      to={el.link}
      onClick={closeSidebar}
      className={clsx(
        "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
        path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
      )}
    >
      {el.icon}
      <span className="hover:text-[#2564ed]">{el.label}</span>
    </Link>
  );

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">TaskMe</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div>
        <button className="w-full flex gap-2 p-2 items-center text-lg text-gray-800">
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;