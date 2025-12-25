import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
  hover?: boolean;
  glow?: boolean;
}

export const GlassmorphismCard = ({ 
  children, 
  className = "",
  variant = "default",
  hover = true,
  glow = false
}: GlassmorphismCardProps) => {
  const variants = {
    default: "glass",
    strong: "glass-strong",
    subtle: "glass-subtle",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { 
        y: -5,
        boxShadow: "0 20px 40px hsl(0 0% 0% / 0.4)",
      } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl p-6 transition-all duration-500",
        variants[variant],
        glow && "shadow-glow",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

// Card with gradient border
interface GradientBorderCardProps {
  children: ReactNode;
  className?: string;
}

export const GradientBorderCard = ({ children, className = "" }: GradientBorderCardProps) => {
  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-br from-champagne/50 via-transparent to-rose-gold/30 ${className}`}>
      <div className="bg-card rounded-2xl h-full">
        {children}
      </div>
    </div>
  );
};

// Animated border card
export const AnimatedBorderCard = ({ children, className = "" }: GradientBorderCardProps) => {
  return (
    <motion.div 
      className={`relative p-[1px] rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-champagne via-rose-gold to-champagne"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <div className="relative bg-card rounded-2xl h-full">
        {children}
      </div>
    </motion.div>
  );
};
