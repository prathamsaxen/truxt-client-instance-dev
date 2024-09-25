"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = _interopRequireDefault(require("./Components/Button/Button"));
var _AI = _interopRequireDefault(require("./Components/AI/AI"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function TruxtModal(_ref) {
  let {
    Options
  } = _ref;
  const [containerDisplay, setContainerDisplay] = (0, _react.useState)(false);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "Modal"
  }, containerDisplay ? /*#__PURE__*/_react.default.createElement(_AI.default, {
    setContainerDisplay: setContainerDisplay,
    Options: Options
  }) : null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    ButtonText: Options.ButtonText,
    setContainerDisplay: setContainerDisplay
  }));
}
var _default = exports.default = TruxtModal;