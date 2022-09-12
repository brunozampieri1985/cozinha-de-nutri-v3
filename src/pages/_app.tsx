import '../styles/globals.css'
import '../styles/font.css'
import '../styles/ReactToastify.css'
import type { AppProps } from 'next/app'
import StoreProvider from '@contexts/StoreProvider'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <StoreProvider>
         <ToastContainer/>
         <Component {...pageProps} />
      </StoreProvider>
   )
}

export default MyApp
