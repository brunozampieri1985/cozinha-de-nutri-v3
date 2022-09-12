import sgMail, { MailDataRequired } from '@sendgrid/mail'
import FormatCurrency from '@helpers/FormatCurrency'
import Buyer from '@interfaces/Buyer'
import Order from '@interfaces/Order'
import OrderItem from '@interfaces/OrderItem'

export default class SendMail {
   order: Order
   buyer: Buyer
   items: OrderItem[]
   apiKey: string
   html: string

   constructor(order: Order) {
      this.order = order
      this.apiKey = process.env.SENDGRID_API_KEY as string
      this.buyer = order.buyer
      this.items = order.items
      this.html = `<h1>Pedido de ${
         this.buyer.name as string
      }</h1><br/><hr/><br/>
      <h3>Telefone: ${this.buyer.phone}
      <h3>Email: ${this.buyer.email}
      <h3>Endereço: ${this.buyer.address}
      <h3>Cidade: ${this.buyer.city}
      <br/><hr/><br/>`

      this.items.map((orderItem) => {
         this.html += `<p><strong>${orderItem.item.title} - ${
            orderItem.item.weight
         }${orderItem.item.measure}</strong></p>
      <p>Quantidade: <strong>${orderItem.quantity}</strong></p> 
      <p>R$/UN: <strong>${FormatCurrency(orderItem.price)}</p></strong>
      <hr/>
      <br/>`
      })

      this.html += `<p>Subtotal: ${FormatCurrency(order.subtotal)}</p>
      <p>Desconto: ${FormatCurrency(order.discount)}</p>
      <p>Taxa de Entrega: ${FormatCurrency(order.delivery)}</p>
      <p>Total: ${FormatCurrency(order.total)}</p>`
   }

   public async send() {      
      sgMail.setApiKey(this.apiKey)

      const msgToAdmin: MailDataRequired = {
         to: 'cozinhadenutri13@gmail.com',
         from: 'cozinhadenutri@hotmail.com',
         subject: `Pedido de ${this.buyer.name}`,
         html: this.html,
      }

      const msgToBuyer: MailDataRequired = {
         ...msgToAdmin,
         to: this.buyer.email,
      }

      await sgMail.send(msgToAdmin)
      const response1 = await sgMail.send(msgToBuyer)
      
      if (response1[0].statusCode === 202) {
         return { status: 202, message: 'Confirmation sent' }
      }
      return { status: 400, message: 'Confirmation error' }
   }
}
