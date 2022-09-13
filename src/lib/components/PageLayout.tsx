import Head from 'next/head'
import { ReactNode } from 'react'
import Navbar from './Navbar'

type PageLayoutProps = {
   children: ReactNode
   title?: string
   description?: string
}

const PageLayout: React.FC<PageLayoutProps> = ({
   children,
   title,
   description,
}) => {

   const metaTitle = title ?? 'Comida de Verdade'
   const metaDesc = description ?? 'Comida de verdade em Peruíbe'
   
   const fullTitle = `Cozinha de Nutri - ${metaTitle}`
   const fullDesc = `Cozinha de Nutri - ${metaDesc}`

   return (
      <div className="page-layout">
         <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={fullDesc} />
            <meta
               name="viewport"
               content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
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
