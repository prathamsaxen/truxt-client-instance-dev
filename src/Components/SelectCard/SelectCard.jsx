import React from "react";
import "./SelectCard.css";
import AI_ICON from "../../Assets/ai.png";

function SelectCard({ setDisplayCard }) {
  return (
    <div className="SelectCard">
      <button onClick={() => setDisplayCard("unauth")}>
        {/* <img src={AI_ICON} alt="Error in loading..." /> */}
        Ask AI
      </button>
    </div>
  );
}

export default SelectCard;
