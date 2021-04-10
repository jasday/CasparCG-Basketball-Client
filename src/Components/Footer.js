import React, { useEffect, useState } from "react";

import "../Styles/component-styles.scss";

import socket from "./SocketConnection";
import StatusIcon from "./StatusIcon";

const Footer = () => {
  const [casparColour, setCasparColour] = useState("#ff0000");
  const [templateColour, setTemplateColour] = useState("#ff0000");
  const [statusMessage, setStatusMessage] = useState();

  useEffect(() => {
    socket.on("CG-CONNECTED", () => {
      setCasparColour("#5af63b");
    });
    socket.on("CG-CONNECTING", () => {
      setCasparColour("#ffd909");
    });
    socket.on("CG-CONNECTION-ERROR", () => {
      setCasparColour("#ff0000");
    });
    socket.on("TEMPLATE-CONNECTED", () => {
      setTemplateColour("#5af63b");
    });
    socket.on("TEMPLATE-CONNECTING", () => {
      setTemplateColour("#ffd909");
    });
    socket.on("TEMPLATE-CONNECTION-ERROR", () => {
      setTemplateColour("#ff0000");
    });
    socket.on("CG-RECEIVED-DATA", (data) => {
      setStatusMessage(data);
    });
  }, []);

  return (
    <div className="footer fixed-bottom d-flex justify-content-between align-items-center">
      <span className="ml-2 d-flex align-content-center">{statusMessage}</span>
      <span className="mr-2 d-flex align-content-center">
        <StatusIcon name="CasparCG" color={casparColour} />
        <StatusIcon name="Template" color={templateColour} />
      </span>
    </div>
  );
};

export default Footer;
