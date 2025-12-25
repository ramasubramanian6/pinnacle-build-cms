import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, Wrench, Leaf } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { HoverLift } from "@/components/animations/HoverEffects";
import { AnimatedLine } from "@/components/animations/FloatingShapes";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every project undergoes rigorous quality control with industry-leading standards trusted across South Tamil Nadu.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We pride ourselves on meeting deadlines without compromising on quality, respecting your time and investment.",
  },
  {
    icon: Award,
    title: "Regional Excellence",
    description: "Recognized for outstanding construction practices with deep roots in Tirunelveli and surrounding districts.",
  },
  {
    icon: Users,
    title: "Local Expertise",
    description: "Our team of 50+ seasoned professionals understands the unique needs and challenges of South Tamil Nadu.",
  },
  {
    icon: Wrench,
    title: "Modern Technology",
    description: "Combining traditional craftsmanship with cutting-edge construction technology for superior results.",
  },
  {
    icon: Leaf,
    title: "Sustainable Building",
    description: "Committed to eco-friendly construction practices that respect our environment and heritage.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        className="absolute top-0 right-0 w-96 h-96 bg-sand/5 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <RevealOnScroll>
            <span className="text-sand font-medium uppercase tracking-wider text-sm mb-4 block">
              Why Choose BRIXXSPACE
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Built on Trust, Delivered with Excellence
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-muted-foreground text-lg">
              For over 15 years, we've earned the trust of families and businesses 
              across South Tamil Nadu through unwavering commitment to quality.
            </p>
          </RevealOnScroll>
          
          <AnimatedLine className="w-24 mx-auto mt-8" color="hsl(35 75% 55% / 0.5)" />
        </div>

        {/* Features Grid */}
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          staggerDelay={0.1}
        >
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <HoverLift className="h-full">
                <div className="bg-card p-8 rounded-xl border border-border hover:border-sand/30 transition-all duration-300 h-full group">
                  <motion.div 
                    className="w-14 h-14 bg-sand/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sand transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <feature.icon className="w-7 h-7 text-sand group-hover:text-deep-blue transition-colors duration-300" />
                  </motion.div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
