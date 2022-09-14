interface InputProps {
   type: string
   valid: boolean | null
   value: string
   placeholder: string
   name: string
   onChange?: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => void
}

const Input: React.FC<InputProps> = ({
   type,
   valid,
   value,
   placeholder,
   onChange,
   name,
}) => {
   const validation = () => {
      if (valid == false) return '0 0 10px #8f0000'
      if (valid == null) return 'var(--shadow-text)'
      if (valid == true) return 'var(--shadow-primary)'
   }

   return (
      <div className="input-box">
         {type === 'textarea' ? (
            <textarea
               name={name}
               placeholder={placeholder}
               required
               style={
                  {
                     '--valid-color': validation(),
                  } as React.CSSProperties
               }
               value={value}
               onChange={onChange}
            />
            
         ) : (
            <>
               <input
                  name={name}
                  type={type}
                  placeholder={''}
                  required
                  style={
                     {
                        '--valid-color': validation(),
                     } as React.CSSProperties
                  }
                  value={value}
                  onChange={onChange}
               />
               <span>{placeholder}</span>
            </>
         )}
      </div>
   )
}

export default Input
