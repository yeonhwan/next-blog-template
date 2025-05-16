import type { HTMLAttributes } from "react";

import { H1, H2, H3, H4 } from "./headings";
import { Code, Pre } from "./codings";
import { Hr } from "./etc";
import { BlockQuote, Bold, Italic, Pargraph, StrThrough } from "./paragraphs";
import { LI, OL, UL } from "./lists";
import { Anchor, Image } from "./attachments";
import { TH, TD } from "./tables";

export type BaseHTMLProps = HTMLAttributes<HTMLElement>;

export {
  H1,
  H2,
  H3,
  H4,
  Hr,
  Pargraph,
  Bold,
  Italic,
  StrThrough,
  BlockQuote,
  UL,
  OL,
  LI,
  Anchor,
  Pre,
  Code,
  Image,
  TH,
  TD,
};
