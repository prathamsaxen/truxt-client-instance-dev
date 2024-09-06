import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./CodeContainer.css";
import { IoCopyOutline } from "react-icons/io5";
import { Tooltip } from "@mui/material";

// Function to find out that the code have a specific language specified
const removeFirstWord = (code) => {
  const lines = code.split("\n");
  const firstLine = lines.shift().trim();
  let remainingLines
  if(firstLine){
    remainingLines = lines.join("\n").trim();
  }else{
    remainingLines = lines.map(line => line.trim()).join("\n").trim();
  }
  return { firstWord: firstLine, remainingString: remainingLines };
};

// Copy to clipboard function of the code container
const copyToClipboard = (code, setTooltipTitle) => {
  navigator.clipboard.writeText(code)
    .then(() => {
      setTooltipTitle("Copied to clipboard!");
      setTimeout(() => setTooltipTitle("Copy"), 4000);
    })
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
};

const CodeContainer = ({ code }) => {
  const { firstWord: language, remainingString: codeString } = removeFirstWord(code);
  const showLineNumbers = codeString.split("\n").length > 1;
  const [tooltipTitle, setTooltipTitle] = useState("Copy");

  return (
    <div className="code-container">
      {language && (
        <div className="top-bar">
          <span className="language">{language}</span>
          <Tooltip title={tooltipTitle} placement="top" arrow>
            <button
              className="copy-button"
              onClick={() => copyToClipboard(codeString, setTooltipTitle)}
            >
              <IoCopyOutline style={{height:"14px",width:"14px" }}/>
            </button>
          </Tooltip>
        </div>
      )}
      <SyntaxHighlighter
        language={language || "text"}
        style={dark}
        showLineNumbers={showLineNumbers}
      >
        {codeString}
      </SyntaxHighlighter>
      {!language && (
        <div className="single-line-copy">
          <Tooltip title={tooltipTitle} placement="top" arrow>
            <button
              className="copy-button-inside"
              onClick={() => copyToClipboard(codeString, setTooltipTitle)}
            >
              <IoCopyOutline style={{height:"14px",width:"14px"}}/>
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default CodeContainer;