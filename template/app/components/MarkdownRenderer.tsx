import type { MDXProvider } from "@mdx-js/react";
import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAddLiDepth from "@/components/rehypes/plugins/rehypeAddLiDepth";
import { transformerNotationDiff } from "@shikijs/transformers";

import {
  Anchor,
  BlockQuote,
  Bold,
  Code,
  H1,
  H2,
  H3,
  H4,
  Hr,
  Italic,
  LI,
  OL,
  Pargraph,
  Pre,
  StrThrough,
  UL,
  Image,
  TH,
  TD,
} from "@/components/rehypes/MarkdownComponents";

type MDXComponentOption = React.ComponentProps<typeof MDXProvider>["components"];
type RehyepePrettyCodeOptions = Parameters<typeof rehypePrettyCode>[0];

/**
  This is where your Markdown data is parsed and converted into HTML by using Rehype
  You can customize all the styles and structure by changing each components
**/

export const MarkdownRenderer = ({ source, ...props }: MDXRemoteProps) => {
  const components: MDXComponentOption = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    hr: Hr,
    p: Pargraph,
    strong: Bold,
    em: Italic,
    del: StrThrough,
    blockquote: BlockQuote,
    ul: UL,
    ol: OL,
    li: LI,
    a: Anchor,
    pre: Pre,
    code: Code,
    img: Image,
    th: TH,
    td: TD,
  };

  /**
   code preview is done via Shiki and Rehype Pretty Code 
   Refer to its doc for more customization options

   Shiki: https://shiki.matsu.io/
   Rehype Pretty Code: https://rehype-pretty.pages.dev
  **/

  const shikiCodeOptions: RehyepePrettyCodeOptions = {
    theme: {
      light: "github-light",
      dark: "material-theme-darker",
    },
    grid: true,
    transformers: [transformerNotationDiff()],
  };

  return (
    <section id="rehype">
      <MDXRemote
        options={{
          mdxOptions: {
            // github style markdown extension
            remarkPlugins: [remarkGfm],
            // code preview + adding list item depth option plugin
            rehypePlugins: [[rehypePrettyCode, shikiCodeOptions], rehypeAddLiDepth],
          },
        }}
        components={{ ...components }}
        source={source}
        {...props}
      />
    </section>
  );
};
