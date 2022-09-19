import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

const Socials: React.FC = () => {
   return (
      <div className="socials">
         <div className="whatsapp">
            <a href="https://wa.me/5513991632069">
               <FaWhatsapp />
            </a>
         </div>
         <div className="instagram">
            <a href="https://www.instagram.com/cozinha.denutri/">
               <FaInstagram />
            </a>
         </div>
      </div>
   )
}

export default Socials
