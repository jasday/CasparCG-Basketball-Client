import React, { useContext } from "react";
import { CustomisationContext } from "./Context/CustomisationContext";

const Player = ({ name, number }) => {
  const customisation = useContext(CustomisationContext);

  const styles = {
    height: "60px",
    paddingLeft: "5px",
    marginBottom: "20px",
  };
  const numberStyle = {
    overflow: "none",
    float: "left",
    width: "50px",
    height: "50px",
    borderRadius: "5px",
    backgroundColor: customisation.playerNumberHighlight,
    fontSize: "40px",
  };
  const nameStyle = {
    float: "left",
    paddingLeft: "10px",
    verticalAlign: "center",
  };
  return (
    <div style={styles}>
      <h1>
        <span style={numberStyle}>{number}</span>
        <span style={nameStyle}>{name}</span>
      </h1>
    </div>
  );
};

export default Player;
