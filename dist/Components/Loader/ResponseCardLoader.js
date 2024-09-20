"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _material = require("@mui/material");
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ResponseCardLoader = () => {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "response-card-loader"
  }, /*#__PURE__*/_react.default.createElement(_material.Skeleton, {
    variant: "rounded",
    height: 22,
    animation: "wave"
  }));
};
var _default = exports.default = ResponseCardLoader;