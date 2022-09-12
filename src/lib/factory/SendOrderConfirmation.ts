import Order from "@interfaces/Order"

export default async function SendOrderConfirmation(order: Order) {
   const response = await fetch('/api/order-confirmation', {
      method: 'POST',
      body: JSON.stringify(order)
   })
   const data = await response.json()
   const { status, message } = data   
   return { status, message }
}