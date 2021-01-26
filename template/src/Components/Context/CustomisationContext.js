import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";

export const CustomisationContext = React.createContext(null);

export const CustomisationProvider = ({ children }) => {
  //Creating team name States
  const [ScoreboardTeamColour, setScoreboardTeamColor] = useState();
  const [ScoreboardGradientPrimary, setScoreboardGradientPrimary] = useState(
    "#323764"
  );
  const [
    ScoreboardGradientSecondary,
    setScoreboardGradientSecondary,
  ] = useState("#1f2141");
  const [playerNumberHighlight, setPlayerNumberHighlight] = useState("#5e625e");

  const contextValue = {
    ScoreboardTeamColour,
    ScoreboardGradientPrimary,
    ScoreboardGradientSecondary,
    playerNumberHighlight,
  };

  /*
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
*/

  //variables to make accessible through useContext

  //Returning context provider
  return (
    <CustomisationContext.Provider value={contextValue}>
      {children}
    </CustomisationContext.Provider>
  );
};
