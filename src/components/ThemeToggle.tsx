"use client";

import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <Button variant="ghost" size="sm">...</Button>;
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {theme === "light" ? "☀️" : "🌙"}
    </Button>
  );
}