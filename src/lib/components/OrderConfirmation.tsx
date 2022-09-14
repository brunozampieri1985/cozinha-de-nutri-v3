import Buyer from '@interfaces/Buyer'
import CreateOrder from '@factory/CreateOrder'
import { useStore } from '@contexts/StoreProvider'
import Input from './Input'
import validateForm from '../validation/Form'
import { useState } from 'react'
import FormatCurrency from '@helpers/FormatCurrency'
import Button from './Button'
import { toast } from 'react-toastify'
import CreateBuyer from '@factory/CreateBuyer'
import LocalBuyer from '@helpers/LocalBuyer'
import { useEffect } from 'react'
import SendOrderConfirmation from '@factory/SendOrderConfirmation'
import Router from 'next/router'
import Spinner from './Spinner'

const OrderConfirmation: React.FC = () => {
   const { cart, cartSummary, buyer, clearCart } = useStore()
   const [isLoading, setIsLoading] = useState(false)
   const [buyerData, setBuyerData] = useState<Buyer>(buyer)

   const handleInputChange = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
      const { value, name } = event.target
      setBuyerData({
         ...buyerData,
         [name]: value,
      })
   }

   const errors = () => {
      const errs = []
      if (!validateForm.name(buyerData.name))
         errs.push('É necessário preencher nome completo.')
      if (!validateForm.email(buyerData.email))
         errs.push('É necessário fornecer um email válido.')
      if (!validateForm.phone(buyerData.phone))
         errs.push('É necessário fornecer um telefone válido.')
      if (!validateForm.name(buyerData.address))
         errs.push('É necessário fornecer um endereço válido.')
      if (!validateForm.name(buyerData.city))
         errs.push('É necessário informar sua cidade.')
      return errs
   }

   const handleConfirmOrder = async () => {
      const errs = errors()
      if (errs.length > 0) {
         errs.forEach((e) => toast.error(e))
         return
      }
      setIsLoading(true)
      const buyer = CreateBuyer(buyerData)
      LocalBuyer.save(buyer)
      const order = CreateOrder(cart, buyer)

      const { status, message } = await SendOrderConfirmation(order)
      setIsLoading(false)
      if (status === 202) {
         clearCart()
         toast.success('Confirmação enviada com sucesso')
      } else {
         toast.error(`${status} - ${message}`)
      }
   }

   useEffect(() => {
      if (!cart || cart.length === 0) {
         toast.error('Seu carrinho está vazio!')
         Router.push('/')
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   return (
      <div className="order-confirmation">
         <div className="order-confirmation__wrapper">
            {isLoading ? (
               <Spinner
                  text="Aguarde. Estamos enviando sua confirmação"
                  size={150}
               />
            ) : (
               <>
                  <h1>Confirmação de Pedido</h1>
                  <div className="order-confirmation__buyer">
                     <h3>Dados do Cliente</h3>
                     <Input
                        name="name"
                        type="text"
                        value={buyerData.name}
                        onChange={(e) => handleInputChange(e)}
                        placeholder="Nome Completo"
                        valid={validateForm.name(buyerData.name)}
                     />
                     <Input
                        name="email"
                        type="email"
                        placeholder="E-mail"
                        valid={validateForm.email(buyerData.email)}
                        value={buyerData.email}
                        onChange={(e) => handleInputChange(e)}
                     />
                     <Input
                        name="phone"
                        type="tel"
                        placeholder="Telefone"
                        valid={validateForm.phone(buyerData.phone)}
                        value={buyerData.phone}
                        onChange={(e) => handleInputChange(e)}
                     />
                     <Input
                        name="address"
                        type="text"
                        placeholder="Endereço"
                        valid={validateForm.name(buyerData.address)}
                        value={buyerData.address}
                        onChange={(e) => handleInputChange(e)}
                     />
                     <Input
                        name="city"
                        type="text"
                        placeholder="Cidade"
                        valid={validateForm.name(buyerData.city)}
                        value={buyerData.city}
                        onChange={(e) => handleInputChange(e)}
                     />
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div className="order-confirmation__items">
                     <h3>Items</h3>
                     {cart.map((cartItem, index) => (
                        <div key={index}>
                           <p>
                              {`${index + 1})`} {cartItem.item.title}
                           </p>
                           <p>
                              Tamanho: {cartItem.item.weight}
                              {cartItem.item.measure}
                           </p>
                           <p>Quantidade: {cartItem.quantity}</p>
                           <p>
                              Valor Unitário: {FormatCurrency(cartItem.price)}
                           </p>
                        </div>
                     ))}
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div className="order-confirmation__totals">
                     <h3>Totais</h3>
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
                              {(cartSummary().discount /
                                 cartSummary().subtotal) *
                                 100}
                              %
                           </span>
                        </p>
                     )}
                     <p>
                        Total:{' '}
                        <span>{FormatCurrency(cartSummary().total)}</span>
                     </p>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <div className="order-confirmation__actions">
                     <Button onClick={handleConfirmOrder}>
                        CONFIRMAR PEDIDO
                     </Button>
                     <Button
                        variant={'neutral'}
                        onClick={() => Router.push('/')}>
                        Voltar à Loja
                     </Button>
                  </div>
               </>
            )}
         </div>
      </div>
   )
}

export default OrderConfirmation
