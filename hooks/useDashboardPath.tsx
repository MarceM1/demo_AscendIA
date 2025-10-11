'use client'

import { usePathname } from 'next/navigation'

export function useDashboardPath() {
  const path = usePathname()
  const cleanPath = path.split('/').slice(2).join('/').replace('-', ' ')
  const cleanSubPath = path.split('/').slice(3).join('/').replace('-', ' ')
  return {cleanPath, cleanSubPath}
}