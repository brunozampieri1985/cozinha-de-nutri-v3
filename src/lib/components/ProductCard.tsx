import Product from '@interfaces/Product'
import { useStore } from '@contexts/StoreProvider'
import FormatCurrency from '@helpers/FormatCurrency'
import Button from '@components/Button'
import { FaCartPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'

type ProductCardProps = {
   product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
   const { addToCart } = useStore()

   const handleAddToCart = (product: Product) => {
      toast.success('Item adicionado ao carrinho!')
      addToCart(product)
   }

   return (
      <div className="product-card">
         <div className="product-card__badges">
            <div className="product-card__badge">{product.category}</div>
            {product.isLowCarb && (
               <div className="product-card__badge">Low Carb</div>
            )}
         </div>
         <div className="product-card__title">
            {`${product.title} - ${product.weight}${product.measure}`}
         </div>
         <div className="product-card__price">
            {product.promoPrice > 0 && (
               <div className="product-card__promoPrice">
                  {product.promoPrice}
               </div>
            )}
            {FormatCurrency(product.price)}
         </div>
         <div className="product-card__action">
            <Button variant="neutral" onClick={() => handleAddToCart(product)}>
               <FaCartPlus fontSize={20} />
               &nbsp;Adicionar ao Carrinho
            </Button>
         </div>
      </div>
   )
}

export default ProductCard
