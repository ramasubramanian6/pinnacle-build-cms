import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { GradientOrb, FloatingCircle } from "@/components/animations/FloatingShapes";

export const CTASection = () => {
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in BRIXXSPACE construction services.");

  return (
    <section className="py-24 bg-deep-blue relative overflow-hidden">
      {/* Background Pattern & Effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} 
        />
        <GradientOrb className="-top-32 -right-32" size={600} />
        <GradientOrb className="-bottom-32 -left-32" size={400} delay={1} />
        <FloatingCircle className="top-1/4 right-1/4" size={100} delay={0.5} />
        <FloatingCircle className="bottom-1/4 left-1/3" size={60} delay={1.5} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <span className="text-sand font-medium uppercase tracking-wider text-sm mb-6 block">
              Let's Build Together
            </span>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Ready to Build{" "}
              <span className="text-gradient-sand">Nellai's Future?</span>
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-cream/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              From concept to completion, our team is ready to bring your vision to life. 
              Contact us today for a free consultation — we understand South Tamil Nadu's 
              unique needs and deliver with local trust.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/contact">
                <Button variant="hero" size="xl" className="group">
                  Get Free Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="tel:+919876543210">
                <Button variant="hero-outline" size="xl" className="group">
                  <Phone className="mr-2" size={20} />
                  Call Now
                </Button>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.4}>
            <a
              href={`https://wa.me/919876543210?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cream/60 hover:text-sand transition-colors"
            >
              <MessageCircle size={18} />
              <span>Or message us on WhatsApp</span>
            </a>
          </RevealOnScroll>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-10 border-t border-cream/10"
          >
            <p className="text-cream/40 text-sm uppercase tracking-wider mb-6">
              Trusted Across South Tamil Nadu
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {["Tirunelveli", "Thoothukudi", "Nagercoil", "Madurai"].map((city, index) => (
                <motion.span
                  key={city}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-cream/30 font-display text-lg font-semibold hover:text-sand/50 transition-colors cursor-default"
                >
                  {city}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
