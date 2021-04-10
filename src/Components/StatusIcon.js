import React from "react";

import "../Styles/component-styles.scss";

const StatusIcon = (props) => {
  return (
    <div className="d-flex p-2 justify-content-center align-items-center">
      <div className="pr-1">{props.name}:</div>
      <div className="circle p-2" style={{ backgroundColor: props.color }}>
      </div>
    </div>
  );
};

export default StatusIcon;
