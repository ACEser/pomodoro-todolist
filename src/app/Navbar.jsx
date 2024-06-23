"user client";

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-2 flex justify-end items-center w-full">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-white focus:outline-none"
        >
          <FaUserCircle size={32} />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
            <ul className="py-1">
              <li>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
