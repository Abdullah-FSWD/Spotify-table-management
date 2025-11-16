import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "./ui/button";

export const ToggleTheme = () => {
  const { theme, toggleTheme } = useTheme();

  const accentColor = "#E91E63";

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className={`flex items-center gap-2 transition-all ${
        theme === "light"
          ? "border-gray-200 text-gray-600 hover:text-black hover:border-gray-300"
          : "border-gray-800 text-gray-400 hover:text-white"
      }`}
      style={
        theme === "dark"
          ? {
              borderColor: accentColor,
              color: accentColor,
            }
          : {}
      }
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <>
          <Moon className="w-4 h-4" />
          <span className="text-xs">Dark</span>
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          <span className="text-xs">Light</span>
        </>
      )}
    </Button>
  );
};
