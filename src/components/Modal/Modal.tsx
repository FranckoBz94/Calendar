import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface ModalProps {
  isOpen: boolean
  handleClose: () => void
  children: any
  size?: string
}

const style = {
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};



const MotionModal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  children,
  size
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
          sx={size ? { width: size } : {}}
        >
          <Box className="modal_custom" >
            <IconButton
              onClick={handleClose}
              sx={{ position: 'absolute', top: 20, right: 8, zIndex: 999 }}
            >
              <CloseIcon />
            </IconButton>
            {children}
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  )
}

export default MotionModal
