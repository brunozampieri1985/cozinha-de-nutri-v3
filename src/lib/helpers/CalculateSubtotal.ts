import OrderItem from '@interfaces/OrderItem'

export default function CalculateSubtotal(items: OrderItem[]): number {
   return items.reduce((acc, curr) => {
      return (acc += curr.price * curr.quantity)
   }, 0)
}
