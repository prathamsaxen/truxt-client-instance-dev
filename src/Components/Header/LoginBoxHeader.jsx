import React, { useState } from "react";
import "./Header.css";
import { LuMinimize } from "react-icons/lu";
import { FiMaximize } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const LoginBoxHeader = ({  handleLoginShow }) => {

  return (
    <div className="header">
      <p>Log In</p>
      <div className="header-buttons">
        <button className="toggle-size-buttons" onClick={handleLoginShow}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default LoginBoxHeader;
