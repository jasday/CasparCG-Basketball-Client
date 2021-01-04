import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";

export const ScoreContext = React.createContext(null);

export const ScoreProvider = ({ children }) => {
  const [homeScore, setHomeScore] = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);
  useEffect(() => {
    socket.on("SET-HOME-SCORE", (data) => {
      setHomeScore(homeScore + data);
    });
    socket.on("SET-VISITOR-SCORE", (data) => {
      setVisitorScore(visitorScore + data);
    });
  });

  const contextValue = {
    homeScore,
    visitorScore,
  };

  return (
    <ScoreContext.Provider value={contextValue}>
      {children}
    </ScoreContext.Provider>
  );
};
