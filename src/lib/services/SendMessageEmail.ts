import sgMail, { MailDataRequired } from '@sendgrid/mail'

export default class SendOrderConfirmationEmail {
   name: string
   email: string
   phone: string
   message: string
   apiKey: string
   html: string

   constructor(name: string, email: string, phone: string, message: string) {
      this.name = name
      this.apiKey = process.env.SENDGRID_API_KEY as string
      this.email = email
      this.phone = phone
      this.message = message
      this.html = `<h1>Mensagem de ${this.name as string}</h1><br/><hr/><br/>
      <h3>Telefone: ${this.phone}
      <h3>Email: ${this.email}      
      <h3>Mensagem: ${this.message}
      <br/><hr/><br/>`
   }

   public async send() {
      sgMail.setApiKey(this.apiKey)

      const msgToAdmin: MailDataRequired = {
         to: 'cozinhadenutri13@gmail.com',
         from: 'cozinhadenutri@hotmail.com',
         subject: `Mensagem de ${this.name}`,
         html: this.html,
      }

      const response = await sgMail.send(msgToAdmin)

      if (response[0].statusCode === 202) {
         return { status: 202, message: 'Confirmation sent' }
      }
      return { status: 400, message: 'Confirmation error' }
   }
}
