import React, { useState } from "react";
import TimeField from "react-simple-timefield";
import { ACTIONS } from "../Control";

const TimerDataControls = ({ state, dispatch }) => {
  const [currentTime, setCurrentTime] = useState("10:00");
  return (
    <div className="timerDataControls">
      <button
        onClick={() => {
          dispatch({
            type: ACTIONS.SET_TIMER,
            payload: { minutes: 5, seconds: 0 },
          });
        }}
      >
        5:00
      </button>
      <button
        onClick={() => {
          dispatch({
            type: ACTIONS.SET_TIMER,
            payload: { minutes: 10, seconds: 0 },
          });
        }}
      >
        10:00
      </button>
      <TimeField
        style={{
          width: "4.5vw",
          height: "5vh",
          textAlign: "center",
          padding: "0px 8px 0px 8px",
          marginLeft: "2vw",
          marginRight: "5px",
          borderRadius: "5px 5px 5px 5px",
          backgroundColor: "#f4511e",
          color: "white",
          outline: "none",
          border: "none",
          opacity: "0.9",
        }}
        value={currentTime}
        onChange={(event, value) => {
          setCurrentTime(value);
        }}
      />
      {state.paused ? (
        <button
          onClick={async () => {
            let time = currentTime.split(":");
            let minutes = parseInt(time[0]);
            let seconds = parseInt(time[1]);
            await dispatch({
              type: ACTIONS.SET_TIMER,
              payload: { minutes, seconds },
            });
            dispatch({ type: ACTIONS.SYNC_TIMER });
          }}
        >
          Apply change
        </button>
      ) : (
        <button
          className="text-muted"
          onClick={() => {
            console.log("Pause the timer to edit value.");
          }}
        >
          Apply change
        </button>
      )}
    </div>
  );
};

export default TimerDataControls;
