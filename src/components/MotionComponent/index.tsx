import React from "react"
import { motion } from "framer-motion"
import { type ReactElement } from "react"

interface Props {
  children?: ReactElement
}

const index = (props: Props) => {
  const { children } = props

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      {children}
    </motion.div>
  )
}

export default index
