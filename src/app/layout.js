// Layout.js
"use client";
import React from "react";
import { useRouter } from "next/navigation";

const DefaultLayout = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname; // 确保 pathname 属性存在

  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold text-gray-800">My Website</h1>
        </div>
      </header>
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4">
        <p>Copyright &copy; 2023 My Website</p>
      </footer>
    </div>
  );
};

export default DefaultLayout;
