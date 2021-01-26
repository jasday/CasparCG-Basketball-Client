import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";

export const NameContext = React.createContext(null);

export const NameProvider = ({ children }) => {
  //Creating team name States
  const [homeName, setHomeName] = useState("HOME");
  const [homeShortName, setHomeShortName] = useState("HOME");
  const [visitorName, setVisitorName] = useState("VISITOR");
  const [visitorShortName, setVisitorShortName] = useState("VISITOR");

  //Setting up Socket IO listeners
  useEffect(() => {
    socket.on("TEAM-NAME-UPDATE", (data) => {
      if (data.type === "homeTeam") {
        setHomeName(data.name);
      } else if (data.type === "visitorTeam") {
        setVisitorName(data.name);
      }
    });
    socket.on("TEAM-SHORTNAME-UPDATE", (data) => {
      if (data.type === "homeTeam") {
        setHomeShortName(data.name);
      } else if (data.type === "visitorTeam") {
        setVisitorShortName(data.name);
      }
    });
  }, []);

  //variables to make accessible through useContext
  const contextValue = {
    homeName,
    visitorName,
    homeShortName,
    visitorShortName,
  };

  //Returning context provider
  return (
    <NameContext.Provider value={contextValue}>{children}</NameContext.Provider>
  );
};
