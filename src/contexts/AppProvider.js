import React, { useState, useContext, createContext, useEffect } from "react";

export const AppContext = createContext();

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const checkWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  });

  const value = {
    screenWidth,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
