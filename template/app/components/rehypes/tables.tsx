import { HTMLAttributes } from "react";

type TableCellProps = HTMLAttributes<HTMLTableCellElement>;
const TH = ({ children, ...props }: TableCellProps) => <th {...props}>{children}</th>;

const TD = ({ children, ...props }: TableCellProps) => <td {...props}>{children}</td>;

export { TH, TD };
