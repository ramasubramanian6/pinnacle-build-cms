import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Award, Users, Building2, Zap, Shield, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";
import { useRef } from "react";

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] hover:border-[#FFB800]/50 transition-all duration-300 backdrop-blur-md overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFB800]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">
          <Icon className="w-6 h-6 text-[#FFB800]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFB800] transition-colors">{title}</h3>
        <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{desc}</p>
      </div>
    </motion.div>
  );
};

const StatBadge = ({ value, label, delay }: { value: string, label: string, delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-xl hover:border-[#FFB800]/30 transition-colors"
  >
    <span className="text-3xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{value}</span>
    <span className="text-xs uppercase tracking-wider text-[#FFB800] font-semibold mt-1">{label}</span>
  </motion.div>
);

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center bg-[#050505] overflow-hidden pt-32 pb-20"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Abstract Architectural Grid */}
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 184, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 184, 0, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
          }}
        />

        {/* Glow Effects */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#FFB800]/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="space-y-10">
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB800]"></span>
              </span>
              <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">Next-Gen Construction Intelligence</span>
            </motion.div>

            {/* Logo & Headline */}
            <div>
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                src={brixxspaceLogo}
                alt="Brixx Space"
                className="h-16 w-auto mb-8 drop-shadow-[0_0_15px_rgba(255,184,0,0.3)]"
              />
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-white"
              >
                Visionary <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB800] via-[#F59E0B] to-[#D97706]">
                  Engineering
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-6 text-xl text-slate-400 max-w-xl leading-relaxed"
              >
                Experience the future of construction consultation. We blend 30+ years of expertise with cutting-edge methodology to build your legacy.
              </motion.p>
            </div>

            {/* Strategic Stats Row */}
            <div className="flex flex-wrap gap-4">
              <StatBadge value="30+" label="Years" delay={0.4} />
              <StatBadge value="500+" label="Projects" delay={0.5} />
              <StatBadge value="100%" label="Success" delay={0.6} />
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link to="/contact">
                <Button className="h-14 px-8 rounded-xl bg-[#FFB800] hover:bg-[#F59E0B] text-black font-bold text-lg shadow-[0_0_30px_rgba(255,184,0,0.3)] hover:shadow-[0_0_50px_rgba(255,184,0,0.5)] transition-all duration-300 group">
                  Start Your Project
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+919894948011">
                <Button variant="outline" className="h-14 px-8 rounded-xl border-white/20 text-white hover:bg-white/10 hover:border-[#FFB800]/50 text-lg group">
                  <Phone className="mr-3 w-5 h-5 group-hover:text-[#FFB800] transition-colors" />
                  Request Callback
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Futuristic Dashboard / Visuals */}
          <div className="relative transform perspective-[1000px]">
            {/* Floating Glass Cards Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20"
              initial={{ opacity: 0, rotateX: 10, y: 50 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <FeatureCard
                icon={Building2}
                title="Smart Planning"
                desc="Data-driven architectural insights for optimal spatial efficiency."
                delay={0.6}
              />
              <FeatureCard
                icon={Shield}
                title="Risk Mitigation"
                desc="Advanced predictive modeling to foresee and prevent delays."
                delay={0.7}
              />
              <FeatureCard
                icon={BarChart3}
                title="Cost Optimization"
                desc="AI-assisted budget analysis ensuring maximum value engineering."
                delay={0.8}
              />
              <FeatureCard
                icon={Zap}
                title="Rapid Execution"
                desc="Streamlined workflows integrating modern construction tech."
                delay={0.9}
              />
            </motion.div>

            {/* Decorative Background Elements Behind Cards */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB800]/10 to-blue-500/10 rounded-[3rem] blur-3xl -z-10" />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 border border-[#FFB800]/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-10 -left-10 w-48 h-48 border border-blue-500/20 rounded-full border-dashed"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
