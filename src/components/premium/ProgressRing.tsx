import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showPercentage?: boolean;
  label?: string;
  color?: string;
}

export const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  className = "",
  showPercentage = true,
  label,
  color = "hsl(45 100% 60%)",
}: ProgressRingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(240 10% 15%)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: isInView ? offset : circumference }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="text-2xl font-display font-semibold text-foreground"
          >
            {progress}%
          </motion.span>
        )}
        {label && (
          <span className="text-xs text-muted-foreground mt-1">{label}</span>
        )}
      </div>
    </div>
  );
};

// Animated counter
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  className = "",
  duration = 2,
}: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView && (
          <Counter from={0} to={value} duration={duration} />
        )}
      </motion.span>
      {suffix}
    </motion.span>
  );
};

const Counter = ({ from, to, duration }: { from: number; to: number; duration: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {(() => {
          const [count, setCount] = useState(from);
          
          useEffect(() => {
            const startTime = Date.now();
            const endTime = startTime + duration * 1000;
            
            const updateCount = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / (duration * 1000), 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const currentCount = Math.floor(from + (to - from) * easeOutQuart);
              
              setCount(currentCount);
              
              if (progress < 1) {
                requestAnimationFrame(updateCount);
              } else {
                setCount(to);
              }
            };
            
            requestAnimationFrame(updateCount);
          }, []);
          
          return count;
        })()}
      </motion.span>
    </motion.span>
  );
};

import { useState, useEffect } from "react";
