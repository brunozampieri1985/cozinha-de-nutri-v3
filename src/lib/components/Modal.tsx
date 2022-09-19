import React, {
   useState,
   useEffect,
   useImperativeHandle,
   forwardRef,
} from 'react'
import ToggleBodyScroll from '@helpers/ToggleBodyScroll'

interface ModalProps {
   children: React.ReactNode
   closeOnOutsideClick?: boolean
}

export interface ModalRef {
   open: () => void
   close: () => void
}

const Modal = forwardRef<ModalRef, ModalProps>(
   ({ children, closeOnOutsideClick }, ref) => {
      const [isOpen, setIsOpen] = useState(false)

      useImperativeHandle(ref, () => ({
         open: () => setIsOpen(true),
         close: () => setIsOpen(false),
      }))

      useEffect(() => {
         ToggleBodyScroll(isOpen)
      }, [isOpen])

      const handleOutsideClick = () => {
         if (closeOnOutsideClick || closeOnOutsideClick === undefined)
            setIsOpen(false)
         return
      }

      if (!isOpen) return null
      return (
         <div className="modal">
            <div className="modal-overlay" onClick={handleOutsideClick} />
            <div className="modal-content">
               <div
                  className="modal-close-button"
                  onClick={() => setIsOpen(false)}>
                  &times;
               </div>
               <div className="modal-children">{children}</div>
            </div>
         </div>
      )
   }
)

Modal.displayName = 'Modal'

export default Modal
