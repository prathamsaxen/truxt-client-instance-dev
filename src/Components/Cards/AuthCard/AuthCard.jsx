import React, { useEffect, useState } from "react";
import "./AuthCard.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import send from "../../../Assets/send.svg";
import { AiCard, UserCard } from "../../ChatCard/ChatCard";
import axios from "axios";
import Loader from "../../Loader/LoaderCard";
import LoginBox from "../../LoginBox/LoginBox";
import AuthFooter from "../../Footer/AuthFooter";
import SideBar from "../../SideBar/SideBar";

const modes = [
  "You are the top-tier AI Assistant. Provide the most accurate and comprehensive answers possible. Utilize any provided context to enhance your responses and ensure they are as helpful and relevant as possible.",
  "You are an advanced AI Assistant. Provide detailed and accurate responses based on your general knowledge. Do not rely on any external context or additional information.",
  "You can only answer questions about the provided context. If you know the answer but it is not based in the provided context, don't provide the answer, just state the answer is not in the context provided. Context information is below. And also provide which context you are using to generate the response.",
];

const AuthCard = ({setDisplayCard }) => {
  const [inputValue, setInputValue] = useState("");
  const [modeIndex, setModeIndex] = useState(0);
  const [loadingValue, setLoadingValue] = useState("");
  const [controller, setController] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewComponent, setIsNewComponent] = useState(false);
  const [userName, setUserName] = useState(null);
  const [allLinks, setAllLinks] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [currentSession, setCurrentSession] = useState(0);
  const [messages, setMessages] = useState([
    {
      sender: "Bot",
      text: "Hello, how can I assist you today?",
    },
  ]);
  const [isLoginBoxVisible, setIsLoginBoxVisible] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const addSessionConversation = async (query, response) => {
    const token = localStorage.getItem("token");
    const body = {
      messageObject: {
        query: query,
        response: response,
      },
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/conversations/store/${currentSession}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res;
    } catch (err) {
      console.log(err);
      return "Something went wrong please try again later";
    }
  };

  const handleLoginShow = () => {
    if (!userName) {
      const loginBox = document.querySelector(".login-box");
      const currentDisplay = window.getComputedStyle(loginBox).display;

      if (currentDisplay === "none") {
        loginBox.style.display = "block";
      } else {
        loginBox.style.display = "none";
      }
    } else {
      setUserName(null);
    }
  };

  const handleSend = async () => {
    setIsNewComponent(true);
    // setNoConversation(false);
    if (inputValue.trim() !== "") {
      setIsLoading(true);
      setLoadingValue(inputValue);
      setInputValue("");

      const newController = new AbortController();
      setController(newController);

      if (!userName) {
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
          setTimeout(() => {
            setIsNewComponent(false);
          }, 2000);
        }
      } else {
        if (currentSession !== 0) {
          try {
            const response = await getAnswer(inputValue, newController);
            const responseText = response?.data.choices[0].message.content;

            const addedConversations = await addSessionConversation(inputValue, responseText);

            setMessages((prevMessages) => [
              ...prevMessages,
              { sender: "User", text: inputValue },
              { sender: "Ai", text: responseText },
            ]);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
            setTimeout(() => {
              fetchChats(currentSession);
            }, 3000);
          }
        } else {
          try {
            const response = await getAnswer(inputValue, newController);
            const responseText = response?.data.choices[0].message.content;

            const new_chat_response = await axios.post(
              `${process.env.REACT_APP_API}/api/conversations/store`,
              {
                messageObject: {
                  query: inputValue,
                  response: responseText,
                },
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            // Formatting the link id and title
            const newLink = {
              _id: new_chat_response.data.data._id,
              title: new_chat_response.data.data.title,
            };
            setAllLinks((prevLinks) => [newLink, ...prevLinks]);

            // Navigate the user to the session created
            setCurrentSession(new_chat_response.data.data._id);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }
      }
    }
  };

  const handleClear = () => {
    setMessages([
      {
        sender: "Bot",
        text: "Hello, how can I assist you today?",
      },
    ]);
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

  const fetchChats = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const status = await axios.get(`${process.env.REACT_APP_API}/api/conversations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Formatting the messages from the response
      setMessages(
        status.data.data.flatMap((item) =>
          item.messages.flatMap((message) => [
            {
              sender: "User",
              text: message.messageObject.query,
              _id: message._id,
            },
            {
              sender: "Ai",
              text: message.messageObject.response || "Something went wrong",
              _id: message._id,
            },
          ])
        )
      );

      console.log(
        status.data.data.flatMap((item) =>
          item.messages.flatMap((message) => [
            { sender: "User", text: message.messageObject.query },
            {
              sender: "Ai",
              text: message.messageObject.response || "Something went wrong",
            },
          ])
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingChats(true);
        await fetchChats(currentSession);
      } catch (error) {
        console.error("Error fetching chats:", error);
      } finally {
        setLoadingChats(false);
      }
    };
    fetchData();
  }, [currentSession]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="auth-card">
      <Header setDisplayCard={setDisplayCard} fullScreen={fullScreen} setFullScreen={setFullScreen} />
      <div className="auth-body">
        {userName ? (
          <SideBar
            userName={userName}
            setUserName={setUserName}
            allLinks={allLinks}
            setMessages={setMessages}
            currentSession={currentSession}
            setCurrentSession={setCurrentSession}
          />
        ) : (
          <></>
        )}

        <div className="messages-box">
          {loadingChats ? (
            <div className="loading-banner"> Loading...</div>
          ) : (
            <div className="messages-container">
              <div className="disclaimer">
                <p>
                  This is a custom LLM for answering questions about Docker.Answers are based on the
                  contents of the documentation. This feature is experimental - rate the answers to
                  let us know what you think!
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
          )}

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
      </div>
      <AuthFooter userName={userName} handleClear={handleClear} handleLoginShow={handleLoginShow} />
      <LoginBox
        handleLoginShow={handleLoginShow}
        setUserName={setUserName}
        userName={userName}
        setAllLinks={setAllLinks}
      />
    </div>
  );
};

export default AuthCard;
