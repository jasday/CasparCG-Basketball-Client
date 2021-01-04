import React, { useEffect, useState } from "react";
import socket from "../SocketConnection";

export const TimerContext = React.createContext(null);

export const TimerProvider = ({ children }) => {
  const initialMinute = 10,
    initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    socket.on("TIMER-PAUSE", () => {
      setPaused(true);
    });
    socket.on("TIMER-PLAY", () => {
      setPaused(false);
    });
    socket.on("TIMER-SET", (data) => {
      setMinutes(data.minutes);
      setSeconds(data.seconds);
    });
  }, []);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        if (!paused) setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          if (!paused) setMinutes(minutes - 1);
          if (!paused) setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const contextValue = {
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    paused,
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};
