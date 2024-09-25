"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserCard = exports.AiCard = void 0;
var _react = _interopRequireWildcard(require("react"));
require("./ChatCard.css");
var _truxt_logo = _interopRequireDefault(require("../../Assets/truxt_logo.svg"));
var _NameIcon = _interopRequireDefault(require("../NameIcon/NameIcon"));
var _ParseText = _interopRequireWildcard(require("../../hooks/ParseText"));
var _io = require("react-icons/io5");
var _reactMarkdown = _interopRequireDefault(require("react-markdown"));
var _CodeContainer = _interopRequireDefault(require("../CodeContainer/CodeContainer"));
var _Tooltip = _interopRequireDefault(require("@mui/material/Tooltip"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// UserCard Component
const UserCard = _ref => {
  let {
    text
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "margin-top-response"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/_react.default.createElement(_NameIcon.default, null), /*#__PURE__*/_react.default.createElement("h2", null, "You")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content"
  }, text));
};

// AI card component
exports.UserCard = UserCard;
const AiCard = _ref2 => {
  let {
    text
  } = _ref2;
  const content = (0, _ParseText.default)(text);
  const links = (0, _ParseText.useParseLinks)(text);

  // State to manage tooltip visibility
  const [copyTooltip, setCopyTooltip] = (0, _react.useState)("Copy");

  // Buttons data
  const buttons = [{
    button: "Copy",
    icon: _io.IoCopyOutline,
    tooltip: copyTooltip
  }];

  // Function to copy the text content of the AI card
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("Text copied to clipboard");
      setCopyTooltip("Copied");
      setTimeout(() => setCopyTooltip("Copy"), 3000); // Reset tooltip after 2 seconds
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "margin-top-response"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _truxt_logo.default,
    alt: "Error in loading..."
  }), /*#__PURE__*/_react.default.createElement("h2", null, "Truxt")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "parsed-text visible"
  }, /*#__PURE__*/_react.default.createElement(_reactMarkdown.default, {
    children: content,
    components: {
      code(props) {
        const {
          children,
          className,
          node,
          ...rest
        } = props;
        const match = /language-(\w+)/.exec(className || "");
        return match ? /*#__PURE__*/_react.default.createElement(_CodeContainer.default, _extends({}, rest, {
          code: String(children).replace(/\n$/, ""),
          language: match[1]
        })) : /*#__PURE__*/_react.default.createElement("code", _extends({}, rest, {
          className: className
        }), children);
      }
    }
  }), links), /*#__PURE__*/_react.default.createElement("div", {
    className: "button-group"
  }, buttons.map((btn, index) => /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    key: index,
    title: btn.tooltip
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "icon-button",
    onClick: handleCopy,
    title: ""
  }, /*#__PURE__*/_react.default.createElement(btn.icon, null)))))));
};
exports.AiCard = AiCard;