import React, { useState, useEffect } from "react";
import socket from "./SocketConnection";
import "../App.scss";

const Quarter = () => {
  const [quarter, setQuarter] = useState("1st");

  useEffect(() => {
    socket.on("SET-QUARTER", (data) => {
      setQuarter(data);
    });
  }, []);
  return <div className="Quarter"> {quarter} </div>;
};

export default Quarter;
