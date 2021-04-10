import React from "react";

import "../../Styles/component-styles.scss";

const Clock = ({ minutes, seconds }) => {
  return (
    <div className="clock">
      {minutes === 0 && seconds === 0 ? (
        <h1>00:00</h1>
      ) : (
        <h1>
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Clock;
