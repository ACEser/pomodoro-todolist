"use client"
// TodoContext.js
import React, { createContext, useState } from "react";

//页面之间共享数据
export const TitleContext = createContext();

export const TitleProvider = ({ children }) => {
  const [selectedTitle, setSelectedTitle] = useState(null);

  return (
    <TitleContext.Provider value={{ selectedTitle, setSelectedTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
