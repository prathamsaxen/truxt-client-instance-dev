"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./AI.css");
var _send = _interopRequireDefault(require("../../Assets/send.svg"));
var _ChatCard = require("../ChatCard/ChatCard");
var _LoaderCard = _interopRequireDefault(require("../Loader/LoaderCard"));
var _lu = require("react-icons/lu");
var _fi = require("react-icons/fi");
var _io = require("react-icons/io");
var _GetAnswer = _interopRequireDefault(require("../../utils/GetAnswer"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AI = _ref => {
  let {
    setContainerDisplay,
    API
  } = _ref;
  const [inputValue, setInputValue] = (0, _react.useState)("");
  const [modeIndex, setModeIndex] = (0, _react.useState)(0);
  const [loadingValue, setLoadingValue] = (0, _react.useState)("");
  const [controller, setController] = (0, _react.useState)(null);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [isNewComponent, setIsNewComponent] = (0, _react.useState)(false);
  const [fullScreen, setFullScreen] = (0, _react.useState)(false);
  const [messages, setMessages] = (0, _react.useState)([{
    sender: "Bot",
    text: "Hello, how can I assist you today?"
  }]);
  const handleClear = () => {
    setMessages([{
      sender: "Bot",
      text: "Hello, how can I assist you today?"
    }]);
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
        const response = await (0, _GetAnswer.default)(API, inputValue, newController, modeIndex);
        const responseText = response?.data.choices[0].message.content;
        setMessages(prevMessages => [...prevMessages, {
          sender: "User",
          text: inputValue
        }, {
          sender: "Ai",
          text: responseText
        }]);
      } catch (error) {
        console.log(error);
        setMessages(prevMessages => [...prevMessages, {
          sender: "User",
          text: inputValue
        }, {
          sender: "Ai",
          text: "Something went wrong"
        }]);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setIsNewComponent(false);
        }, 2000);
      }
    }
  };
  const handleKeyDown = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };
  const messagesEndRef = (0, _react.useRef)(null);

  // Scroll to bottom when new messages are added or loading starts
  (0, _react.useEffect)(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages, isLoading]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "ai-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: `un-auth-card ${fullScreen ? "max-card-dimensions" : ""}`
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "header"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Ask AI"), /*#__PURE__*/_react.default.createElement("div", {
    className: "header-buttons"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "toggle-size-buttons",
    onClick: () => setFullScreen(!fullScreen)
  }, fullScreen ? /*#__PURE__*/_react.default.createElement(_lu.LuMinimize, null) : /*#__PURE__*/_react.default.createElement(_fi.FiMaximize, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "toggle-size-buttons",
    onClick: () => setContainerDisplay(false)
  }, /*#__PURE__*/_react.default.createElement(_io.IoMdClose, null)))), /*#__PURE__*/_react.default.createElement("div", {
    className: "un-auth-body"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "messages-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "disclaimer"
  }, /*#__PURE__*/_react.default.createElement("p", null, "This is a custom LLM for answering questions about Docker.Answers are based on the contents of the documentation. This feature is experimental - rate the answers to let us know what you think!")), messages.map((message, index) => /*#__PURE__*/_react.default.createElement("div", {
    key: index
  }, message.sender === "User" ? /*#__PURE__*/_react.default.createElement(_ChatCard.UserCard, {
    text: message.text
  }) : /*#__PURE__*/_react.default.createElement(_ChatCard.AiCard, {
    text: message.text
  }))), isLoading && /*#__PURE__*/_react.default.createElement(_LoaderCard.default, {
    request: loadingValue
  }), /*#__PURE__*/_react.default.createElement("div", {
    ref: messagesEndRef
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "input-container"
  }, /*#__PURE__*/_react.default.createElement("textarea", {
    type: "text",
    placeholder: "Your question here",
    value: inputValue,
    onChange: event => setInputValue(event.target.value),
    onKeyDown: handleKeyDown
  }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleSend
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _send.default,
    alt: "Send"
  }))))), /*#__PURE__*/_react.default.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/_react.default.createElement("p", null, "Powered by", /*#__PURE__*/_react.default.createElement("a", {
    href: "http://dev.truxt.xyz/"
  }, "Truxt")), /*#__PURE__*/_react.default.createElement("button", {
    className: "class-button",
    onClick: handleClear
  }, "Clear")), " "));
};
var _default = exports.default = AI;