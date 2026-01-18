import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  Building2,
  Calculator,
  ClipboardCheck,
  FileText,
  Shield,
  Users,
  CheckCircle2,
  ArrowRight,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import * as LucideIcons from "lucide-react";

// Static services removed

const phases = [
  {
    number: "01",
    title: "Pre-Construction",
    description: "Planning, design, and feasibility studies"
  },
  {
    number: "02",
    title: "Construction",
    description: "Execution, supervision, and quality control"
  },
  {
    number: "03",
    title: "Post-Construction",
    description: "Handover, documentation, and support"
  }
];

const Services = () => {
  const { data: fetchedServices, isLoading } = useServices();

  // Use fetched services if available, otherwise fall back to static data
  // Map fetched services to match the display structure (converting icon string to component)
  // Use fetched services only
  const displayServices = fetchedServices && fetchedServices.length > 0
    ? fetchedServices.map(s => {
      // Dynamically get icon component from Lucide
      // @ts-ignore
      const IconComponent = LucideIcons[s.icon] || Building2;
      return {
        icon: IconComponent,
        title: s.title,
        description: s.description || "",
        features: s.features || []
      };
    })
    : [];

  return (
    <>
      <Helmet>
        <title>Professional Services | Brixx Space Construction Consultation</title>
        <meta
          name="description"
          content="Expert construction consultation services backed by 35+ years of experience. Design coordination, budget management, quality assurance, and more."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop"
              alt="Construction services"
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] text-sm font-semibold mb-6">
                Professional Services
              </span>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Expert Construction Consultation Services
              </h1>

              <p className="text-xl text-slate-300 leading-relaxed mb-8">
                Comprehensive project advisory backed by 35+ years of industry expertise. From concept to completion, we ensure excellence at every stage.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button className="h-12 px-8 bg-[#FFB800] hover:bg-[#FFA500] text-slate-900 font-semibold">
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a href="tel:+919894948011">
                  <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                    <Phone className="mr-2 w-4 h-4" />
                    Call Us
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Our Core Services
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                End-to-end construction consultation services tailored to your project needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {displayServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#FFB800]/50 hover:shadow-xl transition-all duration-300">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center mb-6 group-hover:bg-[#FFB800]/10 transition-colors">
                      <service.icon className="w-7 h-7 text-slate-700 group-hover:text-[#FFB800] transition-colors" />
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-[#FFB800] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Phases */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Key Project Phases
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive support throughout your construction journey
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {phases.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-[#FFB800]/50 hover:shadow-lg transition-all duration-300">
                    {/* Number */}
                    <div className="text-6xl font-bold text-[#FFB800]/20 mb-4">
                      {phase.number}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                      {phase.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>

                  {/* Connector Line */}
                  {index < phases.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                    Why Choose Brixx Space?
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    With over three decades of experience in the construction industry, we bring unparalleled expertise and dedication to every project.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "35+ years of industry experience",
                      "500+ successful projects delivered",
                      "Expert team of qualified professionals",
                      "Commitment to quality and timely delivery",
                      "Comprehensive end-to-end solutions"
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#FFB800] flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <img
                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop"
                    alt="Construction expertise"
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Let's discuss how our expert consultation services can bring your vision to life
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button className="h-12 px-8 bg-[#FFB800] hover:bg-[#FFA500] text-slate-900 font-semibold">
                    Contact Us Today
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                    View Our Projects
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
