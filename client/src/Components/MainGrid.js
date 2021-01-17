import React, { useState } from "react";

import "../Styles/component-styles.scss";

import TeamList from "./Teams/TeamList";
import Control from "./Control";

const teamDefaultState = [
  { id: 1, name: "Player 1" },
  { id: 2, name: "Player 2" },
  { id: 3, name: "Player 3" },
  { id: 4, name: "Player 4" },
  { id: 5, name: "Player 5" },
];

const MainGrid = () => {
  const [homeTeam, setHomeTeam] = useState(teamDefaultState);
  const [awayTeam, setAwayTeam] = useState(teamDefaultState);

  return (
    <div className="container-fluid p-4">
      <div className="row">
        <div className="col-3">
          <TeamList team={homeTeam} />
        </div>
        <div className="col-6">
          <Control />
        </div>
        <div className="col-3">
          <TeamList team={awayTeam} />
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
};

export default MainGrid;
