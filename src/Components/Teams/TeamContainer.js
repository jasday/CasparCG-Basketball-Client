import React, {useContext, useState} from "react";

import TeamList from "./TeamList";
import ScoreControls from "./ScoreControls";

import { EditText } from "react-edit-text";
import "react-edit-text/dist/index.css";
import {IPC_ACTIONS, IpcSendContext} from "../Contexts/ipcSendContext";

const TeamContainer = ({ team, setTeam, teamType }) => {
  const [shortName, setShortName] = useState(team.name);
  const context = useContext(IpcSendContext);
  const dispatch = context.dispatch;
  const adjustScores = async (score) => {
    setTeam((prevTeam) => {
      let newState;
      if (prevTeam.score + score < 0) {
        newState = {
          ...prevTeam,
          score: 0,
        };
        dispatch({ type: IPC_ACTIONS.SCORE_UPDATE, payload: { team: teamType, score: 0 } });
      } else {
        newState = {
          ...prevTeam,
          score: prevTeam.score + score,
        };
        dispatch({ type: IPC_ACTIONS.SCORE_UPDATE, payload: { team: teamType, score: team.score + score } });
      }
      return newState;
    });
  };

  const updateName = ({ value }) => {
    setTeam({ ...team, name: value });
    dispatch({ type: IPC_ACTIONS.TEAM_NAME_UPDATE, payload: { team: teamType, name:value } });
  };

  const updateShortName = ({ value }) => {
    dispatch({ type: IPC_ACTIONS.TEAM_SHORTNAME_UPDATE, payload: { team: teamType, name:value } });
  };

  const updatePlayerName = (teamType, id, { value }) => {
    let newPlayers = [...team.players];
    newPlayers.forEach((player) => {
      if (player.id === id) {
        player.name = value;
      }
    });
    setTeam({ ...team, players: newPlayers });
    dispatch({ type: IPC_ACTIONS.PLAYER_NAME_UPDATE, payload: { team: teamType, playerID: id, playerName: value }});
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
    dispatch({ type: IPC_ACTIONS.PLAYER_NUMBER_UPDATE, payload: { team: teamType, playerID: id, playerNumber: value }});
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
