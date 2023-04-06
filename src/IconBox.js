import React from "react";

function IconBox(props) {

  return (
    <div class Name="icon-box">
      <i className={`bi bi-image button-icon ${props.img ? null : "button-off"}`} onClick={() => props.handleButtonClick('img')}></i>
      <i className={`bi bi-bar-chart-fill button-icon ${props.graph ? null : "button-off"}`} onClick={() => props.handleButtonClick('graph')}></i>
      <i className={`"bi bi-body-text button-icon ${props.textBlock ? null : "button-off"}`} onClick={() => props.handleButtonClick('textBlock')}></i>
    </div>
  )
}


export default IconBox;