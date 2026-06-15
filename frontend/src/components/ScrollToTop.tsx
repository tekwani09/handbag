import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const scrollPositions = new Map<string, number>()

export default function ScrollToTop() {
  const { pathname, key } = useLocation()
  const isBackNavigation = useRef(false)

  useEffect(() => {
    // Save scroll position before navigating away
    const saveScrollPosition = () => {
      scrollPositions.set(pathname, window.scrollY)
    }

    window.addEventListener('beforeunload', saveScrollPosition)
    
    return () => {
      saveScrollPosition()
      window.removeEventListener('beforeunload', saveScrollPosition)
    }
  }, [pathname])

  useEffect(() => {
    // Restore scroll position if going back, otherwise scroll to top
    const savedPosition = scrollPositions.get(pathname)
    
    if (savedPosition !== undefined) {
      // Going back to a previous page
      setTimeout(() => {
        window.scrollTo({ top: savedPosition, left: 0, behavior: 'instant' })
      }, 0)
    } else {
      // New page, scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, key])

  return null
}