import React from "react";

import Player from "../Player";

const TeamList = ({ team }) => {
  return (
    <div>
      <ul className="list-group">
        {team.map((player) => (
          <li className="list-group-item p-3">
            <Player id={player.id} name={player.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
