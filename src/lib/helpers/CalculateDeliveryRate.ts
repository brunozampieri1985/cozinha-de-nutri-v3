import OrderItem from '@interfaces/OrderItem'
import CalculateSubtotal from './CalculateSubtotal'

export default function CalculateDeliveryRate(items: OrderItem[]): number {
   const subtotal = CalculateSubtotal(items)
   if (subtotal < 100) return 6
   return 0
}
