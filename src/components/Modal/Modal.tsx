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
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #ddd',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
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
        >
          <Box sx={style}>
            {children}
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default MotionModal
