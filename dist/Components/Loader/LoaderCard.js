"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("../AI/AI.css");
var _NameIcon = _interopRequireDefault(require("../NameIcon/NameIcon"));
var _truxt_logo = _interopRequireDefault(require("../../Assets/truxt_logo.svg"));
var _ResponseCardLoader = _interopRequireDefault(require("../Loader/ResponseCardLoader"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ChatCardAI() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "margin-top-response"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: _truxt_logo.default,
    alt: "Error in loading..."
  }), /*#__PURE__*/_react.default.createElement("h2", null, "Truxt")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/_react.default.createElement(_ResponseCardLoader.default, null)));
}
function ChatCardUser(_ref) {
  let {
    request
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "margin-top-response"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/_react.default.createElement(_NameIcon.default, null), /*#__PURE__*/_react.default.createElement("h2", null, "You")), /*#__PURE__*/_react.default.createElement("div", {
    className: "card-content"
  }, request));
}
function Loader(_ref2) {
  let {
    request
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "chat-card"
  }, /*#__PURE__*/_react.default.createElement(ChatCardUser, {
    request: request
  }), /*#__PURE__*/_react.default.createElement(ChatCardAI, null));
}
var _default = exports.default = Loader;