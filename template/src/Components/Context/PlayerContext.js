import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";
import { NameContext } from "./NameContext";

export const PlayerContext = React.createContext(null);

//Returning context provider
export const PlayerProvider = ({ children }) => {
  const [homePlayers, setHomePlayers] = useState([
    { id: 1, name: "Player 1", number: 1 },
    { id: 2, name: "Player 2", number: 2 },
    { id: 3, name: "Player 3", number: 3 },
    { id: 4, name: "Player 4", number: 4 },
    { id: 5, name: "Player 5", number: 5 },
  ]);
  const [visitorPlayers, setVisitorPlayers] = useState([
    { id: 1, name: "Player 1", number: 1 },
    { id: 2, name: "Player 2", number: 2 },
    { id: 3, name: "Player 3", number: 3 },
    { id: 4, name: "Player 4", number: 4 },
    { id: 5, name: "Player 5", number: 5 },
  ]);

  //variables to make accessible through useContext
  const contextValue = { homePlayers, visitorPlayers };
  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};
