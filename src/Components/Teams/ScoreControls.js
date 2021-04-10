import React from "react";

import "../../Styles/component-styles.scss";

const ScoreControls = ({ setScore }) => {
  return (
    <div className="container">
      <div className="row  scoreControlButtons">
        <button className="btn btn-dark col-2" onClick={() => setScore(-3)}>
          -3
        </button>
        <button className="btn btn-dark col-2" onClick={() => setScore(-2)}>
          -2
        </button>
        <button className="btn btn-dark col-2" onClick={() => setScore(-1)}>
          -1
        </button>
        <button className="btn btn-dark col-2" onClick={() => setScore(1)}>
          +1
        </button>
        <button className="btn btn-dark col-2" onClick={() => setScore(2)}>
          +2
        </button>
        <button className="btn btn-dark col-2" onClick={() => setScore(3)}>
          +3
        </button>
      </div>
      <div className="row"></div>
    </div>
  );
};

export default ScoreControls;
