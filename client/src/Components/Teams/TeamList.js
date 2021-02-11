import React from "react";

import Player from "./Player";

const TeamList = ({ team, updatePlayerName, updatePlayerNumber }) => {
  return (
    <div>
      <ul className="list-group pb-2">
        <li className="list-group-item p-1 player d-flex justify-content-between text-light">
          <p className="pl-3 mb-1">Name</p> <p className="pr-4 mb-1">No.</p>
        </li>
        {team.players.map((player) => (
          <li
            style={{ backgroundColor: "#313335" }}
            className="list-group-item p-3"
          >
            <Player
              id={player.id}
              name={player.name}
              number={player.number}
              updatePlayerName={updatePlayerName}
              updatePlayerNumber={updatePlayerNumber}
              teamType={team.teamType}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
