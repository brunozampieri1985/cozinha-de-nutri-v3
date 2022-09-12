import Image from 'next/image'
import useScreenSize from '../hooks/useScreenSize'

const Logo: React.FC = () => {
   const screen = useScreenSize()
   const logoSrc = screen.width > 768 ? '/logo-full.svg' : '/logo.svg'
   const logoSize = {
      width: screen.width > 768 ? '250x' : '80px',
      height: screen.width > 768 ? '100x' : '80px',
   }

   return (
      <div>
         <Image
            src={logoSrc}
            alt="Logo Cozinha de Nutri"
            width={logoSize.width}
            height={logoSize.height}
         />
      </div>
   )
}

export default Logo
