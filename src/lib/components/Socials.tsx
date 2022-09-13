import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'

const Socials: React.FC = () => {

   return (
      <div className='socials'>
         <div className='whatsapp'>
            <Link href="https://wa.me/5513991632069" passHref>
               <FaWhatsapp />
            </Link>
         </div>
         <div className='instagram'>
            <Link href="https://www.instagram.com/cozinha.denutri/" passHref>
               <FaInstagram />
            </Link>
         </div>
      </div>
   )
}

export default Socials