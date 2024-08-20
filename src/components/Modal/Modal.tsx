import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  children: any
}

const style = {
  border: "none",
};



const MotionModal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
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
      {isOpen && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={style}
        >
          <Box className="modal_custom" >
            {children}
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default MotionModal
