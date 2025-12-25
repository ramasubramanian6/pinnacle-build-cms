import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Award, Users, Building, Calendar, Heart, Shield } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";

const milestones = [
  { year: "2010", title: "Company Founded", description: "BRIXXSPACE was established in Tirunelveli with a vision to transform the construction landscape of South Tamil Nadu." },
  { year: "2013", title: "First Major Project", description: "Completed our first large-scale residential complex, establishing our reputation for quality." },
  { year: "2016", title: "Commercial Expansion", description: "Expanded into commercial construction with landmark office and retail projects." },
  { year: "2019", title: "Infrastructure Division", description: "Launched dedicated infrastructure division for roads, bridges, and public works." },
  { year: "2022", title: "200th Project Milestone", description: "Celebrated the completion of our 200th successful project across Tamil Nadu." },
  { year: "2024", title: "Regional Leadership", description: "Recognized as the leading construction company in the Tirunelveli-Nellai region." },
];

const stats = [
  { icon: Building, value: "200+", label: "Projects Completed" },
  { icon: Users, value: "50+", label: "Expert Professionals" },
  { icon: Award, value: "25+", label: "Industry Awards" },
  { icon: Calendar, value: "15+", label: "Years of Excellence" },
];

const coreValues = [
  { icon: Shield, title: "Integrity", description: "We uphold the highest ethical standards in every project and interaction." },
  { icon: Award, title: "Excellence", description: "We strive for excellence in design, execution, and client service." },
  { icon: Heart, title: "Commitment", description: "We are committed to delivering projects on time and within budget." },
  { icon: Users, title: "Collaboration", description: "We believe in collaborative partnerships with clients and stakeholders." },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | BRIXXSPACE - Leading Construction Company in Tirunelveli</title>
        <meta 
          name="description" 
          content="Learn about BRIXXSPACE's 15+ year journey of building excellence in Tirunelveli. Our vision, mission, values, and the team behind iconic construction projects in Tamil Nadu." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-slate-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-slate-dark/90" />
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                About BRIXXSPACE
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Nellai's Future, Built by Us
              </h1>
              <p className="text-cream/70 text-lg">
                For over 15 years, BRIXXSPACE has been at the forefront of transforming 
                the construction landscape of Tirunelveli and South Tamil Nadu.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-accent" />
                  </div>
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img 
                  src={brixxspaceLogo} 
                  alt="BRIXXSPACE" 
                  className="h-24 w-auto mb-8"
                />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Building Excellence in South Tamil Nadu
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  BRIXXSPACE is a premier construction and infrastructure company headquartered 
                  in Tirunelveli, Tamil Nadu. Since our inception, we have been committed to 
                  delivering high-quality construction solutions that exceed client expectations.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our portfolio spans residential complexes, commercial buildings, industrial 
                  facilities, and infrastructure projects. We combine traditional craftsmanship 
                  with modern construction technology to create structures that stand the test of time.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With a team of 50+ experienced professionals including architects, engineers, 
                  and skilled craftsmen, we have successfully completed over 200 projects across 
                  South Tamil Nadu, earning the trust of hundreds of satisfied clients.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-[500px] rounded-lg overflow-hidden"
              >
                <img 
                  src={heroImage} 
                  alt="BRIXXSPACE Construction Site" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/60 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card p-10 rounded-lg border border-border"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted and preferred construction partner in South India, 
                  known for creating iconic structures that enhance communities and stand as 
                  symbols of quality, innovation, and sustainability. We envision transforming 
                  Tirunelveli into a modern hub while preserving its cultural heritage.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-slate-dark p-10 rounded-lg"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-3xl font-bold text-cream mb-4">
                  Our Mission
                </h2>
                <p className="text-cream/70 leading-relaxed">
                  To deliver exceptional construction services that exceed client expectations 
                  through innovation, integrity, and unwavering commitment to quality. We strive 
                  to build lasting relationships with our clients, partners, and communities 
                  while fostering a culture of safety, sustainability, and excellence in everything we do.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                What We Stand For
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Our Core Values
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-lg border border-border text-center"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Message */}
        <section className="py-24 bg-slate-dark">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                  Leadership Message
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-8">
                  A Word From Our Founder
                </h2>
                <blockquote className="text-cream/80 text-lg md:text-xl leading-relaxed italic mb-8">
                  "At BRIXXSPACE, we don't just build structures—we build trust, relationships, 
                  and the future of our community. Every project we undertake is a testament to 
                  our commitment to quality and our belief that great construction can transform lives. 
                  Nellai's future is being built today, and we are proud to be leading that transformation."
                </blockquote>
                <p className="text-accent font-semibold">— Founder & Managing Director, BRIXXSPACE</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Journey
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Milestones
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="flex-1 md:text-right">
                      {index % 2 === 0 && (
                        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                          <span className="text-accent font-display text-2xl font-bold">
                            {milestone.year}
                          </span>
                          <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                      <div className="w-4 h-4 bg-accent rounded-full" />
                    </div>
                    <div className="flex-1">
                      {index % 2 !== 0 && (
                        <div className="bg-card p-6 rounded-lg shadow-sm border border-border">
                          <span className="text-accent font-display text-2xl font-bold">
                            {milestone.year}
                          </span>
                          <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-2">
                            {milestone.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {milestone.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
