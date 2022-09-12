import Buyer from '@interfaces/Buyer'
import Order from '@interfaces/Order'
import OrderItem from '@interfaces/OrderItem'
import CalculateDiscount from '@helpers/CalculateDiscount'
import CalculateDeliveryRate from '@helpers/CalculateDeliveryRate'
import CalculateSubtotal from '@helpers/CalculateSubtotal'

export default function CreateOrder(items: OrderItem[], buyer: Buyer): Order {
   let subtotal = CalculateSubtotal(items)
   let delivery = CalculateDeliveryRate(items)
   let discount = subtotal * CalculateDiscount(items)
   let total = subtotal - discount + delivery
   return {
      buyer,
      delivery,
      discount,
      items,
      subtotal,
      total,
   }
}
