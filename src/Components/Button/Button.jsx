import React from "react";
import "./Button.css";

function Button({ ButtonText, setContainerDisplay }) {
  return (
    <div className="Button">
      <button onClick={() => setContainerDisplay(true)}>{ButtonText}</button>
    </div>
  );
}

export default Button;
