import React, { useState } from "react";

const Player = ({ id, name }) => {
  //TODO Player Context to allow for editing - useReducer?
  const [playerName, setName] = useState(name);
  const [editName, setEditable] = useState(false);
  const handleEdit = (e) => {
    setEditable(!editName);
  };

  return (
    <div className="text-dark player">
      <input
        type="text"
        disabled={editName}
        value={playerName}
        onChange={(e) => setName(e.target.value)}
      />
      <input className="btn" type="button" value="Edit" onClick={handleEdit} />
    </div>
  );
};

export default Player;
