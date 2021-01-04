import React from "react";

const TeamScore = ({ score, styleType }) => {
  return <div className={`teamScore ${styleType}`}>{score}</div>;
};

export default TeamScore;
