import OrderItem from '@interfaces/OrderItem'
import CalculateTotalQuantity from './CalculateTotalQuantity'

export default function CalculateDeliveryRate(items: OrderItem[]): number {
   const quantity = CalculateTotalQuantity(items)
   if (items.length === 0) return 0
   if (quantity < 7) return 6
   return 0
}
