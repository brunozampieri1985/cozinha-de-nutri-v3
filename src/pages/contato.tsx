import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import Button from '@components/Button'
import Router from 'next/router'

const Entrega: NextPage = () => {
   return (
      <PageLayout title={'Contato'}>
         <div className="info-page-wrapper">
            <div className="page-info">
               <h1>Contato</h1>
               <hr />
               <br />
               
            </div>
         </div>
      </PageLayout>
   )
}

export default Entrega
