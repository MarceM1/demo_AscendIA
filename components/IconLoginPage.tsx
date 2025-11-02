'use client'

import { GalleryVerticalEnd, LogInIcon } from "lucide-react"
import { usePathname } from "next/navigation"

const IconLoginPage = () => {
    const currentPath= usePathname()
  return (
    <>{currentPath === '/sign-in' ? (
        <GalleryVerticalEnd className="size-4 text-accent" />
      ) : (
        <LogInIcon className="size-4 text-accent" />
      )}
    </>
  )
}

export default IconLoginPage