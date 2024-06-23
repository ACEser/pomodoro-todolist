import React, { useState } from "react";
import { FaList, FaClock, FaRegSun, FaChartBar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("todo");

  const items = [
    { id: "todo", icon: <FaList />, label: "待办", path: "/" },
    { id: "pomodoro", icon: <FaClock />, label: "番茄钟", path: "/pomodoro" },
    { id: "habit", icon: <FaRegSun />, label: "习惯", path: "/habit" },
    { id: "stats", icon: <FaChartBar />, label: "统计", path: "/stats" },
  ];

  return (
    <aside className="bg-gray-700 w-full p-2 flex justify-start items-center space-x-4">
      {items.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          className={`flex flex-col items-center px-4 py-2 cursor-pointer ${
            activeItem === item.id
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-600"
          }`}
          onClick={() => setActiveItem(item.id)}
        >
          <span className="mb-1">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </Link>
      ))}
    </aside>
  );
};

export default Sidebar;
