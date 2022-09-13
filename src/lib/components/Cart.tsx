import { useEffect, useState } from 'react'
import { useStore } from '@contexts/StoreProvider'
import Product from '@interfaces/Product'
import OrderItem from '@interfaces/OrderItem'
import FormatCurrency from '@helpers/FormatCurrency'
import ToggleBodySroll from '@helpers/ToggleBodyScroll'
import Button from '@components/Button'
import { FaShoppingCart } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Router from 'next/router'

const Cart: React.FC = () => {
   const [isActive, setIsActive] = useState(false)
   const cartClass = isActive ? 'cart active' : 'cart'
   const cartSummaryClass = isActive ? 'cart-summary active' : 'cart-summary'
   const {
      cart,
      totalQuantityOnCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,      
      cartSummary,
      clearCart,
   } = useStore()

   const handleRemoveFromCart = (product: Product) => {
      if (cart.length === 1) setIsActive(false)
      removeFromCart(product)
      toast.info('Item removido do carrinho.')
   }

   const handleDecreaseQuantity = (item: OrderItem) => {
      if (item.quantity === 1) {
         toast.info('Item removido do carrinho.')
      }
      decreaseQuantity(item.item)
   }

   const handleClearCart = () => {
      clearCart()
      toast.info('Seu carrinho foi limpo.')
      setIsActive(false)
   }

   const handleOpenCart = () => {
      if (!isActive) {
         if (!cart || cart.length === 0) {
            toast.warning('Seu carrinho está vazio...')
            return
         }
         setIsActive(true)
         return
      }
      setIsActive(false)
   }

   const handleCreateOrder = () => {
      if (cart && cart.length > 0) {
         ToggleBodySroll(false)
         Router.push('/confirmacao')
      }
      else toast.info('Não há itens no carrinho!')
   }

   useEffect(() => {
      ToggleBodySroll(isActive)
   }, [isActive])

   return (
      <div className={cartClass}>
         <div className="cart-container">
            <div className={cartSummaryClass}>
               <div className="cart-icon" onClick={handleOpenCart}>
                  <FaShoppingCart fontSize={24} />
                  <span>{totalQuantityOnCart()}</span>
               </div>
               <div className="cart-total">
                  {FormatCurrency(cartSummary().subtotal)}
               </div>
            </div>
            <div className="cart-header">
               <h3>
                  <FaShoppingCart />
                  &nbsp;Meu Carrinho
               </h3>
               <Button variant={'ghost'} onClick={() => setIsActive(false)}>
                  <h1>&times;</h1>
               </Button>
            </div>
            <div className="cart-items">
               {cart.map((item, index) => (
                  <div className="cart-item" key={index}>
                     <div className="cart-item__left">
                        <div className="cart-item__title">
                           {`${index + 1}) - ${item.item.title} - ${
                              item.item.weight
                           }${item.item.measure}`}
                        </div>
                        <div className="cart-item__quantity">
                           Quantidade:
                           <span onClick={() => increaseQuantity(item.item)}>
                              +
                           </span>
                           <p>{item.quantity}</p>
                           <span onClick={() => handleDecreaseQuantity(item)}>
                              -
                           </span>
                        </div>
                     </div>
                     <div className="cart-item__right">
                        <div className="cart-item__price">
                           {FormatCurrency(item.price)}
                           <span
                              onClick={() => handleRemoveFromCart(item.item)}>
                              &times;
                           </span>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <div className="cart-values">
               <p>
                  Subtotal:{' '}
                  <span>{FormatCurrency(cartSummary().subtotal)}</span>
               </p>
               <p>
                  Taxa de Entrega:{' '}
                  <span>{FormatCurrency(cartSummary().delivery)}</span>
               </p>
               {cartSummary().discount > 0 && (
                  <p>
                     Desconto:{' '}
                     <span>
                        {FormatCurrency(cartSummary().discount)}
                        &nbsp;&bull;&nbsp;
                        {(cartSummary().discount / cartSummary().subtotal) *
                           100}
                        %
                     </span>
                  </p>
               )}
               <p>
                  Total: <span>{FormatCurrency(cartSummary().total)}</span>
               </p>
            </div>
            <div className="cart-actions">
               <Button onClick={handleCreateOrder}>Finalizar</Button>
               <Button variant="neutral" onClick={() => handleClearCart()}>
                  Limpar
               </Button>
            </div>
         </div>
      </div>
   )
}

export default Cart
