import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface Premium3DCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  spotlightColor?: string;
}

export const Premium3DCard = ({ 
  children, 
  className = "",
  intensity = 15,
  spotlightColor = "hsl(45 100% 60% / 0.15)"
}: Premium3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${intensity}deg`, `-${intensity}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${intensity}deg`, `${intensity}deg`]);

  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 50%)`,
          // @ts-ignore
          "--spotlight-x": spotlightX,
          "--spotlight-y": spotlightY,
        }}
      />
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
};

// Simpler tilt card
interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export const TiltCard = ({ children, className = "" }: TiltCardProps) => {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`transform-gpu ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </motion.div>
  );
};
