"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const themes = ["light", "system", "dark"];

  return (
    <div className="inline-flex p-1 rounded-full bg-card">
      {themes.map((mode) => (
        <button
          key={mode}
          className={`rounded-full p-2 ${
            theme === mode
              ? "bg-black text-white dark:bg-white dark:text-black"
              : ""
          }`}
          onClick={() => setTheme(mode)}
        >
          {mode === "light" ? (
            <Sun className="w-4 h-4" />
          ) : mode === "dark" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Monitor className="w-4 h-4" />
          )}
        </button>
      ))}
    </div>
  );
}
