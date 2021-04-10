import React, { useState } from "react";
import TimeField from "react-simple-timefield";
import { ACTIONS } from "../Control";

const TimerDataControls = ({ state, dispatch }) => {
  const [currentTime, setCurrentTime] = useState("10:00");

  const adjustTime = (type) => {
    let time = currentTime.split(":");
    let minutes = parseInt(time[0]);
    let seconds = parseInt(time[1]);
    switch (type) {
      case "Reduce-Minute":
        if (minutes !== 0) {
          minutes -= 1;
        }
        break;
      case "Reduce-Second":
        if (seconds === 0 && minutes !== 0) {
          minutes -= 1;
          seconds = 59;
        } else if (seconds === 0 && minutes === 0) {
          break;
        } else {
          seconds -= 1;
        }
        break;
      case "Increase-Minute":
        minutes += 1;
        break;
      case "Increase-Second":
        if (seconds === 59) {
          seconds = 0;
          minutes += 1;
        } else {
          seconds += 1;
        }
        break;
      default:
        break;
    }
    let newMins = minutes < 10 ? `0${minutes}` : minutes;
    let newSecs = seconds < 10 ? `0${seconds}` : seconds;
    setCurrentTime(`${newMins}:${newSecs}`);
  };

  return (
    <div className="container">
      <div className="timerDataControls justify-content-center d-flex row">
        <button
          className="btn btn-dark"
          onClick={() => {
            setCurrentTime("05:00");
          }}
        >
          5:00
        </button>
        <button
          className="btn btn-dark"
          onClick={() => {
            setCurrentTime("10:00");
          }}
        >
          10:00
        </button>
        <TimeField
          className="btn btn-dark"
          style={{
            width: "6vw",
            height: "5vh",
            textAlign: "center",
            padding: "0px 8px 0px 8px",
            marginLeft: "2vw",
            marginRight: "5px",
            borderRadius: "5px 5px 5px 5px",
            color: "white",
            outline: "none",
            border: "none",
            opacity: "0.9",
            fontSize: "30px",
          }}
          value={currentTime}
          onChange={(event, value) => {
            setCurrentTime(value);
          }}
        />

        {state.paused ? (
          <button
            className="btn btn-dark"
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
            className="btn btn-dark text-muted"
            onClick={() => {
              console.log("Pause the timer to edit value.");
            }}
          >
            Apply change
          </button>
        )}
      </div>
      <div className="row d-flex justify-content-center pt-4 timerFineAdjustments">
        <button
          className="btn btn-dark text-muted"
          onClick={(e) => {
            adjustTime("Reduce-Minute");
          }}
        >
          -MIN
        </button>
        <button
          className="btn btn-dark text-muted"
          onClick={() => {
            adjustTime("Reduce-Second");
          }}
        >
          -SEC
        </button>
        <button
          className="btn btn-dark text-muted"
          onClick={() => {
            adjustTime("Increase-Second");
          }}
        >
          +SEC
        </button>
        <button
          className="btn btn-dark text-muted"
          onClick={() => {
            adjustTime("Increase-Minute");
          }}
        >
          +MIN
        </button>
      </div>
    </div>
  );
};

export default TimerDataControls;
