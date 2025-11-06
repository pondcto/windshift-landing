"use client"

import { useEffect, useRef, useState } from "react"
import { User as UserIcon } from "lucide-react"

export default function UserMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return
      if (!menuRef.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [open])

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-9 w-9 rounded-full flex items-center justify-center border border-light-border dark:border-transparent bg-primary-500/10 text-primary-600 dark:bg-primary-500 dark:text-white"
        title="User Menu"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <UserIcon className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 card z-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-9 w-9 rounded-full flex items-center justify-center border border-light-border dark:border-dark-border bg-primary-500/10 text-primary-600 dark:bg-primary-500 dark:text-white">
              <span className="text-body font-semibold">U</span>
            </div>
            <div className="min-w-0">
              <div className="text-body-sm font-semibold text-light-text dark:text-dark-text truncate">
                Guest User
              </div>
              <div className="text-caption text-light-text-secondary dark:text-dark-text-secondary truncate">
                No authentication configured
              </div>
            </div>
          </div>
          <div className="text-caption text-light-text-tertiary dark:text-dark-text-tertiary mb-3">
            Ready for backend integration
          </div>
          <div className="flex justify-end">
            <button className="btn-secondary px-3 py-1 text-body-sm inline-flex items-center gap-2">
              Settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
