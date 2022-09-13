import { useStore } from '@contexts/StoreProvider'
import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import ProductCard from './ProductCard'
import { FaFilter } from 'react-icons/fa'

const ProductList: React.FC = () => {
   const [filter, setFilter] = useState<string>('')
   const [filterCategory, setFilterCategory] = useState('Todas')
   const [showFilters, setShowFilters] = useState(false)
   const { filteredProducts, categories } = useStore()
   const filtered = filteredProducts(filter, filterCategory)

   return (
      <div className="product-list-wrapper">
         <div className="product-list-filter__toggle">
            <Button
               variant="neutral"
               onClick={() => setShowFilters(!showFilters)}>
               <FaFilter />
               &nbsp;{showFilters ? 'Esconder Filtros' : 'Filtros'}
            </Button>
            &nbsp;
            <p>({filtered.length})</p>
         </div>
         {showFilters && (
            <div className="product-list-filter">
               <div className="product-list-filter__input">
                  <Input
                     type="text"
                     name="filter"
                     placeholder="Buscar por nome do produto"
                     valid={null}
                     value={filter}
                     onChange={(e) => setFilter(e.target.value)}
                  />
               </div>
               <div className="product-list-filter__category">
                  <p>Categorias:</p>
                  <select
                     defaultValue={'Todas'}
                     onChange={(e) => setFilterCategory(e.target.value)}>
                     <option value={'Todas'}>Todas</option>
                     {categories.map((category, index) => (
                        <option key={index} value={category}>
                           {category}
                        </option>
                     ))}
                  </select>
               </div>
            </div>
         )}
         <div className="product-list">
            {filtered.map((product, index) => (
               <ProductCard product={product} key={index} />
            ))}
         </div>
      </div>
   )
}

export default ProductList
