import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import validateForm from '@validation/Form'

type ContactFormType = {
   name: string
   email: string
   phone: string
   message: string
}

const ContactForm: React.FC = () => {
   const [formData, setFormData] = useState<ContactFormType>(
      {} as ContactFormType
   )

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { value, name } = event.target
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   const handleClearForm = () => {
      setFormData({
         email: '',
         message: '',
         name: '',
         phone: '',
      })
   }

   return (
      <div className="contact-form">
         <div className="contact-form-left">
            <Input
               type="text"
               name="name"
               placeholder="Nome"
               valid={validateForm.name(formData.name)}
               value={formData.name}
               onChange={(event) => handleInputChange(event)}
            />
            <Input
               type="email"
               name="email"
               placeholder="Email"
               valid={validateForm.email(formData.email)}
               value={formData.email}
               onChange={(event) => handleInputChange(event)}
            />
            <Input
               type="tel"
               name="phone"
               placeholder="Telefone"
               valid={validateForm.phone(formData.phone)}
               value={formData.phone}
               onChange={(event) => handleInputChange(event)}
            />
         </div>
         <div className="contact-form-right">
            <div className="contact-form-message">
               <Input
                  type="textarea"
                  name="message"
                  placeholder="Digite sua mensagem"
                  valid={validateForm.name(formData.message)}
                  value={formData.message}
                  onChange={(event) => handleInputChange(event)}
               />
            </div>
            <div className="contact-form-actions">
               <Button>Enviar</Button>
               <Button variant="neutral" onClick={() => handleClearForm()}>
                  Limpar
               </Button>
            </div>
         </div>
      </div>
   )
}

export default ContactForm
