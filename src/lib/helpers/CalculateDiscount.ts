import OrderItem from '@interfaces/OrderItem'
import CalculateTotalQuantity from './CalculateTotalQuantity'

export default function CalculateDiscount(items: OrderItem[]) {
   const quantity = CalculateTotalQuantity(items)
   if (quantity < 7) return 0
   if (quantity > 6 && quantity < 14) return 0.05
   if (quantity > 13 && quantity < 21) return 0.1
   if (quantity > 20) return 0.15
   return 0
}
