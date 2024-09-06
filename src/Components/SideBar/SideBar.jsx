import React from "react";
import "./SideBar.css";
import { RiLogoutCircleLine } from "react-icons/ri";

const SideBar = ({
  allLinks,
  currentSession,
  setCurrentSession,
  setMessages,
  userName,
  setUserName
}) => {
  const handleNewQuery = () => {
    setMessages([
      {
        sender: "Bot",
        text: "Hello, how can I assist you today?",
      },
    ]);
    setCurrentSession(0);
  };
  const handleLogout = () =>{
    setUserName(null)
  }
  return (
    <div className="side-bar">
      <div
        className={`sidebar-heading  ${currentSession === 0 ? "selected" : ""}`}
        onClick={handleNewQuery}
      >
        New Query
      </div>

      <div className="sidebar-heading">Recent Queries</div>
      <div className="recent-links">
        {allLinks.map((item) => (
          <div
            key={item._id}
            className={`sidebar-item ${
              currentSession === item._id ? "selected" : ""
            }`}
            onClick={() => setCurrentSession(item._id)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="logout-section">
        <p>{userName}</p>
        <button onClick={handleLogout} className="logout-button">
        <RiLogoutCircleLine />
        </button>
      </div>
    </div>
  );
};

export default SideBar;
