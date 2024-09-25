"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _TruxtModal = _interopRequireDefault(require("./TruxtModal"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// import TruxtModal  from "../dist/production";

function App() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "App"
  }, /*#__PURE__*/_react.default.createElement(_TruxtModal.default, {
    API: process.env.REACT_APP_LLM_API,
    ButtonText: "Ask AI"
  }));
}
var _default = exports.default = App;