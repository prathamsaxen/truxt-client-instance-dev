import React, { useContext } from "react";
import "./NameIcon.css";

const NameIcon = () => {
const user = "Pratoosh Garg"
  const initials = user
    .split(" ")
    .map((n) => n[0])
    .join("");

  return <div className="text-icon">{initials}</div>;
};

export default NameIcon;