import { motion } from "framer-motion";
import { useState, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface AnimatedInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AnimatedInput = ({ 
  label, 
  error, 
  className = "",
  ...props 
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  return (
    <div className="relative">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? "hsl(45 100% 60%)" : "hsl(240 5% 55%)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-4 top-4 pointer-events-none origin-left"
      >
        {label}
      </motion.label>
      <input
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(!!e.target.value);
          props.onChange?.(e);
        }}
        className={cn(
          "w-full px-4 pt-6 pb-2 bg-secondary border border-border rounded-lg",
          "text-foreground placeholder-transparent",
          "transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

interface AnimatedTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const AnimatedTextarea = ({ 
  label, 
  error, 
  className = "",
  ...props 
}: AnimatedTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);

  return (
    <div className="relative">
      <motion.label
        initial={false}
        animate={{
          y: isFocused || hasValue ? -24 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? "hsl(45 100% 60%)" : "hsl(240 5% 55%)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute left-4 top-4 pointer-events-none origin-left"
      >
        {label}
      </motion.label>
      <textarea
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
          props.onBlur?.(e);
        }}
        onChange={(e) => {
          setHasValue(!!e.target.value);
          props.onChange?.(e);
        }}
        className={cn(
          "w-full px-4 pt-6 pb-2 bg-secondary border border-border rounded-lg",
          "text-foreground placeholder-transparent resize-none",
          "transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
          error && "border-destructive focus:ring-destructive/50",
          className
        )}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent origin-left"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
