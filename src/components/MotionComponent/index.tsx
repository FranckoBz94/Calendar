import { type ReactElement } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children?: ReactElement;
}

const MotionComponent = ({ children }: Props) => {
  const motionVariants = {
    initial: {
      opacity: 0,
      scale: 0.98, // Más sutil
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 1.02, // Más sutil
    },
  };

  const motionTransition = {
    duration: 0, // Reducido
    ease: 'easeInOut', // Usar ease
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={motionVariants}
        transition={motionTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

MotionComponent.propTypes = {
  children: PropTypes.node,
};

export default MotionComponent;
