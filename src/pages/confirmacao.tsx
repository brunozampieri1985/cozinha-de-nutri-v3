import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import OrderConfirmation from '@components/OrderConfirmation'


const Confirmacao: NextPage = () => {
   return (
      <PageLayout>
         <OrderConfirmation/>
      </PageLayout>
   )
}

export default Confirmacao