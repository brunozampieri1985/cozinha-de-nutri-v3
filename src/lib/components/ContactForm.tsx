import { useState } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import validateForm from '@validation/Form'
import SendMessage from '@factory/SendMessage'
import { toast } from 'react-toastify'

type ContactFormType = {
   name: string
   email: string
   phone: string
   message: string
}

const ContactForm: React.FC = () => {
   const [isLoading, setIsLoading] = useState(false)
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

   const errors = () => {
      const errs = []
      if (!validateForm.name(formData.name))
         errs.push('É necessário preencher nome completo.')
      if (!validateForm.email(formData.email))
         errs.push('É necessário fornecer um email válido.')
      if (!validateForm.phone(formData.phone))
         errs.push('É necessário fornecer um telefone válido.')
      if (!validateForm.name(formData.message))
         errs.push('A mensagem não pode ser em branco.')
      return errs
   }

   const handleSendMessage = async () => {
      const errs = errors()
      if (errs.length > 0) {
         errs.forEach((e) => toast.error(e))
         return
      }
      setIsLoading(true)

      const { status, message } = await SendMessage(
         formData.name,
         formData.email,
         formData.phone,
         formData.message
      )
      setIsLoading(false)
      if (status === 202) {
         toast.success('Agradecemos sua mensagem. Retornaremos em breve.')
      } else {
         toast.error(`${status} - ${message}`)
      }
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
               <Button onClick={handleSendMessage}>Enviar</Button>
               <Button variant="neutral" onClick={handleClearForm}>
                  Limpar
               </Button>
            </div>
         </div>
      </div>
   )
}

export default ContactForm
