import React, { useContext } from "react";
import "./NameIcon.css";

const NameIcon = () => {
const user = "Pratoosh Saxena"
  const initials = user
    .split(" ")
    .map((n) => n[0])
    .join("");

  return <div className="text-icon">{initials}</div>;
};

export default NameIcon;