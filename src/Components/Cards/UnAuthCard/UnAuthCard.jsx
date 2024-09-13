import React, { useState } from "react";
import "./UnAuthCard.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import send from "../../../Assets/send.svg";
import { AiCard, UserCard } from "../../ChatCard/ChatCard";
import axios from "axios";
import Loader from "../../Loader/LoaderCard";

const modes = [
  "You are the top-tier AI Assistant. Provide the most accurate and comprehensive answers possible. Utilize any provided context to enhance your responses and ensure they are as helpful and relevant as possible.",
  "You are an advanced AI Assistant. Provide detailed and accurate responses based on your general knowledge. Do not rely on any external context or additional information.",
  "You can only answer questions about the provided context. If you know the answer but it is not based in the provided context, don't provide the answer, just state the answer is not in the context provided. Context information is below. And also provide which context you are using to generate the response.",
];

const UnAuthCard = ({ setDisplayCard }) => {
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
        const response = await getAnswer(inputValue, newController);
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
        console.log(messages);
        setTimeout(() => {
          setIsNewComponent(false);
        }, 2000);
      }
    }
  };

  const getAnswer = async (prompt, controller) => {
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LLM_API}/v1/chat/completions`,
        body,
        {
          signal: controller.signal,
        }
      );
      return response;
    } catch (err) {
      if (err.name === "CanceledError") {
        return "The request was stopped";
      }
      console.log(err);
      return "Something went wrong please try again later";
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="un-auth-card">
      <Header setDisplayCard={setDisplayCard} fullScreen={fullScreen} setFullScreen={setFullScreen} />
      <div className="un-auth-body">
        <div className="messages-container">
          <div className="disclaimer">
            <p>
              This is a custom LLM for answering questions about Docker.Answers are based on the
              contents of the documentation. This feature is experimental - rate the answers to let
              us know what you think!
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
        </div>
        <div className="select-container">
          <select
            id="dropdown-select"
            className="dropdown-select"
            value={modeIndex}
            onChange={(e) => setModeIndex(Number(e.target.value))}
          >
            <option value={0}>Internal Data & Web</option>
            <option value={1}>Web Only</option>
            <option value={2}>Internal Data only</option>
          </select>
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
      <Footer handleClear={handleClear} />
    </div>
  );
};

export default UnAuthCard;
