import { HTMLAttributes } from "react";
import NextImage, { ImageProps } from "next/image";

type AnchorProps = HTMLAttributes<HTMLAnchorElement>;
export const Anchor = ({ children, ...props }: AnchorProps) => {
  return <a {...props}>{children}</a>;
};

// use Next Image for local images
export const Image = ({ children, src, ...props }: ImageProps) => {
  const isExternalUrl = (src: string) => {
    return /^https?:\/\//.test(src);
  };

  if (typeof src === "string" && isExternalUrl(src)) {
    return <img src={src} className="w-full rounded-sm" />;
  }

  // 16 : 9 default ratio
  const defaultWidth = 800;
  const defaultHeight = 450;

  return (
    <NextImage src={src} width={defaultWidth} height={defaultHeight} {...props}>
      {children}
    </NextImage>
  );
};
