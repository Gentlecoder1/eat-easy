import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import { useEffect, type HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

function ThemeSwitchButton({ size = "md", className = "", ...rest }: Props) {
  const { theme, toggleTheme } = useTheme();

  const btnPx = size === "sm" ? 36 : size === "lg" ? 64 : 48;
  const iconPx = size === "sm" ? 16 : size === "lg" ? 28 : 20;

  const isDark = theme === "dark";

  // react-theme-switch-animation hook
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleTheme();
      try {
        toggleSwitchTheme();
      } catch {}
    }
  };

  // Sync animation state with context on mount
  useEffect(() => {
    try {
      if ((theme === "dark") !== isDarkMode) toggleSwitchTheme();
    } catch {}
    // run only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={() => {
        toggleTheme();
        try {
          toggleSwitchTheme();
        } catch {}
      }}
      ref={ref as unknown as React.Ref<HTMLButtonElement>}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${className}`}
      style={{
        width: `${btnPx}px`,
        height: `${btnPx}px`,
        backgroundColor: isDark ? "#2c2c45" : "var(--bar-bg)",
        padding: 6,
      }}
      {...rest}
    >
      {/* Centered sun & moon icons. The external library will animate the button via the ref. */}
      <span className="absolute inset-0 flex items-center justify-center text-yellow-400" aria-hidden>
        <MdOutlineWbSunny size={iconPx} style={{ opacity: isDark ? 0 : 1, transition: "opacity .24s" }} />
      </span>

      <span className="absolute inset-0 flex items-center justify-center text-gray-200" aria-hidden>
        <FaRegMoon size={iconPx} style={{ opacity: isDark ? 1 : 0, transition: "opacity .24s" }} />
      </span>
    </button>
  );
}

export default ThemeSwitchButton;
