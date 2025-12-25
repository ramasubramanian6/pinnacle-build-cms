import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Target, Eye, Award, Users, Building, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

const milestones = [
  { year: "1985", title: "Company Founded", description: "Apex Construction was established with a vision to redefine construction excellence." },
  { year: "1995", title: "First Major Project", description: "Completed our first high-rise building, marking our entry into commercial construction." },
  { year: "2005", title: "National Expansion", description: "Expanded operations to 10 major cities across the country." },
  { year: "2015", title: "Green Building Certification", description: "Achieved LEED certification and committed to sustainable construction." },
  { year: "2020", title: "500th Project Milestone", description: "Celebrated the completion of our 500th successful project." },
  { year: "2024", title: "Industry Leadership", description: "Recognized as one of the top construction companies in the region." },
];

const stats = [
  { icon: Building, value: "500+", label: "Projects Completed" },
  { icon: Users, value: "150+", label: "Expert Professionals" },
  { icon: Award, value: "50+", label: "Industry Awards" },
  { icon: Calendar, value: "35+", label: "Years of Excellence" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Apex Construction - 35+ Years of Excellence</title>
        <meta 
          name="description" 
          content="Learn about Apex Construction's 35+ year journey of building excellence. Our vision, mission, values, and the team behind iconic construction projects." 
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
                About Apex
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Building Excellence Since 1985
              </h1>
              <p className="text-cream/70 text-lg">
                For over three decades, Apex Construction has been at the forefront of 
                transforming ambitious visions into architectural masterpieces.
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

        {/* Vision & Mission */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-secondary p-10 rounded-lg"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Our Vision
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in construction excellence, creating iconic 
                  structures that inspire communities and stand as testaments to human 
                  ingenuity. We envision a world where every building we create 
                  contributes to a sustainable and beautiful built environment.
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
                  To deliver exceptional construction services that exceed client 
                  expectations through innovation, integrity, and unwavering commitment 
                  to quality. We strive to build lasting relationships with our clients, 
                  partners, and communities while fostering a culture of safety and excellence.
                </p>
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
