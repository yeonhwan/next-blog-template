import { HTMLAttributes } from "react";
import { BaseHTMLProps } from "./MarkdownComponents";

type PargraphProps = HTMLAttributes<HTMLParagraphElement>;

export const Pargraph = ({ children, ...props }: PargraphProps) => {
  return <p {...props}>{children}</p>;
};

export const Bold = ({ children, ...props }: BaseHTMLProps) => {
  return <strong {...props}>{children}</strong>;
};

export const Italic = ({ children, ...props }: BaseHTMLProps) => {
  return <em {...props}>{children}</em>;
};

type ModProps = HTMLAttributes<HTMLModElement>;
export const StrThrough = ({ children, ...props }: ModProps) => {
  return <del {...props}>{children}</del>;
};

type BlockQuoteProps = HTMLAttributes<HTMLQuoteElement>;

export const BlockQuote = ({ children, ...props }: BlockQuoteProps) => {
  return <blockquote {...props}>{children}</blockquote>;
};
