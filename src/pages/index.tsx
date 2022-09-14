import type { NextPage } from 'next'
import PageLayout from '@components/PageLayout'
import ProductList from '@components/ProductList'
import Cart from '@components/Cart'
import InstallButton from '@components/InstallButton'

const Home: NextPage = () => {
   return (
      <PageLayout>         
         <ProductList />
         <Cart />
      </PageLayout>
   )
}

export default Home
