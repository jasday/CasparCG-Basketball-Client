import React, { useEffect, useReducer } from "react";

import Clock from "./Timer/Clock";
import TimerControls from "./Timer/TimerControls";

import socket from "./SocketConnection";
import TimerDataControls from "./Timer/TimerDataControls";

const initialState = {
  minutes: 10,
  seconds: 0,
  paused: true,
  previewMinutes: 10,
  previewSeconds: 0,
};

export const ACTIONS = {
  REDUCE_SECOND: "reduce-second",
  REDUCE_MINUTE: "reduce-minute",
  SET_TIMER: "set-timer",
  PAUSE_TIMER: "pause-timer",
  SET_SECONDS: "set-seconds",
  PLAY_TIMER: "play-timer",
  ADD_MINUTE: "add-minute",
  ADD_SECOND: "add-second",
  SYNC_TIMER: "sync-timer",
};

function timerReducer(state, action) {
  let newState;
  switch (action.type) {
    case ACTIONS.REDUCE_SECOND:
      if (state.seconds === 0 && state.minutes !== 0) {
        newState = { ...state, seconds: 59, minutes: state.minutes - 1 };
      } else if (state.seconds === 0 && state.minutes === 0) {
        newState = { ...state, seconds: 0, minutes: 0, paused: true };
      } else {
        newState = { ...state, seconds: state.seconds - 1 };
      }
      return newState;
    case ACTIONS.REDUCE_MINUTE:
      if (state.minutes === 0) {
        newState = { ...state, minutes: 0 };
      } else {
        newState = { ...state, minutes: state.minutes - 1 };
      }
      return newState;
    case ACTIONS.ADD_SECOND:
      if (state.seconds === 59) {
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
      if (
        state.minutes !== action.payload.minutes ||
        state.seconds !== action.payload.seconds
      ) {
        return {
          ...state,
          minutes: action.payload.minutes,
          seconds: action.payload.seconds,
        };
      } else {
        return state;
      }
    case ACTIONS.PAUSE_TIMER:
      socket.emit("TIMER-PAUSE");
      return { ...state, paused: true };
    case ACTIONS.PLAY_TIMER:
      socket.emit("TIMER-PLAY");
      return { ...state, paused: false };
    case ACTIONS.SYNC_TIMER:
      socket.emit("TIMER-SET", {
        minutes: state.minutes,
        seconds: state.seconds,
      });
      return state;
    default:
      return state;
  }
}
/*
const sendTimerValue = (minutes, seconds) => {
  console.log("Sending");
  socket.emit("TIMER-SET", (minutes, seconds));
};
*/

const Control = () => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  /* const spacePause = useCallback(
    (event) => {
      if (event.code === "Space") {
        socket.emit("TIMER-SYNC-REQ");
        if (state.paused) {
          dispatch({ type: ACTIONS.PLAY_TIMER });
        } else if (!state.paused) {
          dispatch({ type: ACTIONS.PAUSE_TIMER });
        }
      }
    },
    [state.paused]
  );

  useEffect(() => {
    document.addEventListener("keydown", spacePause, false);

    return () => {
      document.removeEventListener("keydown", spacePause, false);
    };
  });*/

  useEffect(() => {
    socket.on("TIMER-SYNC-RES", (data) => {
      dispatch({
        type: ACTIONS.SET_TIMER,
        payload: { seconds: data.seconds, minutes: data.minutes },
      });
    });
  }, []);

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
    <div className="d-flex justify-content-center flex-column align-items-center control">
      <Clock minutes={state.minutes} seconds={state.seconds} />
      <TimerControls state={state} dispatch={dispatch} />
      <p className="pt-2 m-0 pb-2">Set timer:</p>
      <TimerDataControls state={state} dispatch={dispatch} />
    </div>
  );
};

export default Control;
