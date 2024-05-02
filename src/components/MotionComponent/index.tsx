// import React from "react"
// import { motion } from "framer-motion"
import { type ReactElement } from "react"

// interface Props {
//   children?: ReactElement
// }

// const index = (props: Props) => {
//   const { children } = props

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -50 }}
//     >
//       {children}
//     </motion.div>
//   )
// }

// export default index

import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

interface Props {
  children?: ReactElement
}

const index = (props: Props) => {
  const { children } = props
  const motionVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const motionTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={motionVariants} transition={motionTransition}>
      {children}
    </motion.div>
  );
};

index.propTypes = {
  children: PropTypes.node
};

export default index;
