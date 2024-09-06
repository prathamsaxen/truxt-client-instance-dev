import React, { useEffect, useState } from "react";
import "../Cards/UnAuthCard/UnAuthCard.css";
import NameIcon from "../NameIcon/NameIcon";
import truxt_logo from "../../Assets/truxt_logo.svg";
import ResponseCardLoader from "../Loader/ResponseCardLoader";

function ChatCardAI() {
  return (
    <div className={"margin-top-response"}>
      <div className="card-header">
        <img src={truxt_logo} alt="Error in loading..." />
        <h2>Truxt</h2>
      </div>
      <div className="card-content">
        <ResponseCardLoader />
      </div>
    </div>
  );
}

function ChatCardUser({ request }) {
  return (
    <div className="margin-top-response">
      <div className="card-header">
        <NameIcon />
        <h2>You</h2>
      </div>
      <div className="card-content">{request}</div>
    </div>
  );
}

function Loader({ request }) {
  return (
    <div className="chat-card">
      <ChatCardUser request={request} />
      <ChatCardAI />
    </div>
  );
}

export default Loader;