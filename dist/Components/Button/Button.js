"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./Button.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Button(_ref) {
  let {
    ButtonText,
    setContainerDisplay
  } = _ref;
  const handleClickToDisplay = () => {
    setContainerDisplay(true);
    console.log("Button CLikced");
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Button"
  }, /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClickToDisplay
  }, ButtonText));
}
var _default = exports.default = Button;