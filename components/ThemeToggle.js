"use client"

import { useTheme } from "@/context/ThemeContext"
import { SunIcon, MoonIcon } from "lucide-react"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex items-center">
      <SunIcon className="h-4 w-4 mr-1 text-yellow-500" />
      <button
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${
          theme === "dark" ? "bg-teal-600" : "bg-gray-200"
        }`}
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <span className="sr-only">Toggle theme</span>
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
            theme === "dark" ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
      <MoonIcon className="h-4 w-4 ml-1 text-indigo-400" />
    </div>
  )
}
