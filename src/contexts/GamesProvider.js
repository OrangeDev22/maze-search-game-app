import React, { useState, useContext, createContext } from "react";

export const GamesContext = createContext();

export const useGames = () => {
  return useContext(GamesContext);
};

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);

  const value = {
    games,
    setGames,
    page,
    setPage,
  };

  return (
    <GamesContext.Provider value={value}>{children}</GamesContext.Provider>
  );
};
