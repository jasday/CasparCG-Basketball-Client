import React, { useState } from "react";

import Scores from "./Components/Scores";
import { NameProvider } from "./Components/Context/NameContext";
import { ScoreProvider } from "./Components/Context/ScoreContext";
import { TimerProvider } from "./Components/Context/TimerContext";

import "./App.scss";

function App() {
  const [showScores, setShowScores] = useState(false);
  //Spring Hooks

  const toggleScores = () => {
    setShowScores(!showScores);
  };

  return (
    <div className="App">
      <button onClick={toggleScores}>Toggle</button>
      <NameProvider>
        <ScoreProvider>
          <TimerProvider>
            <Scores visible={showScores} />
          </TimerProvider>
        </ScoreProvider>
      </NameProvider>
    </div>
  );
}

export default App;
