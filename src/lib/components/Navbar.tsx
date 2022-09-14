import Link from 'next/link'
import { useState } from 'react'
import { FaHome, FaTruck, FaMoneyBill, FaEnvelope } from 'react-icons/fa'
import Logo from '@components/Logo'
import InstallButton from './InstallButton'


const Navbar: React.FC = () => {
   const [isMenuActive, setIsMenuActive] = useState(false)
   return (
      <nav className="navbar">
         <div className="navbar-container">
            <div className="navbar-logo">
               <Logo />
            </div>
            <div
               className={`navbar-menu-icon ${isMenuActive ? 'active' : ''}`}
               onClick={() => setIsMenuActive(!isMenuActive)}>
               <span className="navbar-menu-icon-span1" />
               <span className="navbar-menu-icon-span2" />
               <span className="navbar-menu-icon-span3" />
            </div>
            <ul className={`navbar-menu ${isMenuActive ? 'active' : ''}`}>
               <li className="navbar-menu-item">
                  <div>
                     <FaHome />
                     <Link href="/" passHref>
                        Home
                     </Link>
                  </div>
               </li>
               <li className="navbar-menu-item">
                  <div>
                     <FaTruck />
                     <Link href="/entrega" passHref>
                        Entrega
                     </Link>
                  </div>
               </li>
               <li className="navbar-menu-item">
                  <div>
                     <FaMoneyBill />
                     <Link href="/descontos" passHref>
                        Descontos
                     </Link>
                  </div>
               </li>
               <li className="navbar-menu-item">
                  <div>
                     <FaEnvelope />
                     <Link href="/contato" passHref>
                        Contato
                     </Link>
                  </div>
               </li>
            <InstallButton />
            </ul>
         </div>
      </nav>
   )
}

export default Navbar
