import React from "react";
import "./Footer.css";
import truxtHD from "../../Assets/truxtHD.png"

const Footer = ({handleClear}) => {
  return (
    <div className="footer">
      <p>Powered by
        <img src={truxtHD} alt="logo" className="footer-logo"/>
      </p>
      <button className="class-button" onClick={handleClear}>Clear</button>
    </div>
  );
};

export default Footer;
