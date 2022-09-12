import OrderItem from "@interfaces/OrderItem";

const LocalCart =  {
   save: (cart: OrderItem[]) => {
      localStorage.removeItem('cart')
      localStorage.setItem('cart', JSON.stringify(cart))
   },
   get: () => {
      const cart = localStorage.getItem('cart')
      if (cart) return JSON.parse(cart) as OrderItem[]
      else return [] as OrderItem[]
   },
   clear: () => {
      localStorage.removeItem('cart')
   }
}

export default LocalCart