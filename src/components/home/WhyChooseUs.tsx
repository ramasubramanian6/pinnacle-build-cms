import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, Wrench, Leaf } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every project undergoes rigorous quality control with industry-leading standards and materials.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We pride ourselves on meeting deadlines without compromising on quality or safety.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized globally for excellence in construction with over 50 industry awards.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Our team of 150+ seasoned professionals brings decades of combined experience.",
  },
  {
    icon: Wrench,
    title: "Modern Technology",
    description: "Utilizing cutting-edge construction technology and innovative building methods.",
  },
  {
    icon: Leaf,
    title: "Sustainable Building",
    description: "Committed to green construction practices and LEED-certified developments.",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block"
          >
            Why Choose Apex
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6"
          >
            Building Excellence at Every Step
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            We combine time-tested expertise with innovative approaches to deliver 
            construction solutions that exceed expectations.
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
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 h-full border border-border hover:border-accent/30">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <feature.icon className="w-7 h-7 text-accent group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
