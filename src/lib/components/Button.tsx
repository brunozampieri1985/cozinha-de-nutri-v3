import { HTMLAttributes } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
   variant?: 'primary' | 'secondary' | 'outline' | 'neutral' | 'ghost'
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...rest }) => {
   const buttonClass = `button button--${variant ?? 'primary'}`
   return (
      <button className={buttonClass} {...rest}>
         {children}
      </button>
   )
}

export default Button
