import React, { useContext } from "react";
import "../App.scss";

import { NameContext } from "./Context/NameContext";

const Team = ({ type, styleType }) => {
  const { homeShortName, visitorShortName } = useContext(NameContext);
  return (
    <div className={`Team ${styleType}`}>
      {type === "home" ? homeShortName : visitorShortName}
    </div>
  );
};

export default Team;
