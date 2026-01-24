import { Helmet } from "react-helmet-async";
import { Users, Hammer, Truck, Ruler, FileText, CheckCircle2, ShieldCheck, Briefcase, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GlassmorphismCard } from "@/components/premium/GlassmorphismCard";
import { AnimatedText, GradientText } from "@/components/premium/AnimatedText";
import { ProgressRing } from "@/components/premium/ProgressRing";
import { aboutStats, milestones, coreValues, visionMission, founderQuote, companyIntro, leadershipTeam, capabilities, coreServicesList, packages } from "@/data/about";
import heroImage from "@/assets/hero-construction.jpg";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | BRIXXSPACE - Engineering Excellence in Tirunelveli</title>
        <meta
          name="description"
          content="Discover BRIXXSPACE's technical prowess. 35+ years of infrastructure expertise, led by Er. Loknath S and Mr. A. Ulagu Lakshmanan."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />

          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <div className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
            <div className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 mb-6">
                <Ruler className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Engineering Excellence</span>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                <GradientText>Precision.</GradientText> Innovation.<br />
                <span className="text-foreground">Construction Redefined.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Brixx Space is a professional construction consultation and project advisory firm backed by 35+ years of industry expertise.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 bg-secondary/50 border-y border-border backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="mb-4 inline-flex p-3 rounded-2xl bg-background border border-border group-hover:border-accent/50 transition-colors shadow-sm">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* 1. Company Overview */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-7 space-y-8">
                <ScrollReveal>
                  <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                    Company Overview
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Building on <GradientText>Strong Foundations</GradientText>
                  </h2>
                  {companyIntro.paragraphs.map((p, i) => (
                    <p key={i} className={`text-muted-foreground leading-relaxed ${i === 0 ? 'text-lg font-medium text-foreground/80' : ''}`}>
                      {p}
                    </p>
                  ))}
                </ScrollReveal>
              </div>
              <div className="lg:col-span-5">
                <ScrollReveal direction="right">
                  <div className="aspect-square relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                    <img
                      src={heroImage}
                      alt="Company Overview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Technical Leadership (Moved UP) */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center mb-16">
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Technical Expertise
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Our Leadership
              </h2>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-12">
              {leadershipTeam.map((member, idx) => (
                <ScrollReveal key={member.name} direction={idx === 0 ? "right" : "left"} delay={0.1 * idx}>
                  <div className="bg-background rounded-3xl border border-border p-8 md:p-10 h-full hover:border-accent/40 transition-colors duration-300 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      {idx === 0 ? <Users size={120} /> : <Ruler size={120} />}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-6 items-start">
                      <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0 border border-border">
                        <span className="text-2xl font-bold text-accent">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground">{member.name}</h3>
                        <p className="text-accent font-medium mt-1 uppercase tracking-wide text-sm">{member.role}</p>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed border-t border-border pt-6 text-sm md:text-base">
                      {member.bio}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Capabilities / Machinery */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center mb-16">
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Resources
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Our Capabilities
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                We have the capacity to mobilise skilled manpower, advanced construction equipment, and resources for projects of any scale and complexity.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <GlassmorphismCard hover className="p-6 flex items-center gap-4 h-full">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-medium text-foreground">{item}</span>
                  </GlassmorphismCard>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="mt-12 text-center p-8 bg-secondary/30 rounded-2xl border border-border max-w-4xl mx-auto">
              <p className="text-foreground/80 italic">
                "Supported by a team of experienced engineers and technicians, we ensure high-quality project execution with strict adherence to safety and timelines."
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* 4. Core Services (Engineering Intelligence) */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center mb-16">
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Process
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Core Services
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                BRIXX SPACE provides comprehensive expertise across all critical construction phases.
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {coreServicesList.map((service, index) => (
                <div key={index} className="relative">
                  <div className="bg-background rounded-xl p-6 h-full border border-border hover:border-accent/50 transition-colors group shadow-sm">
                    <div className="text-4xl font-bold text-accent/10 absolute top-4 right-4 group-hover:text-accent/20 transition-colors">
                      0{index + 1}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-3 relative z-10">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* 5. Packages */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center mb-16">
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Engagement Models
              </span>
              <h2 className="font-display text-4xl font-bold text-foreground">
                Unique Packages
              </h2>
              <p className="text-muted-foreground mt-4">
                Tailored to your needs
              </p>
            </ScrollReveal>

            <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {packages.map((pkg, i) => (
                <div key={pkg.name}>
                  <GlassmorphismCard variant={pkg.name.includes("Smart") ? "strong" : "default"} className={`h-full flex flex-col ${pkg.name.includes("Smart") ? 'border-accent/50' : ''}`}>
                    <div className="mb-6">
                      <h3 className="font-display text-xl font-bold text-foreground">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 h-10">{pkg.description}</p>
                    </div>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {pkg.includes.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassmorphismCard>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* 6. Undergoing Projects (Teaser) */}
        <section className="py-24 bg-secondary relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <ScrollReveal>
                <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                  Our Work
                </span>
                <h2 className="font-display text-4xl font-bold text-foreground">
                  Recent Projects
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <a href="/projects" className="inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors">
                  View All Project <ArrowUpRight className="w-4 h-4" />
                </a>
              </ScrollReveal>
            </div>

            <StaggerReveal className="grid md:grid-cols-2 gap-8">
              {/* We'll showcase a generic 'Ongoing' style card if we don't want to hardcode specific IDs from data */}
              <div className="group relative rounded-2xl overflow-hidden aspect-video border border-border">
                <img src={heroImage} alt="Project 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 bg-accent text-black text-xs font-bold uppercase rounded-full mb-3 inline-block">Ongoing</span>
                  <h3 className="text-white text-2xl font-bold">Thamiraparani Extension</h3>
                  <p className="text-white/70 text-sm mt-1">Infrastructure</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden aspect-video border border-border">
                <img src={heroImage} alt="Project 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase rounded-full mb-3 inline-block">Commercial</span>
                  <h3 className="text-white text-2xl font-bold">Tech Park Nellai</h3>
                  <p className="text-white/70 text-sm mt-1">Commercial Complex</p>
                </div>
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* 7. Contact Section */}
        <section className="py-24 bg-slate-950 text-white relative">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                  Let's Build <span className="text-accent">Together</span>
                </h2>
                <p className="text-slate-400 text-lg mb-12 max-w-lg">
                  Ready to start your project with a team that values precision and integrity? Contact us today.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">Visit Us</p>
                      <p className="text-xl font-display">Krishnapuram, Tirunelveli, Tamilnadu - 627011</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">Call Us</p>
                      <p className="text-xl font-display">+91 9894948011</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">Email Us</p>
                      <p className="text-xl font-display">brixxspace@gmail.com</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="h-full min-h-[400px] bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <Briefcase className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Start Your Project</h3>
                  <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                    Have a vision in mind? We'd love to hear about it and help you bring it to life.
                  </p>
                  <Button className="w-full">Get a Free Consultation</Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

      </Layout>
    </>
  );
};


// Simple Quote Icon component
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
  </svg>
);

export default About;
