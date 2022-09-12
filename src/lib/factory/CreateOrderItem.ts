import OrderItem from '@interfaces/OrderItem'
import Product from '@interfaces/Product';

export default function CreateOrderItem(product: Product, quantity: number) : OrderItem {
   return {
      item: product,
      price: product.promoPrice > 0 ? product.promoPrice : product.price,
      quantity,
   }
}