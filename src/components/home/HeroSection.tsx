import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MousePointer2, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-construction.jpg";
import { useRef } from "react";

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center bg-[#080808] overflow-hidden pt-32"
    >
      {/* Dynamic Background Layer */}
      <motion.div
        style={{ y: y1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/40 via-transparent to-[#080808] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent z-10" />
        <img
          src={heroBg}
          alt="Premium Construction"
          className="w-full h-full object-cover opacity-60 scale-110"
        />

        {/* Subtle Decorative Grid */}
        <div className="absolute inset-0 z-10 opacity-10 bg-[linear-gradient(rgba(255,184,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,184,0,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">


            {/* Title with Playfair Display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-white font-bold leading-[0.9] tracking-tighter mb-8">
                Building <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold-dark italic pr-4">
                  Masterpieces
                </span>
              </h1>
            </motion.div>

            {/* Refined Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl"
            >
              <p className="text-lg md:text-xl text-white/60 leading-relaxed mb-10 font-body">
                Redefining the landscape of South Tamil Nadu with architectural precision and engineering excellence. We don't just build structures; we create landmarks.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-6"
            >
              <Link to="/contact">
                <Button className="h-16 px-10 bg-gold hover:bg-gold-dark text-black font-bold text-base uppercase tracking-widest rounded-none group relative overflow-hidden transition-all duration-500">
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </Link>

              <Link to="/projects">
                <Button
                  variant="outline"
                  className="h-16 px-10 border-white/20 text-white hover:bg-white hover:text-black hover:border-white font-medium text-base uppercase tracking-widest rounded-none transition-all duration-300 backdrop-blur-sm"
                >
                  Discover Portfolio
                </Button>
              </Link>
            </motion.div>
          </div>


        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
        <div className="w-px h-16 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
      </motion.div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};
