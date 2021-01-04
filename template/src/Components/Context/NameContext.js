import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";

export const NameContext = React.createContext(null);

export const NameProvider = ({ children }) => {
  const [homeName, setHomeName] = useState("HOME");
  const [visitorName, setVisitorName] = useState("VISITOR");
  useEffect(() => {
    socket.on("SET-HOME-NAME", (name) => {
      setHomeName(name);
    });
    socket.on("SET-VISITOR-NAME", (name) => {
      setVisitorName(name);
    });
  }, []);

  const contextValue = {
    homeName,
    visitorName,
  };

  return (
    <NameContext.Provider value={contextValue}>{children}</NameContext.Provider>
  );
};
