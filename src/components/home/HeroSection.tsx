import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Building2, Shield, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";
import heroBg from "@/assets/hero-construction.jpg"; // Using reliable existing image

const ServiceItem = ({ icon: Icon, title, text }: { icon: any, title: string, text: string }) => (
  <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
    <div className="bg-[#FFB800] p-2.5 rounded-lg flex-shrink-0 text-black">
      <Icon size={20} strokeWidth={2.5} />
    </div>
    <div>
      <h3 className="text-white font-semibold text-base mb-1">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{text}</p>
    </div>
  </div>
);

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#050505] overflow-hidden pt-28 pb-20">
      {/* Background Layer - Clean and Stable */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Construction Site"
          className="w-full h-full object-cover"
        />
        {/* Professional Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 space-y-8"
          >
            {/* Brand Tag */}
            <div className="inline-flex items-center gap-2 border-l-4 border-[#FFB800] pl-4">
              <span className="text-[#FFB800] font-bold tracking-widest uppercase text-sm">Since 1993</span>
              <span className="text-slate-500 text-sm">|</span>
              <span className="text-slate-300 text-sm tracking-wide uppercase">Pinnacle Build</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.1]">
              Building Your <br />
              <span className="text-[#FFB800]">Legacy</span> With <br />
              Precision
            </h1>

            <p className="text-lg text-slate-300 max-w-lg leading-relaxed border-l border-white/10 pl-6 py-2">
              Brixx Space delivers tire-1 construction consultation and project advisory. We transform complex engineering challenges into seamless execution using data-driven insights.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/contact">
                <Button className="h-14 px-8 bg-[#FFB800] hover:bg-[#E5A500] text-black font-bold text-base uppercase tracking-wider rounded-sm transition-all w-full sm:w-auto">
                  Get Consultation
                </Button>
              </Link>
              <Link to="/projects">
                <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white text-base uppercase tracking-wider rounded-sm w-full sm:w-auto hover:text-black transition-all">
                  View Portfolio
                </Button>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="flex items-center gap-12 pt-8 border-t border-white/10 mt-8">
              <div>
                <h4 className="text-3xl font-bold text-white">500+</h4>
                <p className="text-slate-400 text-sm uppercase tracking-wider">Projects</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white">30+</h4>
                <p className="text-slate-400 text-sm uppercase tracking-wider">Years Exp.</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-white">100%</h4>
                <p className="text-slate-400 text-sm uppercase tracking-wider">Compliance</p>
              </div>
            </div>
          </motion.div>

          {/* Services/Feature Column - Clean Corporate List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 lg:p-10 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                <Building2 className="text-[#FFB800]" />
                Our Expertise
              </h3>

              <div className="space-y-2">
                <ServiceItem
                  icon={Shield}
                  title="Risk Management"
                  text="Comprehensive analysis to foresee and mitigate construction risks before they occur."
                />
                <div className="h-px bg-white/5 mx-4" />
                <ServiceItem
                  icon={BarChart3}
                  title="Cost Optimization"
                  text="Strategic financial planning to maximize value engineering and reduce waste."
                />
                <div className="h-px bg-white/5 mx-4" />
                <ServiceItem
                  icon={Clock}
                  title="Project Scheduling"
                  text="Advanced timeline management ensuring rapid, predictable delivery milestones."
                />
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 text-center">
                <Link to="/services" className="inline-flex items-center text-[#FFB800] hover:text-white transition-colors text-sm font-semibold uppercase tracking-widest group">
                  Explore All Services
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
