import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Modal, ModalBody } from "react-modern-modal"

interface ModalProps {
  open: boolean
  handleClose: () => void
  size: any
  children: any
}

const MotionModal: React.FC<ModalProps> = ({
  open,
  handleClose,
  size,
  children
}) => {
  const [isBrowser, setIsBrowser] = useState(false)

  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return null
  }

  return (
    <AnimatePresence>
      {open && (
        <Modal
          isOpen={open}
          onClose={handleClose}
          size={size}
          backdropBlur={true}
        >
          <ModalBody>{children}</ModalBody>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default MotionModal
