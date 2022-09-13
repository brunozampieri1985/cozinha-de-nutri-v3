import '../styles/globals.css'
import '../styles/font.css'
import '../styles/ReactToastify.css'
import type { AppProps } from 'next/app'
import StoreProvider from '@contexts/StoreProvider'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
   useEffect(() => {
      console.log('serviceWorker' in navigator)
      if ('serviceWorker' in navigator) {
         window.addEventListener('load', function () {
            navigator.serviceWorker.register('/sw.js').then(
               function (registration) {
                  console.log(
                     'Service Worker registration successful with scope: ',
                     registration.scope
                  )
               },
               function (err) {
                  console.log('Service Worker registration failed: ', err)
               }
            )
         })
      }
   }, [])

   return (
      <StoreProvider>
         <ToastContainer />
         <Component {...pageProps} />
      </StoreProvider>
   )
}

export default MyApp
