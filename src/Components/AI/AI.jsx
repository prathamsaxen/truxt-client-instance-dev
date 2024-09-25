import React, { useState, useRef, useEffect } from "react";
import "./AI.css";
import send from "../../Assets/send.svg";
import { AiCard, UserCard } from "../ChatCard/ChatCard";
import Loader from "../Loader/LoaderCard";
import { LuMinimize } from "react-icons/lu";
import { FiMaximize } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import getAnswer from "../../utils/GetAnswer";

const AI = ({ Options, setContainerDisplay, API }) => {
  const [inputValue, setInputValue] = useState("");
  const [modeIndex, setModeIndex] = useState(0);
  const [loadingValue, setLoadingValue] = useState("");
  const [controller, setController] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewComponent, setIsNewComponent] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "Bot",
      text: "Hello, how can I assist you today?",
    },
  ]);

  const handleClear = () => {
    setMessages([
      {
        sender: "Bot",
        text: "Hello, how can I assist you today?",
      },
    ]);
  };

  const handleSend = async () => {
    if (inputValue.trim() !== "") {
      setIsLoading(true);
      setLoadingValue(inputValue);
      if (inputValue) {
        setInputValue("");
      }

      const newController = new AbortController();
      setController(newController);

      try {
        const response = await getAnswer(Options.API, inputValue, newController, modeIndex);
        const responseText = response?.data.choices[0].message.content;

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "User", text: inputValue },
          { sender: "Ai", text: responseText },
        ]);
      } catch (error) {
        console.log(error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "User", text: inputValue },
          { sender: "Ai", text: "Something went wrong" },
        ]);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsNewComponent(false);
        }, 2000);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const messagesEndRef = useRef(null);

  // Scroll to bottom when new messages are added or loading starts
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setContainerDisplay(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setContainerDisplay]);

  return (
    <div className="ai-wrapper">
      <div className={`un-auth-card ${fullScreen ? "max-card-dimensions" : ""}`}>
        <div className="header">
          <p>Ask AI</p>
          <div className="header-buttons">
            <button className="toggle-size-buttons" onClick={() => setFullScreen(!fullScreen)}>
              {fullScreen ? <LuMinimize /> : <FiMaximize />}
            </button>
            <button className="toggle-size-buttons" onClick={() => setContainerDisplay(false)}>
              <IoMdClose />
            </button>
          </div>
        </div>
        <div className="un-auth-body">
          <div className="messages-container">
            <div className="disclaimer">
              <p>
                {
                  Options.Disclaimer
                }
              </p>
            </div>
            {messages.map((message, index) => (
              <div key={index}>
                {message.sender === "User" ? (
                  <UserCard text={message.text} />
                ) : (
                  <AiCard text={message.text} />
                )}
              </div>
            ))}
            {isLoading && <Loader request={loadingValue} />}
            <div ref={messagesEndRef} />
          </div>
          <div className="input-container">
            <textarea
              type="text"
              placeholder="Your question here"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div>
              <button onClick={handleSend}>
                <img src={send} alt="Send" />
              </button>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            Powered by
            <a href="http://dev.truxt.xyz/">Truxt</a>
          </p>
          <button className="class-button" onClick={handleClear}>
            Clear
          </button>
        </div>{" "}
      </div>
    </div>
  );
};

export default AI;
