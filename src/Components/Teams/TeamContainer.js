import React, { useState } from "react";

import TeamList from "./TeamList";
import ScoreControls from "./ScoreControls";
import socket from "../SocketConnection";

import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";

const TeamContainer = ({ team, setTeam, teamType }) => {
  const [shortName, setShortName] = useState(team.name);
  const adjustScores = async (score) => {
    setTeam((prevTeam) => {
      let newState;
      if (prevTeam.score + score < 0) {
        newState = {
          ...prevTeam,
          score: 0,
        };
        socket.emit("SCORE-UPDATE", { team: teamType, score: 0 });
      } else {
        newState = {
          ...prevTeam,
          score: prevTeam.score + score,
        };
        socket.emit("SCORE-UPDATE", {
          team: teamType,
          score: team.score + score,
        });
      }
      return newState;
    });
  };

  const updateName = ({ value }) => {
    setTeam({ ...team, name: value });
    socket.emit("TEAM-NAME-UPDATE", {
      type: teamType,
      name: value,
    });
  };

  const updateShortName = ({ value }) => {
    socket.emit("TEAM-SHORTNAME-UPDATE", {
      type: teamType,
      name: value,
    });
  };

  const updatePlayerName = (teamType, id, { value }) => {
    let newPlayers = [...team.players];
    newPlayers.forEach((player) => {
      if (player.id === id) {
        player.name = value;
      }
    });
    setTeam({ ...team, players: newPlayers });
    socket.emit("PLAYER-NAME-UPDATE", {
      team: teamType,
      playerID: id,
      playerName: value,
    });
  };
  const updatePlayerNumber = (teamType, id, value) => {
    let newPlayers = [...team.players];
    newPlayers.forEach((player) => {
      if (player.id === id) {
        player.number = value;
      }
    });
    console.log(newPlayers);
    setTeam({ ...team, players: newPlayers });
    socket.emit("PLAYER-NUMBER-UPDATE", {
      team: teamType,
      playerID: id,
      playerNumber: value,
    });
    console.log(team);
    console.log("TESTING");
  };

  return (
    <div className="border border-dark p-2 rounded">
      <span className="d-flex justify-content-between">
        <h2 className="d-inline-block pl-2">
          <EditText
            style={{ fontSize: "2vh" }}
            defaultValue={team.name}
            value={team.name}
            onChange={(e) =>
              setTeam((prevTeam) => ({ ...prevTeam, name: e.target }))
            }
            onSave={updateName}
          />
        </h2>
        <h2 style={{ fontSize: "2vh" }} className="d-inline-block pr-2 mt-2">
          Score: {team.score}
        </h2>
      </span>
      <h4 className="pl-2 shortName">
        <EditText
          style={{
            fontSize: "1.5vh",
          }}
          defaultValue={shortName}
          value={shortName}
          onChange={(e) => setShortName(e.target)}
          onSave={updateShortName}
        />
      </h4>
      <TeamList
        team={team}
        updatePlayerName={updatePlayerName}
        updatePlayerNumber={updatePlayerNumber}
      />
      <ScoreControls setScore={adjustScores} />
    </div>
  );
};

export default TeamContainer;
