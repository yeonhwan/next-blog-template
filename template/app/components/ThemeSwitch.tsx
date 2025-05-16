"use client";

import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { setTheme } = useTheme();

  const handleThemeSwitch = (theme: string) => {
    setTheme(theme);
  };

  return (
    <p>
      <p
        onClick={() => handleThemeSwitch("light")}
        className="hover:cursor-pointer"
      >
        light
      </p>
      <p
        onClick={() => handleThemeSwitch("dark")}
        className="hover:cursor-pointer"
      />
      dark
    </p>
  );
}
