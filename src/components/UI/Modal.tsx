import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react'

interface IProps {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  description?: string;
  children: ReactNode
}

const Modal = ({isOpen, closeModal, title, description, children}: IProps) => {

  return (
    <>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/50 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-lg space-y-4 bg-white rounded-lg p-6 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle className="text-lg font-bold capitalize">{title}</DialogTitle>
            {description ? <Description>{description}</Description> : ""}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default Modal;