import OrderItem from "@interfaces/OrderItem"

export default function CalculateTotalQuantity(items: OrderItem[]) : number {
   return items.reduce((acc, curr) => {
      return acc += curr.quantity
   }, 0)
}
