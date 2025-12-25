import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { FloatingCircle, FloatingSquare, GradientOrb } from "@/components/animations/FloatingShapes";
import heroImage from "@/assets/hero-construction.jpg";
import { useRef } from "react";
export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  return <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{
      scale
    }}>
        <motion.div initial={{
        scale: 1.2,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        duration: 1.8,
        ease: "easeOut"
      }} className="absolute inset-0">
          <img src={heroImage} alt="Premium construction site in South Tamil Nadu" className="w-full h-full object-cover" />
        </motion.div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-deep-blue/40" />
      </motion.div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <GradientOrb className="top-20 -right-32" size={500} delay={0} />
        <GradientOrb className="bottom-40 -left-20" size={300} delay={2} />
        <FloatingCircle className="top-1/4 right-1/4" size={120} delay={0.5} />
        <FloatingCircle className="bottom-1/3 left-1/5" size={80} delay={1} />
        <FloatingSquare className="top-1/3 left-1/4" size={60} delay={1.5} />
        <FloatingSquare className="bottom-1/4 right-1/3" size={40} delay={2} />
        
        {/* Animated Lines */}
        <motion.div initial={{
        scaleX: 0
      }} animate={{
        scaleX: 1
      }} transition={{
        duration: 2,
        delay: 1,
        ease: "easeOut"
      }} className="absolute top-1/2 left-0 right-0 h-px bg-sand/10 origin-left" />
        <motion.div initial={{
        scaleY: 0
      }} animate={{
        scaleY: 1
      }} transition={{
        duration: 2,
        delay: 1.2,
        ease: "easeOut"
      }} className="absolute left-1/4 top-0 bottom-0 w-px bg-sand/10 origin-top" />
      </div>

      {/* Content */}
      <motion.div className="container mx-auto px-6 relative z-10" style={{
      y,
      opacity
    }}>
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div initial={{
          opacity: 0,
          y: 30,
          scale: 0.9
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }} className="mb-8">
            
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 1,
          delay: 0.5
        }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] mb-8">
            <motion.span initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.6
          }}>
              Building{" "}
            </motion.span>
            <motion.span initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="text-gradient-sand">
              South Tamil Nadu's
            </motion.span>
            <br />
            <motion.span initial={{
            opacity: 0,
            x: 30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 1
          }}>
              Tomorrow
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1.1
        }} className="text-lg md:text-xl text-cream/75 mb-12 max-w-2xl leading-relaxed">
            BRIXXSPACE transforms ambitious visions into architectural masterpieces. 
            Premium construction and infrastructure solutions rooted in Tirunelveli, 
            serving communities across South Tamil Nadu with trust and excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          delay: 1.3
        }} className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="w-full sm:w-auto group">
                Get Consultation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button variant="hero-outline" size="xl" className="group">
                View Projects
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </motion.div>

          {/* Quick Contact */}
          <motion.a href="tel:+919876543210" initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.8,
          delay: 1.5
        }} className="inline-flex items-center gap-3 text-cream/60 hover:text-sand transition-colors">
            <div className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-cream/40">Call Now</p>
              <p className="font-medium">+91 98765 43210</p>
            </div>
          </motion.a>
        </div>
      </motion.div>

      {/* Animated Stats Bar */}
      <motion.div initial={{
      opacity: 0,
      y: 80
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 1,
      delay: 1.6
    }} className="absolute bottom-0 left-0 right-0 bg-deep-blue/90 backdrop-blur-md border-t border-cream/10">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{
            value: 200,
            suffix: "+",
            label: "Projects Delivered"
          }, {
            value: 15,
            suffix: "+",
            label: "Years of Trust"
          }, {
            value: 50,
            suffix: "+",
            label: "Expert Team"
          }, {
            value: 100,
            suffix: "%",
            label: "Client Satisfaction"
          }].map((stat, index) => <motion.div key={stat.label} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 1.8 + index * 0.1
          }} className="text-center md:text-left group">
                <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-sand mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                </p>
                <p className="text-cream/50 text-sm uppercase tracking-wider group-hover:text-cream/70 transition-colors">
                  {stat.label}
                </p>
              </motion.div>)}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 2.5,
      duration: 1
    }} className="absolute bottom-32 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <motion.div animate={{
        y: [0, 10, 0]
      }} transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }} className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2">
          <motion.div animate={{
          y: [0, 12, 0]
        }} transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }} className="w-1 h-3 bg-sand rounded-full" />
        </motion.div>
        <span className="text-xs text-cream/40 uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>;
};