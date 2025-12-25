import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const easeOut = [0.16, 1, 0.3, 1] as const;
const easeIn = [0.4, 0, 0.2, 1] as const;

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: easeIn,
    },
  },
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Curtain reveal transition
export const CurtainTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} className="relative">
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.8, ease: easeOut, delay: 0.2 } }}
          exit={{ scaleY: 1, transition: { duration: 0.6, ease: easeIn } }}
          className="fixed inset-0 z-50 bg-accent origin-bottom"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.5 } }}
          exit={{ opacity: 0 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Stagger content wrapper
interface StaggerWrapperProps {
  children: ReactNode;
  delay?: number;
}

export const StaggerWrapper = ({ children, delay = 0 }: StaggerWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
};
