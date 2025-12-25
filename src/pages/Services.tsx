import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GlassmorphismCard, GradientBorderCard } from "@/components/premium/GlassmorphismCard";
import { AnimatedText, GradientText } from "@/components/premium/AnimatedText";
import { RippleButton } from "@/components/premium/MagneticButton";
import { services, servicesCTA } from "@/data/services";

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
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Services
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <GradientText>Comprehensive</GradientText> Construction Solutions
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                From concept to completion, we offer a full spectrum of construction and 
                infrastructure services tailored to meet your unique project requirements.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Services Quick Links */}
        <section className="py-12 bg-secondary border-b border-border">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid md:grid-cols-5 gap-4">
              {services.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="group"
                >
                  <GlassmorphismCard hover className="p-6 text-center h-full">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-accent transition-colors duration-300">
                      <service.icon className="w-6 h-6 text-accent group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {service.title}
                    </h3>
                  </GlassmorphismCard>
                </a>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Detailed Services */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            {services.map((service, index) => (
              <ScrollReveal
                key={service.id}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  id={service.id}
                  className={`py-16 ${index !== services.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className={`grid lg:grid-cols-2 gap-12 items-center`}>
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                        <service.icon className="w-8 h-8 text-accent" />
                      </div>
                      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                        <AnimatedText>{service.title}</AnimatedText>
                      </h2>
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      <Link to="/contact">
                        <RippleButton className="bg-accent text-primary-foreground px-8 py-3 rounded-lg font-semibold">
                          Get Started
                          <ArrowRight className="ml-2 inline" size={18} />
                        </RippleButton>
                      </Link>
                    </div>
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <GradientBorderCard className="p-8">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                          What's Included
                        </h3>
                        <ul className="space-y-4">
                          {service.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                              <span className="text-foreground">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </GradientBorderCard>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
          <div className="container mx-auto px-6 text-center relative z-10">
            <ScrollReveal>
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                  {servicesCTA.title}
                </h2>
                <p className="text-cream/70 text-lg mb-8">
                  {servicesCTA.description}
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
              </div>
            </ScrollReveal>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Services;
