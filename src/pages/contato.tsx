import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import ContactForm from '@components/ContactForm'

const Contato: NextPage = () => {
   return (
      <PageLayout title={'Contato'}>
         <div className="info-page-wrapper">
            <div className="page-info">
               <h1>Contato</h1>
               <hr />
               <br />
               <ContactForm/>
            </div>
         </div>
      </PageLayout>
   )
}

export default Contato
