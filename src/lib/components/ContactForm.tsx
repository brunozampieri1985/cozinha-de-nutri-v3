import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import validateForm from '@validation/Form'

const ContactForm: React.FC = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
   })

   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value, name } = event.target
      setFormData({
         ...formData,
         [name]: value,
      })
   }

   return (
      <div className="contact">
         <div className="contact-form">
            <Input
               type="text"
               name="name"
               placeholder="Digite seu nome"
               valid={validateForm.name(formData.name)}
               value={formData.name}
               onChange={(event) => handleInputChange(event)}
            />
            <Input
               type="email"
               name="email"
               placeholder="Digite seu email"
               valid={validateForm.email(formData.email)}
               value={formData.email}
               onChange={(event) => handleInputChange(event)}
            />
            <Input
               type="tel"
               name="phone"
               placeholder="Digite seu telefone"
               valid={validateForm.phone(formData.phone)}
               value={formData.phone}
               onChange={(event) => handleInputChange(event)}
            />
         </div>
         <div className="contact-form-actions">
            <Button>Enviar</Button>
            <Button variant="neutral">Limpar</Button>
         </div>
      </div>
   )
}

export default ContactForm