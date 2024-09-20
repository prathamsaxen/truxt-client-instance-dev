"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactSyntaxHighlighter = require("react-syntax-highlighter");
var _prism = require("react-syntax-highlighter/dist/esm/styles/prism");
require("./CodeContainer.css");
var _io = require("react-icons/io5");
var _material = require("@mui/material");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// Function to find out that the code have a specific language specified
const removeFirstWord = code => {
  const lines = code.split("\n");
  const firstLine = lines.shift().trim();
  let remainingLines;
  if (firstLine) {
    remainingLines = lines.join("\n").trim();
  } else {
    remainingLines = lines.map(line => line.trim()).join("\n").trim();
  }
  return {
    firstWord: firstLine,
    remainingString: remainingLines
  };
};

// Copy to clipboard function of the code container
const copyToClipboard = (code, setTooltipTitle) => {
  navigator.clipboard.writeText(code).then(() => {
    setTooltipTitle("Copied to clipboard!");
    setTimeout(() => setTooltipTitle("Copy"), 4000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};
const CodeContainer = _ref => {
  let {
    code,
    language
  } = _ref;
  const showLineNumbers = code.split("\n").length > 1;
  const [tooltipTitle, setTooltipTitle] = (0, _react.useState)("Copy");
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "code-container"
  }, language && /*#__PURE__*/_react.default.createElement("div", {
    className: "top-bar"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "language"
  }, language), /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: tooltipTitle,
    placement: "top",
    arrow: true
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "copy-button",
    onClick: () => copyToClipboard(code, setTooltipTitle)
  }, /*#__PURE__*/_react.default.createElement(_io.IoCopyOutline, {
    style: {
      height: "14px",
      width: "14px"
    }
  })))), /*#__PURE__*/_react.default.createElement(_reactSyntaxHighlighter.Prism, {
    language: language || "text",
    style: _prism.dark,
    showLineNumbers: showLineNumbers
  }, code), !language && /*#__PURE__*/_react.default.createElement("div", {
    className: "single-line-copy"
  }, /*#__PURE__*/_react.default.createElement(_material.Tooltip, {
    title: tooltipTitle,
    placement: "top",
    arrow: true
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "copy-button-inside",
    onClick: () => copyToClipboard(code, setTooltipTitle)
  }, /*#__PURE__*/_react.default.createElement(_io.IoCopyOutline, {
    style: {
      height: "14px",
      width: "14px"
    }
  })))));
};
var _default = exports.default = CodeContainer;