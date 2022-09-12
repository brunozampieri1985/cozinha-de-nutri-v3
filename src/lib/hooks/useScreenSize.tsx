import { useState, useEffect } from 'react'

type ScreenSizeType = {
   width: number
   height: number
}

export default function useScreenSize() {
   const [screen, setScreen] = useState<ScreenSizeType>({
      width: 0,
      height: 0,
   })

   useEffect(() => {
      const handleResize = () => {
         setScreen({
            width: window.innerWidth,
            height: window.innerHeight,
         })
      }
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   return screen
}
