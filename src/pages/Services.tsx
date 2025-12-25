import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { 
  Building2, 
  ClipboardCheck, 
  Compass, 
  Settings, 
  Shield, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "construction",
    icon: Building2,
    title: "Construction Management",
    description: "End-to-end construction management services ensuring projects are delivered on time, within budget, and to the highest quality standards.",
    features: [
      "Project planning and scheduling",
      "Resource allocation and management",
      "Cost control and budget management",
      "Quality assurance protocols",
      "Site supervision and coordination",
      "Progress monitoring and reporting"
    ]
  },
  {
    id: "consultancy",
    icon: ClipboardCheck,
    title: "Project Consultancy",
    description: "Expert advisory services to guide your project from conception to completion with strategic insights and industry expertise.",
    features: [
      "Feasibility studies and analysis",
      "Project scope definition",
      "Risk assessment and mitigation",
      "Regulatory compliance guidance",
      "Vendor selection support",
      "Contract management advisory"
    ]
  },
  {
    id: "engineering",
    icon: Compass,
    title: "Structural Engineering",
    description: "Comprehensive structural engineering solutions ensuring safety, durability, and optimal design for all types of buildings.",
    features: [
      "Structural design and analysis",
      "Foundation engineering",
      "Seismic and wind load analysis",
      "Steel and concrete structures",
      "Renovation structural assessment",
      "Building code compliance"
    ]
  },
  {
    id: "planning",
    icon: Settings,
    title: "Planning & Execution",
    description: "Strategic project planning and flawless execution to transform your architectural vision into reality.",
    features: [
      "Master planning and design",
      "Timeline development",
      "Permit and approval management",
      "Material procurement",
      "Subcontractor coordination",
      "Milestone tracking"
    ]
  },
  {
    id: "safety",
    icon: Shield,
    title: "Quality & Safety Assurance",
    description: "Rigorous quality control and safety protocols to ensure every project meets the highest standards.",
    features: [
      "ISO-certified quality processes",
      "Safety training programs",
      "Regular safety audits",
      "Material quality testing",
      "Compliance documentation",
      "Incident prevention protocols"
    ]
  }
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | BRIXXSPACE - Construction & Infrastructure Solutions</title>
        <meta 
          name="description" 
          content="BRIXXSPACE offers comprehensive construction services including construction management, project consultancy, structural engineering, and quality assurance in Tirunelveli." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-slate-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Services
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Comprehensive Construction Solutions
              </h1>
              <p className="text-cream/70 text-lg">
                From concept to completion, we offer a full spectrum of construction and 
                infrastructure services tailored to meet your unique project requirements.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-4 mb-16">
              {services.map((service, index) => (
                <motion.a
                  key={service.id}
                  href={`#${service.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group bg-card p-6 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                    <service.icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {service.title}
                  </h3>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`py-16 ${index !== services.length - 1 ? 'border-b border-border' : ''}`}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                      <service.icon className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    <Link to="/contact">
                      <Button variant="gold" size="lg">
                        Get Started
                        <ArrowRight className="ml-2" size={18} />
                      </Button>
                    </Link>
                  </div>
                  <div className={`bg-secondary p-8 rounded-xl ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-dark">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-cream/70 text-lg mb-8">
                Contact our team of experts for a free consultation and let us help 
                you bring your construction vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="hero" size="xl">
                    Get Free Consultation
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="hero-outline" size="xl">
                    View Our Projects
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
