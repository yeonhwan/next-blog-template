# Introduce

🤖 Created by `@yeonhwan/create-next-blog-template`

## 🌲 Project trees

```bash
.
├── app
│   ├── actions
│   │   ├── example.md
│   │   └── posts.ts
│   ├── assets
│   │   └── fonts
│   │       └── Roboto-VariableFont.ttf
│   ├── components
│   │   ├── MarkdownRenderer.tsx
│   │   ├── rehypes
│   │   │   ├── attachments.tsx
│   │   │   ├── codings.tsx
│   │   │   ├── etc.tsx
│   │   │   ├── headings.tsx
│   │   │   ├── lists.tsx
│   │   │   ├── MarkdownComponents.tsx
│   │   │   ├── paragraphs.tsx
│   │   │   ├── plugins
│   │   │   │   └── rehypeAddLiDepth.ts
│   │   │   └── tables.tsx
│   │   └── ThemeSwitch.tsx
│   ├── fonts.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── markdown.css
│   ├── page.tsx
│   └── posts
│       ├── [slug]
│       │   └── page.tsx
│       └── page.tsx
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   └── robots.txt
├── README.md
├── svgr.d.ts
└── tsconfig.json

```

---

## 📝 Explaination

### Routing

- Pre-defined `posts/`, `posts/[slug]` pages are prepared
- `posts/page.tsx` is for rendering list of posts and `posts/[slug]/page.tsx` for rendering individual post
- Pages are server-component by default to call server actions.

### Next Config

- Only config is used inside `Next` is `SVGR` settings.
- If you don't want to manage your `*.svg` files then delete following setups
  1. remove `nextConfig` contents in `next.config.ts` and make it default of `Next JS`
  2. remove `svgr.d.ts`
  3. remove `svgr.d.ts` inside `include` fileds in `tsconfig.json`

### Styling

- pre-defined template for

  1. fonts at `fonts.ts / layout.tsx / globals.css`
  2. breakpoint at `globals.css`
  3. color-palette at `globals.css`

- You can configure them on your own.

### Actions

- Example server actions for getting markdown contents is placed.
- Example data is fetched by using File System.
- You can write your own backend and CMS solution for the application.

### Markdwown Rendering

- Markdown Rendering is done by `next-remote-mdx`
- Pre-defined `MarkdownRenderer` is ready to render markdown contents as a string source.
- Basic markdown components is written inside `components/rehypes` directory.
- All of the markdown components are not styled and by default.\
  You have to bring your own style and structure.
- Image elements are set up to use\
  `Next <Image/>` for inner link image source
  `<img/>` for outer link image source

- Pre-defined elements list
  - Headings (H1 ~ H4)
  - Paragraphs (p, bold, italic, strike-through)
  - Blockquote
  - List (ul, ol, li, li with nested 3 levels)
  - Tables (th, td)
  - Anchor
  - Image
  - Hr

#### Extending Markdown Rendering

- Extending or Intercepting Markdown rendering-converting process done with its related plugins.\
   `Remark plugins` : For extending parsing markdown contents by using `Remark`\
   `Rehype plugins` : For extending converting markdown to HTML by using `Rehype`

  This is where the plugins are used in `components/MarkdownRenderer.tsx`

  ```javascript
  export const MarkdownRenderer = () => {
    //...
    return (
      <section id="rehype">
        <MDXRemote
          options={{
            mdxOptions: {
              // github style markdown extension
              remarkPlugins: [remarkGfm],
              // code preview + adding list item depth option plugin
              rehypePlugins: [
                [rehypePrettyCode, shikiCodeOptions],
                rehypeAddLiDepth,
              ],
            },
          }}
          components={{ ...components }}
          source={source}
          {...props}
        />
      </section>
    );
  };
  ```

- By default, `GFM remark plugin`, `Rehype-pretty-code plugin`, `rehypeAddLiDepth` are included.\
  `GFM: github style markdwon extension`\
  `Rehype-pretty-code: code highlighting extension`\
  `rehypeAddLiDepth: supporting for converting nested li items`

- You can remove each plugins by removing an item inside array and its dependencies.

#### Code Highlighting

- `components/rehype/codings.tsx`
- Code highlighting is done by `Rehype-pretty-code` & `Shiki`.\
  Availiable theme options can be found at Shiki docs
- Multiple themes (`github-light`, `material-theme-dark`) are used as default.\
   Multiple themes are managed by modifying `CSS` file and the `plugin`.

```CSS
/** markdown.css **/


/**
For mulitple themes style setting for Shiki code highlighting
If you use single code theme, you can delete styling below
**/

data-theme="light" {


[data-theme="light"] {
pre[data-theme*="github-light"],
code[data-theme*="github-light"] {
color: var(--shiki-light);
background-color: var(--shiki-light-bg);
}

code[data-theme*="github-light"] span {
color: var(--shiki-light);
}
}

[data-theme="dark"] {
figcaption[data-rehype-pretty-code-title=""],
pre[data-theme*="material-theme-darker"],
code[data-theme*="material-theme-darker"] {
color: var(--shiki-dark);
background-color: var(--shiki-dark-bg);
}

code[data-theme*="material-theme-darker"] span {
color: var(--shiki-dark);
}
}

```

- You can extend code-higlighting with more functionality like `adding line nubmers, hilighting line, showing file name...etc` \
  Refer to its docs and Shiki docs

### SEO / SSG

- SEO and SSG are set up with Next functionality `generateMetaData` and `generateStaticParams`
- You have to configure your own setups for customization.
- `Robots.txt` is included inside `public` directory

### Theme Switching

- Switching themes is done by `next-theme` which is adding `data-theme="dark,light"` attribute to tree.
- Reference its npm docs for how to use it.
- If you want to remove it, follow steps below.\
  1. Remove `Components/ThemeSwitch.tsx`
  2. Remove `<ThemeProvider>` in `layout.tsx`
  3. Remove `next-theme` package
