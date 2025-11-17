import { motion } from "motion/react";
import { useTheme } from "../hooks/useTheme";

interface Props {
  className?: string;
  size?: number; // px
}

export default function ThemeSwitchButton({
  className = "",
  size = 40,
}: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      whileTap={{ scale: 0.95 }}
      className={
        "flex items-center justify-center rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-(--purple-3) " +
        className
      }
      style={{ width: size, height: size }}
    >
      {/* Icon sits inside and uses currentColor */}
      {isDark ? (
        // Sun icon (light mode indicator)
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="w-5 h-5 text-(--orange-text)"
          initial={{ rotate: -20, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <g stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </motion.svg>
      ) : (
        // Moon icon (dark mode indicator)
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-(--neutral-800) dark:text-(--neutral-100)"
          initial={{ rotate: 10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </motion.svg>
      )}
    </motion.button>
  );
}
