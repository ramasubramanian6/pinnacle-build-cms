import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { ImageHoverZoom } from "@/components/animations/HoverEffects";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const projects = [
  {
    id: 1,
    title: "Nellai Heights",
    category: "Residential",
    location: "Palayamkottai, Tirunelveli",
    image: projectCommercial,
    featured: true,
  },
  {
    id: 2,
    title: "BRIXX Commercial Plaza",
    category: "Commercial",
    location: "Junction Road, Tirunelveli",
    image: projectResidential,
    featured: false,
  },
  {
    id: 3,
    title: "Thamiraparani Bridge",
    category: "Infrastructure",
    location: "Tirunelveli",
    image: projectOngoing,
    featured: false,
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              hsl(210 35% 18%) 50px,
              hsl(210 35% 18%) 51px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              hsl(210 35% 18%) 50px,
              hsl(210 35% 18%) 51px
            )`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <RevealOnScroll direction="up">
            <span className="text-sand font-medium uppercase tracking-wider text-sm mb-4 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured Projects
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl">
              Landmark constructions across South Tamil Nadu, from premium residences 
              to commercial complexes and vital infrastructure.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll direction="up" delay={0.2}>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-sand transition-colors mt-6 md:mt-0"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </RevealOnScroll>
        </div>

        {/* Projects Grid */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" staggerDelay={0.15}>
          {/* Featured Large Project */}
          <StaggerItem className="lg:row-span-2">
            <Link to={`/projects/${projects[0].id}`} className="group block h-full">
              <motion.div 
                className="relative h-full min-h-[500px] lg:min-h-full rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <ImageHoverZoom
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <motion.span 
                    className="inline-block px-4 py-1.5 bg-sand text-deep-blue text-xs font-semibold uppercase tracking-wider rounded-full mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    {projects[0].category}
                  </motion.span>
                  <h3 className="font-display text-3xl font-bold text-cream mb-3 group-hover:text-sand transition-colors duration-300">
                    {projects[0].title}
                  </h3>
                  <div className="flex items-center gap-2 text-cream/70">
                    <MapPin size={16} />
                    <span className="text-sm">{projects[0].location}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </StaggerItem>

          {/* Smaller Projects */}
          {projects.slice(1).map((project) => (
            <StaggerItem key={project.id}>
              <Link to={`/projects/${project.id}`} className="group block">
                <motion.div 
                  className="relative h-[280px] rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <ImageHoverZoom
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.span 
                      className="inline-block px-3 py-1 bg-sand text-deep-blue text-xs font-semibold uppercase tracking-wider rounded-full mb-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      {project.category}
                    </motion.span>
                    <h3 className="font-display text-2xl font-bold text-cream mb-2 group-hover:text-sand transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-cream/70">
                      <MapPin size={14} />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
