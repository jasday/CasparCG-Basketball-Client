import React, { useContext } from "react";

import { TimerContext } from "./Context/TimerContext";

import "../App.scss";

const Clock = () => {
  const { minutes, seconds } = useContext(TimerContext);

  return (
    <div className="Clock">
      {minutes === 0 && seconds === 0 ? (
        <h1 className="animateEndTimer">00:00</h1>
      ) : (
        <h1>
          {" "}
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Clock;
