import React, { useState, useContext } from "react";

import "../Styles/component-styles.scss";

import Control from "./Control";
import TeamContainer from "./Teams/TeamContainer";
import {IPC_ACTIONS, IpcSendContext} from "./Contexts/ipcSendContext";


const teamDefaultState = {
  name: "Team",
  score: 0,
  players: [
    { id: 1, name: "Player 1", number: 1 },
    { id: 2, name: "Player 2", number: 2 },
    { id: 3, name: "Player 3", number: 3 },
    { id: 4, name: "Player 4", number: 4 },
    { id: 5, name: "Player 5", number: 5 },
  ],
};



const MainGrid = () => {
  const [homeTeam, setHomeTeam] = useState(teamDefaultState);
  const [awayTeam, setAwayTeam] = useState(teamDefaultState);
  const context = useContext(IpcSendContext);
  const dispatch = context.dispatch;
  const toggleScores = () => {
    dispatch({ type: IPC_ACTIONS.TOGGLE_SCORES });
  };

  const sendQuarter = (quarter) => {
    dispatch({ type: IPC_ACTIONS.SET_QUARTER, payload: {quarter} });
  };

  return (
    <div className="container-fluid p-4">
      <div className="row pb-5">
        <div className="col-3">
          <TeamContainer
            team={homeTeam}
            setTeam={setHomeTeam}
            teamType="homeTeam"
          />
        </div>
        <div className="col-6">
          <Control />
        </div>
        <div className="col-3">
          <TeamContainer
            team={awayTeam}
            setTeam={setAwayTeam}
            teamType="visitorTeam"
          />
        </div>
      </div>
      <div className="row buttons">
        <div className="col-1">
          <button
            className="btn btn-dark w-100 p-3"
            onClick={() => toggleScores()}
          >
            Toggle Scores
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-dark w-100 p-3"
            onClick={() => sendQuarter("1st")}
          >
            1st
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-dark w-100 p-3"
            onClick={() => sendQuarter("2nd")}
          >
            2nd
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-dark w-100 p-3"
            onClick={() => sendQuarter("3rd")}
          >
            3rd
          </button>
        </div>
        <div className="col-1">
          <button
            className="btn btn-dark w-100 p-3"
            onClick={() => sendQuarter("4th")}
          >
            4th
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainGrid;
