import React, { useState } from "react";
import "./Header.css";
import { LuMinimize } from "react-icons/lu";
import { FiMaximize } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Header = ({ handleSize, handleUnAuth, fullScreen, setFullScreen }) => {

  return (
    <div className="header">
      <p>Ask AI</p>
      <div className="header-buttons">
        <button className="toggle-size-buttons" onClick={()=>setFullScreen(!fullScreen)} >
          {fullScreen ? <LuMinimize /> : <FiMaximize />}
        </button>
        <button className="toggle-size-buttons" onClick={handleUnAuth}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Header;
