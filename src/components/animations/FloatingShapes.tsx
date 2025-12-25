import { motion } from "framer-motion";

interface FloatingShapeProps {
  className?: string;
  size?: number;
  color?: string;
  delay?: number;
  duration?: number;
}

export const FloatingCircle = ({
  className = "",
  size = 100,
  color = "hsl(35 75% 55% / 0.1)",
  delay = 0,
  duration = 8,
}: FloatingShapeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: [0, -30, 0],
        x: [0, 15, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
        x: { duration: duration * 1.2, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
      }}
    />
  );
};

export const FloatingSquare = ({
  className = "",
  size = 80,
  color = "hsl(35 75% 55% / 0.08)",
  delay = 0,
  duration = 10,
}: FloatingShapeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ 
        opacity: 1,
        rotate: 360,
        y: [0, 20, 0],
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        rotate: { duration: duration * 2, repeat: Infinity, ease: "linear" },
        y: { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: size * 0.15,
      }}
    />
  );
};

export const AnimatedLine = ({
  className = "",
  color = "hsl(35 75% 55% / 0.3)",
}: {
  className?: string;
  color?: string;
}) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`h-px origin-left ${className}`}
      style={{ background: color }}
    />
  );
};

export const GradientOrb = ({
  className = "",
  size = 400,
  delay = 0,
}: FloatingShapeProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.3, 0.5, 0.3],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: "radial-gradient(circle, hsl(35 75% 55% / 0.15) 0%, transparent 70%)",
      }}
    />
  );
};
