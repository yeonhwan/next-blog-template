import { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const H1 = ({ children, ...props }: HeadingProps) => {
  return <h1 {...props}>{children}</h1>;
};

export const H2 = ({ children, ...props }: HeadingProps) => {
  return <h2 {...props}>{children}</h2>;
};

export const H3 = ({ children, ...props }: HeadingProps) => {
  return <h3 {...props}>{children}</h3>;
};

export const H4 = ({ children, ...props }: HeadingProps) => {
  return <h4 {...props}>{children}</h4>;
};
