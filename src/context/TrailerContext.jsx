import React, { createContext, useContext, useState } from "react";

const TrailerContext = createContext();

export const TrailerProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  return (
    <TrailerContext.Provider value={{ trailerUrl, setTrailerUrl }}>
      {children}
    </TrailerContext.Provider>
  );
};

export const useTrailer = () => {
  return useContext(TrailerContext);
};
