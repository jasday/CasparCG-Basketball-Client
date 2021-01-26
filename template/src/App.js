import React, { useEffect, useState } from "react";

import Scores from "./Components/Scores";
import Scoreboard from "./Components/Scoreboard";

import { NameProvider } from "./Components/Context/NameContext";
import { ScoreProvider } from "./Components/Context/ScoreContext";
import { TimerProvider } from "./Components/Context/TimerContext";
import { PlayerProvider } from "./Components/Context/PlayerContext";

import socket from "./Components/SocketConnection";

import "./App.scss";
import { CustomisationProvider } from "./Components/Context/CustomisationContext";

function App() {
  const [showScores, setShowScores] = useState(true);
  const [showScoreboard, setShowScoreboard] = useState(true);
  //Spring Hooks

  useEffect(() => {
    socket.on("TOGGLE-SCORES", () => {
      toggleScores();
    });
  });

  const toggleScores = () => {
    setShowScores(!showScores);
  };

  const toggleScoreboard = () => {
    setShowScoreboard(!showScoreboard);
  };

  return (
    <div className="App">
      <CustomisationProvider>
        <button onClick={toggleScoreboard}>Click me</button>
        <NameProvider>
          <ScoreProvider>
            <TimerProvider>
              <Scores visible={showScores} />
            </TimerProvider>
            <PlayerProvider>
              <Scoreboard showScoreboard={showScoreboard} />
            </PlayerProvider>
          </ScoreProvider>
          {/*//Title Card*/}
        </NameProvider>
      </CustomisationProvider>
    </div>
  );
}

export default App;
