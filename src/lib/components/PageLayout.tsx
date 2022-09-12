import Head from 'next/head'
import { ReactNode } from 'react'
import Navbar from './Navbar'

const PageLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
   return (
      <div className="page-layout">
         <Head>
            <title>Cozinha de Nutri - Comida de Verdade!</title>
            <meta
               name="description"
               content="Cozinha de Nutri - Comida de verdade em Peruíbe"
            />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <header>
            <Navbar />
         </header>
         <main>{children}</main>
      </div>
   )
}

export default PageLayout
