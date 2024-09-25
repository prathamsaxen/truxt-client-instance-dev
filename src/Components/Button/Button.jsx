import React from "react";
import "./Button.css";

function Button({ ButtonText, setContainerDisplay }) {
  const handleClickToDisplay=()=>{
    setContainerDisplay(true);
    console.log("Button CLikced");
  }
  return (
    <div className="Button">
      <button onClick={handleClickToDisplay}>{ButtonText}</button>
    </div>
  );
}

export default Button;
