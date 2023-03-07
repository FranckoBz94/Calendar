import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Modal, Box, Fade, Button } from "@mui/material"

interface ModalProps {
  open: boolean
  handleClose: () => void
  children: any
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

const modalVariants = {
  hidden: {
    opacity: 0,
    y: "-50vh"
  },
  visible: {
    position: "absolute" as "absolute",
    top: "40%",
    left: "50%",
    opacity: 1,
    y: "0",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
}

const MotionModal: React.FC<ModalProps> = ({ open, handleClose, children }) => {
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
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Fade in={open}>
              <motion.div
                className="modal"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <Box sx={style}>
                  <div className="modal-dialog modal-lg modal-dialog-centered">
                    {children}
                  </div>
                  <Button onClick={handleClose}>Close</Button>
                </Box>
              </motion.div>
            </Fade>
          </Modal>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MotionModal
