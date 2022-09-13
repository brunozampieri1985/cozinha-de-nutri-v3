import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import supabase from '@database/supabase'
import Product from '@interfaces/Product'
import OrderItem from '@interfaces/OrderItem'
import CreateOrderItem from '@factory/CreateOrderItem'
import CalculateSubtotal from '@helpers/CalculateSubtotal'
import CalculateDeliveryRate from '@helpers/CalculateDeliveryRate'
import CalculateDiscount from '@helpers/CalculateDiscount'
import LocalCart from '@helpers/LocalCart'
import Buyer from '@interfaces/Buyer'
import LocalBuyer from '@helpers/LocalBuyer'
import Spinner from '@components/Spinner'

type CartSummary = {
   subtotal: number
   delivery: number
   discount: number
   total: number
}

type StoreContextType = {
   products: Product[]
   categories: string[]
   cart: OrderItem[]
   buyer: Buyer
   addToCart: (product: Product) => void
   totalQuantityOnCart: () => number
   increaseQuantity: (product: Product) => void
   decreaseQuantity: (product: Product) => void
   removeFromCart: (product: Product) => void
   clearCart: () => void
   cartSummary: () => CartSummary
   filteredProducts: (input?: string, category?: string) => Product[]
}

export const StoreContext = createContext({} as StoreContextType)

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [isLoading, setIsLoading] = useState(true)
   const [products, setProducts] = useState<Product[]>([])
   const [cart, setCart] = useState<OrderItem[]>([])
   const [buyer, setBuyer] = useState<Buyer>({} as Buyer)
   const categories = useMemo(
      () =>
         products.reduce((arr, curr) => {
            if (!arr.includes(curr.category)) {
               arr.push(curr.category)
            }
            return arr
         }, [] as string[]),
      [products]
   )

   const totalQuantityOnCart = () =>
      cart.reduce((acc, curr) => (acc += curr.quantity), 0)

   const quantityOnCart = (id: number | string | undefined) => {
      const filter = cart.find((cartItem) => {
         if (id === cartItem.item.id) return cartItem
      })
      if (filter) return filter.quantity
      return 0
   }
   const increaseQuantity = (product: Product) => {
      const newCart: OrderItem[] = cart.map((cartItem) => {
         if (cartItem.item.id === product.id) {
            return {
               ...cartItem,
               quantity: cartItem.quantity + 1,
            }
         }
         return cartItem
      })
      LocalCart.save(newCart)
      setCart(newCart)
   }

   const filteredProducts = (input?: string, category?: string) => {
      if (!category) category = 'Todas'
      if (input) {
         if (category === 'Todas') {
            return products.filter((product) => {
               if (product.title.toLowerCase().includes(input.toLowerCase()))
                  return product
            })
         } else {
            return products.filter((product) => {
               if (
                  product.title.toLowerCase().includes(input.toLowerCase()) &&
                  product.category === category
               )
                  return product
            })
         }
      } else {
         if (category === 'Todas') return products
         else return products.filter((product) => {
            if (product.category === category) return product
         })
      }
   }

   const decreaseQuantity = (product: Product) => {
      if (quantityOnCart(product.id) === 1) {
         removeFromCart(product)
         return
      }
      const newCart: OrderItem[] = cart.map((cartItem) => {
         if (cartItem.item.id === product.id) {
            return {
               ...cartItem,
               quantity: cartItem.quantity - 1,
            }
         }
         return cartItem
      })
      LocalCart.save(newCart)
      setCart(newCart)
   }

   const removeFromCart = (product: Product) => {
      const newCart: OrderItem[] = cart.filter((cartItem) => {
         if (cartItem.item.id !== product.id) return cartItem
      })
      LocalCart.save(newCart)
      setCart(newCart)
   }

   const addToCart = (product: Product) => {
      let quantity = quantityOnCart(product.id)
      if (quantity > 0) {
         increaseQuantity(product)
         return
      }
      LocalCart.save([...cart, CreateOrderItem(product, 1)])
      setCart((cart) => [...cart, CreateOrderItem(product, 1)])
   }

   const clearCart = () => {
      LocalCart.clear()
      setCart([])
   }

   const cartSummary = () => {
      const subtotal = CalculateSubtotal(cart)
      const delivery = CalculateDeliveryRate(cart)
      const discount = subtotal * CalculateDiscount(cart)
      const total = subtotal - discount + delivery
      return { total, subtotal, delivery, discount } as CartSummary
   }

   useEffect(() => {
      const fetchProducts = async () => {
         const { data, error } = await supabase.from('cardapio').select('*')
         setProducts(data as Product[])
      }
      fetchProducts()
      setCart(LocalCart.get())
      setBuyer(LocalBuyer.get())
      setIsLoading(false)
   }, [])

   if (isLoading) return <Spinner size={150} text='' />

   return (
      <StoreContext.Provider
         value={{
            products,
            categories,
            cart,
            buyer,
            addToCart,
            decreaseQuantity,
            increaseQuantity,
            removeFromCart,
            totalQuantityOnCart,
            clearCart,
            cartSummary,
            filteredProducts
         }}>
         {children}
      </StoreContext.Provider>
   )
}

export const useStore = () => useContext(StoreContext)

export default StoreProvider
