import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";

export const ScoreContext = React.createContext(null);

export const ScoreProvider = ({ children }) => {
  const [homeScore, setHomeScore] = useState(0);
  const [visitorScore, setVisitorScore] = useState(0);
  useEffect(() => {
    socket.on("SCORE-UPDATE", (data) => {
      if (data.team === "homeTeam") {
        setHomeScore(data.score);
      } else if (data.team === "visitorTeam") {
        setVisitorScore(data.score);
      }
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
