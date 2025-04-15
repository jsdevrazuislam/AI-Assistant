import React from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import atomOneDark from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-dark";


SyntaxHighlighter.registerLanguage("javascript", js);
SyntaxHighlighter.registerLanguage("python", python);

interface Props {
  message: string;
}

export default function ChatFormatter({ message }: Props) {
  const segments: React.ReactNode[] = [];

  // Custom renderer for splitting markdown into parts
  const tokenizer = marked.lexer(message);
  tokenizer.forEach((token, index) => {
    if (token.type === "code") {
      segments.push(
        <div key={index} className="my-4 rounded-md overflow-hidden text-sm">
          <SyntaxHighlighter
            language={token.lang || "text"}
            style={atomOneDark}
            customStyle={{
              borderRadius: "0.5rem",
              padding: "1rem",
              fontSize: "0.85rem",
            }}
          >
            {token.text}
          </SyntaxHighlighter>
        </div>
      );
    } else {
      const html = DOMPurify.sanitize(marked.parser([token]));
      segments.push(
        <div
          key={index}
          className="text-base leading-relaxed my-2"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    }
  });

  return <div>{segments}</div>;
}
