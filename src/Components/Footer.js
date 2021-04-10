import React, {useContext} from "react";

import "../Styles/component-styles.scss";
import StatusIcon from "./StatusIcon";
import {IpcReceiveContext} from "./Contexts/ipcReceiveContext";

const Footer = () => {
  const {casparColour, templateColour, statusMessage} = useContext(IpcReceiveContext);


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
