import { useStore } from '@contexts/StoreProvider'
import ProductCard from './ProductCard'

const ProductList: React.FC = () => {
   const { products } = useStore()
   return (
      <div className='product-list'>
         {products.map((product, index) => (
            <ProductCard product={product} key={index}/>
         ))}
      </div>
   )
}

export default ProductList