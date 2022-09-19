import type { NextPage } from 'next'
import { useEffect, useRef } from 'react'
import PageLayout from '@components/PageLayout'
import ProductList from '@components/ProductList'
import Cart from '@components/Cart'
import Modal, { ModalRef } from '@components/Modal'
import DescontosCoponent from '@components/DescontosCoponent'

const Home: NextPage = () => {
   const modalRef = useRef<ModalRef>(null)

   useEffect(() => {
      if (window !== undefined) modalRef.current?.open()
   }, [])

   return (
      <PageLayout>
         <ProductList />
         <Cart />
         {/* <Modal closeOnOutsideClick ref={modalRef}>
            <DescontosCoponent />
         </Modal> */}
      </PageLayout>
   )
}

export default Home
