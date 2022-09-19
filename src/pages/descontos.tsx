import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import Button from '@components/Button'
import Router from 'next/router'
import DescontosCoponent from '@components/DescontosCoponent'

const Descontos: NextPage = () => {
   return (
      <PageLayout title={'Descontos'}>
         <div className="info-page-wrapper">
            <div className="page-info">
               <DescontosCoponent />
               <div>
                  <Button onClick={() => Router.push('/')}>
                     Voltar para Loja
                  </Button>
               </div>
            </div>
         </div>
      </PageLayout>
   )
}
2
export default Descontos
