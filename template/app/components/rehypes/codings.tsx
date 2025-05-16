"use client";
import { HTMLAttributes, useState, useRef } from "react";
import { BaseHTMLProps } from "./MarkdownComponents";

type PreProps = HTMLAttributes<HTMLPreElement>;

export const Pre = ({ children, className, ...props }: PreProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  const copyHandler = (e: React.MouseEvent) => {
    if (!preRef.current) return;
    const copyTarget = Array.from(preRef.current.children).find((node) => node.nodeName === "CODE");
    if (!copyTarget) return;

    const content = copyTarget.textContent!;

    try {
      navigator.clipboard.writeText(content);
    } catch {
      window.alert("Copy to clipboard is failed. Check network environment is secured");
    }
  };

  return (
    <pre ref={preRef} {...props}>
      <span onClick={copyHandler}>Copy</span>
      {children}
    </pre>
  );
};

export const Code = ({ children, ...props }: BaseHTMLProps) => {
  return (
    <code className="flex overflow-x-scroll" {...props}>
      {children}
    </code>
  );
};
