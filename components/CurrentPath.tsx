"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function CurrentPath({ onChange }: { onChange: (path: string) => void }) {
  const pathname = usePathname()

  useEffect(() => {
    onChange(pathname)
  }, [pathname])

  return null
}
