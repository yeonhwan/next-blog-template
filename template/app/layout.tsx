import type { Metadata } from "next";
import "./globals.css";
import "./markdown.css";
import { MyFont } from "./fonts";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Example Blog",
  description: "Example Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={MyFont.variable} lang="ko" suppressHydrationWarning>
      <body className="antialiased w-full min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
