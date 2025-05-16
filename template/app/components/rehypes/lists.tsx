import { HTMLAttributes } from "react";

type UlProps = HTMLAttributes<HTMLUListElement>;

export const UL = ({ children, ...props }: UlProps) => {
  return <ul {...props}>{children}</ul>;
};

export const OL = ({ children, ...props }: UlProps) => {
  return <ol {...props}>{children}</ol>;
};

type LiProps = HTMLAttributes<HTMLLIElement>;

export const LI = ({ children, className, ...props }: LiProps) => {
  return <li {...props}>{children}</li>;
};
