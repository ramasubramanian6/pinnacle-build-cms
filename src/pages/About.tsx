import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GlassmorphismCard } from "@/components/premium/GlassmorphismCard";
import { AnimatedText, GradientText } from "@/components/premium/AnimatedText";
import { ProgressRing } from "@/components/premium/ProgressRing";
import { aboutStats, milestones, coreValues, visionMission, founderQuote, companyIntro } from "@/data/about";
import heroImage from "@/assets/hero-construction.jpg";
import brixxspaceLogo from "@/assets/brixxspace-logo.png";

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
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img src={heroImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                About BRIXXSPACE
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <GradientText>Nellai's Future,</GradientText> Built by Us
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                For over 15 years, BRIXXSPACE has been at the forefront of transforming
                the construction landscape of Tirunelveli and South Tamil Nadu.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats Section with Progress Rings */}
        <section className="py-16 bg-secondary border-b border-border">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {aboutStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <ProgressRing
                    progress={85}
                    size={100}
                    strokeWidth={6}
                    showPercentage={false}
                    label=""
                    className="mx-auto mb-4"
                  />
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal direction="left">
                <img
                  src={brixxspaceLogo}
                  alt="BRIXXSPACE"
                  className="h-20 w-auto mb-8"
                />
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  <AnimatedText>{companyIntro.title}</AnimatedText>
                </h2>
                {companyIntro.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <div className="relative h-[500px] rounded-2xl overflow-hidden">
                  <img
                    src={heroImage}
                    alt="BRIXXSPACE Construction Site"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <ScrollReveal direction="left">
                <GlassmorphismCard variant="subtle" className="p-10 h-full">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                    <visionMission.vision.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {visionMission.vision.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {visionMission.vision.description}
                  </p>
                </GlassmorphismCard>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.2}>
                <GlassmorphismCard variant="strong" glow className="p-10 h-full bg-primary">
                  <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                    <visionMission.mission.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-cream mb-4">
                    {visionMission.mission.title}
                  </h2>
                  <p className="text-cream/80 leading-relaxed">
                    {visionMission.mission.description}
                  </p>
                </GlassmorphismCard>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center mb-16">
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                What We Stand For
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Our Core Values
              </h2>
            </ScrollReveal>

            <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value) => (
                <GlassmorphismCard
                  key={value.title}
                  hover
                  className="p-8 text-center"
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
                </GlassmorphismCard>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal>
                <span className="text-[#FFB800] font-medium uppercase tracking-wider text-sm mb-4 block">
                  Leadership Message
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
                  A Word From Our Founder
                </h2>
                <blockquote className="text-slate-300 text-lg md:text-xl leading-relaxed italic mb-8">
                  "{founderQuote.quote}"
                </blockquote>
                <p className="text-[#FFB800] font-semibold">— {founderQuote.author}</p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24 bg-secondary">
          <div className="container mx-auto px-6">
            <ScrollReveal className="text-center mb-16">
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Journey
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Milestones
              </h2>
            </ScrollReveal>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block" />

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <ScrollReveal
                    key={milestone.year}
                    direction={index % 2 === 0 ? "left" : "right"}
                    delay={index * 0.1}
                  >
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-1 md:pr-8">
                        {index % 2 === 0 ? (
                          <div className="md:text-right">
                            <GlassmorphismCard hover className="p-6">
                              <span className="text-accent font-display text-2xl font-bold">
                                {milestone.year}
                              </span>
                              <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {milestone.description}
                              </p>
                            </GlassmorphismCard>
                          </div>
                        ) : (
                          <div className="hidden md:block" />
                        )}
                      </div>
                      <div className="hidden md:flex items-center justify-center flex-shrink-0">
                        <div className="w-4 h-4 bg-accent rounded-full ring-4 ring-accent/20" />
                      </div>
                      <div className="flex-1 md:pl-8">
                        {index % 2 !== 0 ? (
                          <div className="md:text-left">
                            <GlassmorphismCard hover className="p-6">
                              <span className="text-accent font-display text-2xl font-bold">
                                {milestone.year}
                              </span>
                              <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-2">
                                {milestone.title}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {milestone.description}
                              </p>
                            </GlassmorphismCard>
                          </div>
                        ) : (
                          <div className="hidden md:block" />
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
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
