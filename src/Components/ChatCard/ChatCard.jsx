import React, { useState } from "react";
import "./ChatCard.css";
import truxt_logo from "../../Assets/truxt_logo.svg";
import NameIcon from "../NameIcon/NameIcon";
import useParseText, { useParseLinks } from "../../hooks/ParseText";
import { IoCopyOutline } from "react-icons/io5";
import Markdown from "react-markdown";
import CodeContainer from "../CodeContainer/CodeContainer";
import Tooltip from "@mui/material/Tooltip";

// UserCard Component
export const UserCard = ({ text }) => {
  return (
    <div className="margin-top-response">
      <div className="card-header">
        <NameIcon />
        <h2>You</h2>
      </div>
      <div className="card-content">{text}</div>
    </div>
  );
};

// AI card component
export const AiCard = ({ text }) => {
  const content = useParseText(text);
  const links = useParseLinks(text);

  // State to manage tooltip visibility
  const [copyTooltip, setCopyTooltip] = useState("Copy");

  // Buttons data
  const buttons = [
    {
      button: "Copy",
      icon: IoCopyOutline,
      tooltip: copyTooltip,
    },
  ];

  // Function to copy the text content of the AI card
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
        setCopyTooltip("Copied");
        setTimeout(() => setCopyTooltip("Copy"), 2000); // Reset tooltip after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="margin-top-response">
      <div className="card-header">
        <img src={truxt_logo} alt="Error in loading..." />
        <h2>Truxt</h2>
      </div>
      <div className="card-content">
        <div className="parsed-text visible">
          <Markdown
            children={content}
            components={{
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <CodeContainer
                    {...rest}
                    code={String(children).replace(/\n$/, "")}
                    language={match[1]}
                  />
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          />
          {links}
        </div>
        <div className="button-group">
          {buttons.map((btn, index) => (
            <Tooltip key={index} title={btn.tooltip}>
              <button className="icon-button" onClick={handleCopy}>
                <btn.icon />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
};
