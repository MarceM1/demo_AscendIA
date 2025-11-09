'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useDashboardPath() {
  const [hash, setHash] = useState<string>('')
  const [cleanPath, setCleanPath] = useState<string>('')

  const path = usePathname()
  
  useEffect(() => {
    const cleanedPath = path.split('/')[2]?.replace(/-/g, ' ')
    let uiMessage = ''
    switch (cleanedPath) {
      case 'new interview':
        uiMessage ='Nueva Entrevista'
        break
      case 'my interviews':
        uiMessage ='Mis Entrevistas'
        break
      case 'my stats':
        uiMessage ='Mis Estadísticas'
        break
      case 'feedback':
        uiMessage ='Feedback'
        break
      case 'profile':
        uiMessage ='Mi Cuenta'
        break
      default:
        uiMessage ='Inicio'
        break
    }
    setCleanPath(uiMessage)
   
  }, [path])

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash.replace('#', '').replace(/-/g, ' '))
    }
  
    handleHashChange()
  
    window.addEventListener('hashchange', handleHashChange)
  
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  

  return {cleanPath, cleanSubPath: hash}
}