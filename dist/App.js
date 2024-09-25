"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _TruxtModal = _interopRequireDefault(require("./TruxtModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ConfigurationAIClient = {
  API: process.env.REACT_APP_LLM_API,
  ButtonText: "ASK AI",
  Disclaimer: `This is a custom LLM for answering questions about Docker.Answers are based on the
                contents of the documentation. This feature is experimental - rate the answers to
                let us know what you think!`
};
function App() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_TruxtModal.default, {
    Options: ConfigurationAIClient
  }));
}
var _default = exports.default = App;