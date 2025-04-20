import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import showdown from "showdown";
import PerplexityResponse from './PerplexityResponse'; // Importing PerplexityResponse

// Utility: Extract summary from text
function extractSummary(text) {
  if (!text) return "";
  const dashIdx = text.indexOf("---");
  if (dashIdx !== -1) return text.slice(0, dashIdx).trim();
  const firstPara = text.split("\n").find((p) => p.trim());
  return firstPara ? firstPara.trim() : text.slice(0, 300) + "...";
}

// Utility: Extract career paths from text
function extractCareers(text) {
  if (!text) return [];
  const lines = text.split("\n");
  const careers = [];
  for (let line of lines) {
    const match = line.match(/^\s*(?:\*\*)?\d+\.\s*(.+?)(?:\*\*|$)/);
    if (match) {
      careers.push(match[1].replace(/\*\*/g, "").trim());
    }
  }
  return careers;
}

export default function ResponseCard({ response }) {
  const [showFull, setShowFull] = useState(false);
  if (!response) return null;

  const { text, citations } = response;
  const summary = extractSummary(text);
  const careers = extractCareers(text);

  // Convert markdown to HTML using showdown
  const converter = new showdown.Converter({ tables: true, openLinksInNewWindow: true, simplifiedAutoLink: true });
  const htmlText = text ? converter.makeHtml(text) : "";

  // Utility to bold text before colon
  function boldBeforeColon(str) {
    if (!str) return "";
    return str.replace(/(^|\n)([^:\n]+:)/g, '$1<strong>$2</strong>');
  }

  return (
    <PerplexityResponse
      text={text}
      citations={citations}
      toolOutputs={response.tool_outputs}
    />
  );
}
