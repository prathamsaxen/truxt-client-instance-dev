import React from "react";
import CodeContainer from "../Components/CodeContainer/CodeContainer"

const target = "_blank"

const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const useParseText = (text) => {
  // console.log(text);
  if (typeof text !== "string") {
    console.warn("parseText function received non-string input:", text);
    return null; // or return a fallback value like an empty string or an empty div
  }

  const codeContainerRegex = /```([\s\S]*?)```/g;
  const parts = text.split(codeContainerRegex);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return <CodeContainer key={index} code={part} />;
    } else {
      let processedPart = escapeHtml(part)
      .replace(
        /Include these search engine result links if relevant:\s*\[([^\]]+)\]/g,
        () => {
          return ``;
        }
      )
      .replace(
        /For more information, please check out the links below:\s*\[([^\]]+)\]/g,
        () => {
          return ``;
        }
      )   
        .replace(
          /(\s|^)(https?:\/\/[^\s]+)/g,
          `$1<a href="$2" target=${target}>$2</a>`
        )
        .replace(
          /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/g,
          `<a href="$2" target=${target}>$1</a>`
        )
        .replace(
          /\((https?:\/\/[^\s]+?)\)/g,
          `<a href="$1" target=${target}>$1</a>`
        )
        .replace(
          /\['(https?:\/\/[^\s']+)'(?:,\s*)?'(https?:\/\/[^\s']+)'\]/g,
          (match, p1, p2) =>
            `[<a href="${p1}" target=${target}>${p1}</a>, <a href="${p2}" target=${target}>${p2}</a>]`
        )
        // Update bolding logic
        .replace(/\*\*(.*?)\*\*/g, (match, p1) => {
          if (/<\/?ul>|<\/?li>/.test(part)) {
            return p1;
          }
          return `<strong>${p1}</strong>`;
        })
        .replace(/`([^`]+)`/g, "<strong>$1</strong>") // Bolding text between backticks
        .replace(/^###\s*"(.*?)"$/gm, "<h5 class='text-justify'>$1</h5>")
        .replace(/^###\s*'(.*?)'$/gm, "<h5 class='text-justify'>$1</h5>")
        .replace(/^###\s*(.*)$/gm, "<h5 class='text-justify'>$1</h5>")
        .replace(/(\n\d+\.\s.*?)(?=(\n\d+\.\s|$))/gs, (match) =>
          match.replace(
            /(\n\s*-\s.*?)(?=(\n\s*-\s|(\n\d+\.\s|$)))/gs,
            (subMatch) => `<ul><li>${subMatch.trim().slice(2)}</li></ul>`
          )
        )
        .replace(/<\/ul>\s*<ul>/g, "")
        .replace(
          /(\n\d+\.\s.*?)(?=(\n\d+\.\s|$))/gs,
          (match) => `<div class='text-justify'>${match.trim()}</div>`
        )
        .replace(
          /(:\s*)((?:-\s.*(?:\n|$))+)/g,
          (match, p1, p2) =>
            `${p1}<ul>${p2
              .split("\n")
              .filter((line) => line.trim().startsWith("-"))
              .map((line) => `<li>${line.trim().slice(1).trim()}</li>`)
              .join("")}</ul>`
        );

      return (
        <div key={index} dangerouslySetInnerHTML={{ __html: processedPart }} />
      );
    }
  });

};

function extractFormattedText(input) {
  const regex = /(For more information, please check out the links below:|Include these search engine result links if relevant:)\s*\['https?:\/\/[^\]]+'\]/;
  const match = input.match(regex);
  return match ? match[0] : null;
}

const summariseLink = (link) => {
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
}

export const useParseLinks = (t) => {
  const text = extractFormattedText(t)
  // console.log(text);
  if (typeof text !== "string") {
    console.warn("parseText function received non-string input:", text);
    return ""; // Return an empty string for non-string input
  }

  // Extract and process only the relevant parts
  const processedPart = text
    .replace(
      /Include these search engine result links if relevant:\s*\[([^\]]+)\]/g,
      (match, p1) => {
        const links = p1
          .split(", ")
          .map((link) => link.replace(/^'|'$/g, "").trim());
        return `<div>Include these search engine result links if relevant:</div>${links
          .map(
            (link) =>
              `<li><a className="chat-last-link" href="${link}" target="_blank" rel="noopener noreferrer">${summariseLink(link)}</a></li>`
          )
          .join("\n")}`;
      }
    )
    .replace(
      /For more information, please check out the links below:\s*\[([^\]]+)\]/g,
      (match, p1) => {
        const links = p1
          .split(", ")
          .map((link) => link.replace(/^'|'$/g, "").trim());
        return `<div>For more information, please check out the links below:</div>${links
          .map(
            (link) =>
              `<li><a className="chat-last-link" href="${link}" target="_blank" rel="noopener noreferrer">${summariseLink(link)}</a></li>`
          )
          .join("\n")}`;
      }
    );

  // If processedPart is empty or does not contain the relevant links, return an empty string
  if (!processedPart || (!processedPart.includes("Include these search engine result links if relevant:") && !processedPart.includes("For more information, please check out the links below:"))) {
    return ""; // Return empty string if no relevant part is found
  }

  // Return the processed HTML content
  return (
    <div dangerouslySetInnerHTML={{ __html: processedPart }} />
  );
};

export default useParseText;