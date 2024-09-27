import React, { useState, useRef, useEffect } from "react";
import "./AI.css";
import send from "../../Assets/send.svg";
import { AiCard, UserCard } from "../ChatCard/ChatCard";
import Loader from "../Loader/LoaderCard";
import { LuMinimize } from "react-icons/lu";
import { FiMaximize } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
// import getAnswer from "../../utils/GetAnswer";
// import axios from "axios";

const AI = ({ Options, setContainerDisplay }) => {
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

  const modes = [
    "You are the top-tier AI Assistant. Provide the most accurate and comprehensive answers possible. Utilize any provided context to enhance your responses and ensure they are as helpful and relevant as possible.",
    "You are an advanced AI Assistant. Provide detailed and accurate responses based on your general knowledge. Do not rely on any external context or additional information.",
    "You can only answer questions about the provided context. If you know the answer but it is not based in the provided context, don't provide the answer, just state the answer is not in the context provided. Context information is below. And also provide which context you are using to generate the response.",
  ];

  const getAnswer = async (Options, prompt,  modeIndex) => {
    const body = {
      messages: [
        {
          role: "system",
          content: modes[modeIndex],
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
      use_context: modeIndex === 1 ? false : true,
      include_sources: modeIndex === 1 ? false : true,
    };
  
    console.log("GETANSWER Function API CALLED");
    console.log(Options.API);
  
    try {
      const response = await fetch(`${Options.API}v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        // signal: controller.signal,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      return data;
    } catch (err) {
      if (err.name === "AbortError") {
        return "The request was stopped";
      }
      console.log(err);
      return "Something went wrong, please try again later";
    }
  };
  

  const handleSend = async () => {
    console.log("Sent Button CLicked!");
    if (inputValue.trim() !== "") {
      setIsLoading(true);
      setLoadingValue(inputValue);
      if (inputValue) {
        setInputValue("");
      }
      console.log("Step 2 -> HIT CONTROLLER SENT");
      // const newController = new AbortController();
      // setController(newController);

      console.log("TRY CATCH BLOCK STARTED");
      try {
        const response = await getAnswer(Options, inputValue, modeIndex);
        
        // console.log(response.choices[0].message.content);
        const responseText = response.choices[0].message.content;

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
              <p>{Options.Disclaimer}</p>
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
