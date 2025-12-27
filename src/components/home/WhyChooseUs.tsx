import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, Wrench, Leaf } from "lucide-react";
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
    description: "Every project undergoes rigorous quality control with industry-leading standards.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We pride ourselves on meeting deadlines without compromising on quality.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized for outstanding construction practices and innovative designs.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team of 50+ seasoned professionals brings decades of experience.",
  },
  {
    icon: Wrench,
    title: "Modern Technology",
    description: "Combining traditional craftsmanship with cutting-edge construction technology.",
  },
  {
    icon: Leaf,
    title: "Sustainable Building",
    description: "Committed to eco-friendly construction practices for a better tomorrow.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block"
          >
            Why Choose Us
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Built on Trust, Delivered with Excellence
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            For over 15 years, we've earned the trust of families and businesses 
            through unwavering commitment to quality and innovation.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-card p-8 rounded-lg border border-border hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
