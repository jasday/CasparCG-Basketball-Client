import React, { useState } from "react";

import "../Styles/component-styles.scss";
import { ACTIONS } from "../Components/Control";

const TimerControls = ({ state, dispatch }) => {
  const [time, setTime] = useState();
  return (
    <div className="timerControls">
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.REDUCE_MINUTE });
        }}
      >
        MIN -
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.REDUCE_SECOND });
        }}
      >
        SEC -
      </button>
      {!state.paused ? (
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.PAUSE_TIMER });
          }}
        >
          PAUSE
        </button>
      ) : (
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.PLAY_TIMER });
          }}
        >
          PLAY
        </button>
      )}
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.ADD_SECOND });
        }}
      >
        + SEC
      </button>
      <button
        onClick={() => {
          dispatch({ type: ACTIONS.ADD_MINUTE });
        }}
      >
        + MIN
      </button>
    </div>
  );
};

export default TimerControls;
