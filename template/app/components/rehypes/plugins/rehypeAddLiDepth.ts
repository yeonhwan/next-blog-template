/**
 * Delete this plugin if you don't want to use
 * A rehype plugin that adds `data-depth` and `data-parent` to <li> elements
 * depending on how deeply they are nested inside <ul> or <ol>.
 *
 * It also adds a `li-depth-{n}` class for Tailwind styling.
 */
export default function rehypeAddLiDepth() {
  return (tree: unknown) => {
    const walk = (node: any, depth: number = 0, parentType: "ul" | "ol" | null = null) => {
      if (node.type === "element") {
        const tag = node.tagName;

        // If we're entering a new list
        if (tag === "ul" || tag === "ol") {
          parentType = tag;
          depth += 1;
        }

        // If we're inside a list item
        if (tag === "li") {
          node.properties ??= {};

          // Add data attributes
          node.properties["data-info"] = `${depth}-${parentType}`;
          node.properties.className = [...(node.properties.className ?? []), `md-list-depth`];
        }
      }

      // Recurse into children
      if (Array.isArray(node.children)) {
        node.children.forEach((child: Element) => walk(child, depth, parentType));
      }
    };

    walk(tree);
  };
}
