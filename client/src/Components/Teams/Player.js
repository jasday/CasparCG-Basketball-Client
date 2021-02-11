import React, { useState } from "react";
import { EditText } from "react-edit-text";

const Player = ({
  id,
  name,
  number,
  updatePlayerName,
  updatePlayerNumber,
  teamType,
}) => {
  //TODO Player Context to allow for editing - useReducer?
  const [playerName, setName] = useState(name);
  const [playerNumber, setNumber] = useState(number);

  const sendUpdate = ({ value }) => {
    updatePlayerNumber(teamType, id, value);
  };

  return (
    <div className="player d-flex justify-content-between text-light">
      <EditText
        style={{ fontSize: "2vh" }}
        defaultValue={playerName}
        value={playerName}
        onChange={(e) => setName(e.target)}
        onSave={(e) => updatePlayerName}
      />
      <EditText
        style={{ fontSize: "2vh", width: "50px" }}
        defaultValue={playerNumber}
        value={playerNumber}
        onChange={(e) => setNumber(e.target)}
        onSave={sendUpdate}
      />
    </div>
  );
};

export default Player;
