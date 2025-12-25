import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: string;
  className?: string;
  delay?: number;
  type?: "words" | "chars" | "lines";
}

export const AnimatedText = ({ 
  children, 
  className = "", 
  delay = 0,
  type = "words" 
}: AnimatedTextProps) => {
  const words = children.split(" ");
  const chars = children.split("");

  if (type === "chars") {
    return (
      <span className={className}>
        {chars.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: delay + i * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
};

// Gradient shimmer text
interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export const GradientText = ({ children, className = "" }: GradientTextProps) => {
  return (
    <span 
      className={`bg-gradient-to-r from-champagne via-champagne-light to-champagne bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
};

// Reveal text with clip-path
interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const RevealText = ({ children, className = "", delay = 0 }: RevealTextProps) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
}

export const Typewriter = ({ text, className = "", speed = 50 }: TypewriterProps) => {
  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0,
            delay: i * (speed / 1000),
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Split line reveal
interface SplitLineRevealProps {
  children: string;
  className?: string;
}

export const SplitLineReveal = ({ children, className = "" }: SplitLineRevealProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
