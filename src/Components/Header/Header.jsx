import React, { useState } from "react";
import "./Header.css";
import { LuMinimize } from "react-icons/lu";
import { FiMaximize } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Header = ({ handleSize, handleUnAuth }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleSize = () => {
    handleSize();
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="header">
      <p>Ask AI</p>
      <div className="header-buttons">
        <button className="toggle-size-buttons" onClick={toggleSize}>
          {isFullScreen ? <LuMinimize /> : <FiMaximize />}
        </button>
        <button className="toggle-size-buttons" onClick={handleUnAuth}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Header;
