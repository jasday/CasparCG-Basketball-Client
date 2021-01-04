import React, { useState, useEffect, useReducer } from "react";

import Clock from "./Clock";
import TimerControls from "./TimerControls";

import socket from "./SocketConnection";

const initialState = { minutes: 10, seconds: 0, paused: true };

export const ACTIONS = {
  REDUCE_SECOND: "reduce-second",
  REDUCE_MINUTE: "reduce-minute",
  SET_TIMER: "set-timer",
  PAUSE_TIMER: "pause-timer",
  SET_SECONDS: "set-seconds",
  PLAY_TIMER: "play-timer",
  ADD_MINUTE: "add-minute",
  ADD_SECOND: "add-second",
};

function timerReducer(state, action) {
  let newState;
  switch (action.type) {
    case ACTIONS.REDUCE_SECOND:
      if (state.seconds == 0 && state.minutes != 0) {
        newState = { ...state, seconds: 59, minutes: state.minutes - 1 };
      } else if (state.seconds == 0 && state.minutes == 0) {
        newState = { ...state, seconds: 0, minutes: 0, paused: true };
      } else {
        newState = { ...state, seconds: state.seconds - 1 };
      }
      return newState;
    case ACTIONS.REDUCE_MINUTE:
      if (state.minutes == 0) {
        newState = { ...state, minutes: 0 };
      } else {
        newState = { ...state, minutes: state.minutes - 1 };
      }
      return newState;
    case ACTIONS.ADD_SECOND:
      if (state.seconds == 59) {
        newState = { ...state, seconds: 0, minutes: state.minutes + 1 };
      } else {
        newState = { ...state, seconds: state.seconds + 1 };
      }
      return newState;
    case ACTIONS.ADD_MINUTE:
      return { ...state, minutes: state.minutes + 1 };
    case ACTIONS.SET_SECONDS:
      return { ...state, seconds: action.payload.seconds };
    case ACTIONS.SET_TIMER:
      return state;
    case ACTIONS.PAUSE_TIMER:
      socket.emit("TIMER-PAUSE");
      return { ...state, paused: true };
    case ACTIONS.PLAY_TIMER:
      socket.emit("TIMER-PLAY");
      return { ...state, paused: false };
    default:
      return state;
  }
}

const sendTimerValue = (minutes, seconds) => {
  console.log("Sending");
  socket.emit("TIMER-SET", (minutes, seconds));
};

const Control = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (state.seconds > 0) {
        if (!state.paused) dispatch({ type: ACTIONS.REDUCE_SECOND });
      }
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          dispatch({ type: ACTIONS.PAUSE_TIMER });
          clearInterval(myInterval);
        } else {
          if (!state.paused) {
            dispatch({ type: ACTIONS.REDUCE_SECOND });
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <Clock minutes={state.minutes} seconds={state.seconds} />
      <TimerControls state={state} dispatch={dispatch} />
    </div>
  );
};

export default Control;
