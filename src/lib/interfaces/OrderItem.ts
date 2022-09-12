import Product from "./Product"

export default interface OrderItem {
   id?: number | string
   orderId?: number | string
   item: Product
   price: number
   quantity: number
}