import React from "react";
import "./Footer.css";
import truxtHD from "../../Assets/truxt-icon.png";

const AuthFooter = ({ handleClear, handleLoginShow, userName }) => {
  return (
    <div className="footer">
      {!userName && <button className="class-button" onClick={handleLoginShow}>
         Login
      </button>}
      
      <p>
        Powered by
        <a href="http://dev.truxt.xyz/">Truxt</a>
        {/* <img src={truxtHD} alt="logo" className="footer-logo"/> */}
      </p>
      <button className="class-button" onClick={handleClear}>
        Clear
      </button>
    </div>
  );
};

export default AuthFooter;
