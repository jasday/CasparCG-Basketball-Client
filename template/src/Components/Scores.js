import React, { useContext } from "react";
import "../App.scss";

import Clock from "./Clock";
import Team from "./Team";
import Quarter from "./Quarter";
import { ScoreContext } from "./Context/ScoreContext";
import TeamScore from "./TeamScore";
import { useSpring, animated } from "react-spring";
const Scores = ({ visible }) => {
  const { homeScore, visitorScore } = useContext(ScoreContext);
  const springProps = useSpring({
    opacity: visible ? 1 : 0,
    from: { opacity: 0 },
  });
  return (
    <animated.div style={springProps} className="Scores">
      <Clock />
      <Quarter />
      <div className="break-top" />
      <div className="Team-Container">
        <Team type="home" styleType="home" />
        <TeamScore score={homeScore} styleType="home" />
        <div className="break" />
        <Team type="visitor" styleType="away" />
        <TeamScore score={visitorScore} styleType="away" />
      </div>
    </animated.div>
  );
};

export default Scores;
