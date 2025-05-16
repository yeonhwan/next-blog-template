import { HTMLAttributes } from "react";

type HrProps = HTMLAttributes<HTMLHRElement>;

export const Hr = ({ children, ...props }: HrProps) => {
  return <hr {...props}>{children}</hr>;
};
