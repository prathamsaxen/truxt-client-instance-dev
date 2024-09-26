"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useParseLinks = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const useParseText = (text, animate) => {
  return text.replace(/Include these search engine result links if relevant:\s*\[([^\]]+)\]/g, () => {
    return ``;
  }).replace(/For more information, please check out the links below:\s*\[([^\]]+)\]/g, () => {
    return ``;
  }).replace(/Source:\s*\[([^\]]+)\]|Source:[^]*$/g, () => {
    return ``;
  });
};
function extractFormattedText(input) {
  const regex = /(For more information, please check out the links below:|Include these search engine result links if relevant:)\s*\['https?:\/\/[^\]]+'\]/;
  const match = input.match(regex);
  return match ? match[0] : null;
}
const summariseLink = link => {
  const domainRegex = /:\/\/(www\.)?([^\/:]+)/;
  const match = link.match(domainRegex);
  if (!match) {
    return "Invalid link";
  }
  const domain = match[2];
  const parts = domain.split('.').filter(part => part !== 'www');
  if (parts.length > 1) {
    return parts[parts.length - 2];
  }
  return parts[0];
};
function removeFirstNumberWithDot(str) {
  return str.replace(/^\d+\.\s*/, '');
}
const useParseLinks = t => {
  const text = extractFormattedText(t);
  let afterSource = true;
  if (typeof text !== "string") {
    console.warn("parseText function received non-string input:", text);
    return ""; // Return an empty string for non-string input
  }
  const sourceText = text.match(/Source:\s*(.*)/);
  const sourcePart = sourceText ? `<div>Source: ${sourceText[1]}</div>` : '';
  const processedPart = text.replace(/Include these search engine result links if relevant:\s*\[([^\]]+)\]/g, (match, p1) => {
    const links = p1.split(", ").map(link => link.replace(/^'|'$/g, "").trim());
    return `<div>Include these search engine result links if relevant:</div>${links.map(link => `<li><a className="chat-last-link" href="${link}" target="_blank" rel="noopener noreferrer">${summariseLink(link)}</a></li>`).join("\n")}`;
  }).replace(/For more information, please check out the links below:\s*\[([^\]]+)\]/g, (match, p1) => {
    const links = p1.split(", ").map(link => link.replace(/^'|'$/g, "").trim());
    return `<div>For more information, please check out the links below:</div>${links.map(link => `<li><a className="chat-last-link" href="${link}" target="_blank" rel="noopener noreferrer">${summariseLink(link)}</a></li>`).join("\n")}`;
  }).replace(/(Source:)/g, match => {
    afterSource = true;
    return "<strong>Source:</strong>";
  }).replace(/\*\*(.*?)\*\*/g, (match, p1) => {
    if (afterSource) {
      return p1;
    }
    return `<strong>${p1}</strong>`;
  }).replace(/`([^`]+)`/g, (match, p1) => {
    if (afterSource) {
      return p1;
    }
    return `<strong>${p1}</strong>`;
  }).replace(/(\n\d+\.\s.*?)(?=(\n\d+\.\s|$))/gs, match => {
    let content = match.trim();
    if (afterSource) {
      content = removeFirstNumberWithDot(content);
      return `<div class='source-link'><ul><li>${content}</li></ul></div>`;
    }
    return `<div class='text-justify'>${content}</div>`;
  });
  const combinedPart = `${processedPart}`;
  if (!combinedPart || !combinedPart.includes("Include these search engine result links if relevant:") && !combinedPart.includes("For more information, please check out the links below:") && !sourcePart) {
    return "";
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: combinedPart
    }
  });
};
exports.useParseLinks = useParseLinks;
var _default = exports.default = useParseText;