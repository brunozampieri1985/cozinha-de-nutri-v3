import Buyer from "./Buyer"
import OrderItem from "./OrderItem"

export default interface Order {
   id?: string | number
   items: OrderItem[]
   buyer: Buyer
   subtotal: number
   discount: number
   delivery: number
   total: number
   created?: Date | string
}