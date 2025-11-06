import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="h-9 w-9 rounded-full flex items-center justify-center border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:bg-light-surface-hover dark:hover:bg-dark-surface-hover transition-colors"
      title={`Switch to ${resolvedTheme === "light" ? "dark" : "light"} mode`}
    >
      {resolvedTheme === "light" ? (
        <Moon className="h-5 w-5 text-primary-500" />
      ) : (
        <Sun className="h-5 w-5 text-primary-400" />
      )}
    </button>
  )
}
