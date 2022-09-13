import React, { useEffect, useState } from 'react'
import Button from './Button'


const InstallButton: React.FC = () => {
   const [showA2HS, setShowA2HS] = useState(false)
   const [deferredPrompt, setDeferredPrompt] =
      useState<any>()

   const handleInstall = (
      event: any
   ) => {
      event.preventDefault()
      if (deferredPrompt) {
         deferredPrompt.prompt()
         deferredPrompt.userChoice.then((choiceResult: any) => {
            if (choiceResult.outcome === 'accepted') {
               setShowA2HS(false)
            }
         })
      }
   }

   useEffect(() => {
      window.addEventListener('beforeinstallprompt', (event) => {
         event.preventDefault()
         setDeferredPrompt(event)
         setShowA2HS(true)
      })
   }, [])

   return (
      <>
         {showA2HS && (
            <Button onClick={(event) => handleInstall(event)}>
               Instalar App
            </Button>
         )}
      </>
   )
}

export default InstallButton
