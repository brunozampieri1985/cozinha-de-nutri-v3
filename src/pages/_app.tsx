import '../styles/globals.css'
import '../styles/font.css'
import '../styles/ReactToastify.css'
import type { AppProps } from 'next/app'
import StoreProvider from '@contexts/StoreProvider'
import { ToastContainer } from 'react-toastify'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import Spinner from '@components/Spinner'

function MyApp({ Component, pageProps }: AppProps) {
   const [isLoading, setIsLoading] = useState<boolean>(false)

   Router.events.on('beforeHistoryChange', () => {
      setIsLoading(true)
   })

   Router.events.on('routeChangeStart', () => {
      setIsLoading(true)
   })

   Router.events.on('routeChangeComplete', () => {
      setIsLoading(false)
   })
  

   return (
      <StoreProvider>
         <ToastContainer />
         {isLoading ? (
            <Spinner size={150} text="Carregando..." />
         ) : (
            <Component {...pageProps} />
         )}
      </StoreProvider>
   )
}

export default MyApp
