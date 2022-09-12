type SpinnerProps = {
   text: string
   size: number
}

const Spinner: React.FC<SpinnerProps> = ({ text, size }) => {
   return (
      <div className="spinner-wrapper">
         <div
            className="spinner"
            style={{
               width: `${size}px`,
               height: `${size}px`,
            }}>           
         </div>
            <p>{text}</p>
      </div>
   )
}

export default Spinner
