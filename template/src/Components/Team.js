import React, { useContext } from "react";
import "../App.scss";

import { NameContext } from "./Context/NameContext";

const Team = ({ type, styleType }) => {
  const { homeName, visitorName } = useContext(NameContext);
  return (
    <div className={`Team ${styleType}`}>
      {type === "home" ? homeName : visitorName}
    </div>
  );
};

export default Team;
