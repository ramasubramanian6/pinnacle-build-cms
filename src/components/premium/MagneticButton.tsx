import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  magneticIntensity?: number;
  onClick?: () => void;
}

export const MagneticButton = ({
  children,
  className = "",
  magneticIntensity = 0.3,
  onClick
}: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 30 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = (e.clientX - centerX) * magneticIntensity;
    const distanceY = (e.clientY - centerY) * magneticIntensity;

    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: xSpring, y: ySpring }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.button>
  );
};

// Ripple effect button
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const RippleButton = ({ children, className = "", onClick, ...props }: RippleButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "absolute w-0 h-0 bg-white/30 rounded-full animate-[ripple_0.6s_linear] pointer-events-none";

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    onClick?.(e);
  };

  return (
    <button
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </button>
  );
};

// Glow button
interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlowButton = ({ children, className = "", onClick }: GlowButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-8 py-4 rounded-lg bg-gradient-to-r from-champagne to-champagne-dark text-background font-medium",
        "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-champagne before:to-champagne-dark before:blur-xl before:opacity-50 before:-z-10",
        "hover:shadow-gold transition-shadow duration-300",
        className
      )}
    >
      {children}
    </motion.button>
  );
};
