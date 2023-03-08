import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Modal, Fade } from "@mui/material"
import { useStyles } from "./styles"

interface ModalProps {
  open: boolean
  handleClose: () => void
  children: any
}

const MotionModal: React.FC<ModalProps> = ({ open, handleClose, children }) => {
  const classes: any = useStyles()

  const [isBrowser, setIsBrowser] = useState(false)

  // Avoids server-side rendering errors
  React.useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return null
  }

  return (
    <AnimatePresence>
      {open && (
        <div>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            slotProps={{
              backdrop: {
                TransitionComponent: Fade
              }
            }}
          >
            <div className={classes.modalContainer}>{children}</div>
          </Modal>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MotionModal
