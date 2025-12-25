import { ReactNode } from "react";
import { motion } from "framer-motion";

interface HoverScaleProps {
  children: ReactNode;
  scale?: number;
  className?: string;
}

export const HoverScale = ({
  children,
  scale = 1.05,
  className = "",
}: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface HoverLiftProps {
  children: ReactNode;
  lift?: number;
  className?: string;
}

export const HoverLift = ({
  children,
  lift = -8,
  className = "",
}: HoverLiftProps) => {
  return (
    <motion.div
      whileHover={{ 
        y: lift,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ImageHoverZoomProps {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
}

export const ImageHoverZoom = ({
  src,
  alt,
  className = "",
  overlayClassName = "",
}: ImageHoverZoomProps) => {
  return (
    <motion.div
      className={`overflow-hidden relative group ${className}`}
      whileHover="hovered"
      initial="initial"
    >
      <motion.img
        src={src}
        alt={alt}
        variants={{
          initial: { scale: 1 },
          hovered: { scale: 1.1 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full h-full object-cover"
      />
      <motion.div
        variants={{
          initial: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent ${overlayClassName}`}
      />
    </motion.div>
  );
};
