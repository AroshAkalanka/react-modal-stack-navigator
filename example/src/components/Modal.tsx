import React, { FC, ReactNode } from 'react'

interface ModalProps {
  open: boolean
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
