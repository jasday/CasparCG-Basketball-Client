import React from "react";

import "../../Styles/component-styles.scss";
import { ACTIONS } from "../Control";


const TimerControls = ({ state, dispatch }) => {
  return (
    <div className="timerControls">
      {!state.paused ? (
        <button
          className="btn btn-dark px-5"
          onClick={() => {
            //socket.emit("TIMER-SYNC-REQ");
            dispatch({ type: ACTIONS.PAUSE_TIMER });
          }}
        >
          PAUSE
        </button>
      ) : (
        <button
          className="btn btn-dark px-5"
          onClick={() => {
            //socket.emit("TIMER-SYNC-REQ");
            dispatch({ type: ACTIONS.PLAY_TIMER });
          }}
        >
          PLAY
        </button>
      )}
    </div>
  );
};

export default TimerControls;
