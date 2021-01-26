import React, { useContext } from "react";

import { animated, useTrail } from "react-spring";
import { NameContext } from "./Context/NameContext";
import Player from "./Player";
import { CustomisationContext } from "./Context/CustomisationContext";

const PlayerList = ({ players, showScoreboard, data, team }) => {
  const teams = useContext(NameContext);
  const customisation = useContext(CustomisationContext);
  const trail = useTrail(players.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: showScoreboard ? 1 : 0,
    from: { opacity: 0 },
  });
  const MainStyle = {
    backgroundColor: customisation.ScoreboardTeamColour
      ? customisation.ScoreboardTeamColour
      : data.vibrant,
    borderRadius: team === "Home" ? "0px 0px 0px 30px" : "0px 0px 15px 0px",
    backgroundImage:
      team === "Home"
        ? "linear-gradient(to left top,rgba(255,255,255,0.2),rgba(255,255,255,0))"
        : "linear-gradient(to right top,rgba(255,255,255,0.2),rgba(255,255,255,0))",
  };

  const headerStyle = {
    border: "3px #FCFCFC",
    borderStyle: "none none solid",
  };
  return (
    <div className="border m-4 team" style={MainStyle}>
      <h1 className="pb-2 pt-1" style={headerStyle}>
        {team === "Home" ? teams.homeName : teams.visitorName}
      </h1>
      <ul className="p-0">
        {trail.map((animation, index) => (
          <animated.li className="" style={animation} key={index}>
            <Player name={players[index].name} number={players[index].number} />
          </animated.li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
