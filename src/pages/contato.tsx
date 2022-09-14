import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import ContactForm from '@components/ContactForm'

const Contato: NextPage = () => {
   return (
      <PageLayout title="Contato">
         <div className="contact-page">
            <h1>Contato</h1>
            <hr />
            <ContactForm />
         </div>
      </PageLayout>
   )
}

export default Contato
