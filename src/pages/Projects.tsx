import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { MapPin, ArrowUpRight, Calendar, Loader2, Lock, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GlassmorphismCard } from "@/components/premium/GlassmorphismCard";
import { GradientText } from "@/components/premium/AnimatedText";
import { AnimatedCounter } from "@/components/premium/ProgressRing";
import { useProjects, useProjectStats } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
// Fallback images removed
const fallbackImages = ["/placeholder.svg"];

const projectCategories = ["All", "Residential", "Commercial", "Infrastructure", "Ongoing", "Completed"];



const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const { data: fetchedProjects = [], isLoading } = useProjects("All"); // Always fetch "All" initially to handle client-side filtering better with fallback
  const { data: stats } = useProjectStats();
  const { user } = useAuth();

  // Use fetched projects only
  const allProjects = fetchedProjects;

  // Filter projects based on category locally if we are using static data or if we fetched all
  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter(p => {
      if (activeCategory === "Ongoing" || activeCategory === "Completed") {
        return p.status === activeCategory.toLowerCase();
      }
      return p.category === activeCategory;
    });



  const getProjectYear = (project: { start_date: string | null; estimated_completion: string | null }) => {
    if (project.estimated_completion) {
      return new Date(project.estimated_completion).getFullYear();
    }
    if (project.start_date) {
      return new Date(project.start_date).getFullYear();
    }
    return new Date().getFullYear();
  };

  const getProjectImage = (project: { image_url: string | null }, index: number) => {
    return project.image_url || fallbackImages[index % fallbackImages.length];
  };

  return (
    <>
      <Helmet>
        <title>Our Projects | BRIXXSPACE - Construction Portfolio in Tirunelveli</title>
        <meta
          name="description"
          content="Explore BRIXXSPACE's portfolio of residential, commercial, and infrastructure projects in Tirunelveli. View our completed and ongoing developments."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Portfolio
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <GradientText>Featured</GradientText> Projects
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Discover our extensive portfolio of completed and ongoing projects
                that showcase our commitment to excellence in construction across South Tamil Nadu.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-secondary border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-4">
              {projectCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === category
                    ? "bg-accent text-primary shadow-gold"
                    : "bg-card text-foreground border border-border hover:border-accent/50"
                    }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            {isLoading && fetchedProjects.length === 0 ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No projects found in this category.</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                  >
                    <Link to={`/projects/${project.id}`} className="group block">
                      <GlassmorphismCard hover className="overflow-hidden">
                        <div className="relative h-[280px] overflow-hidden">
                          <img
                            src={getProjectImage(project, index)}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
                              {project.category}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${project.status === "completed"
                              ? "bg-green-500/90 text-white"
                              : "bg-blue-500/90 text-white"
                              }`}>
                              {project.status}
                            </span>
                          </div>
                          <div className="absolute bottom-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <ArrowUpRight className="text-primary" size={20} />
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-4 text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin size={14} className="text-accent" />
                              <span className="text-sm">{project.location}</span>
                            </div>
                            {project.total_units && (
                              <div className="flex items-center gap-1">
                                <Maximize2 size={14} className="text-accent" />
                                <span className="text-sm">{project.total_units} Units</span>
                              </div>
                            )}
                          </div>

                          {user ? (
                            <>
                              <div className="flex items-center gap-1 text-muted-foreground mb-3">
                                <Calendar size={14} className="text-accent" />
                                <span className="text-sm">{getProjectYear(project)}</span>
                              </div>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {project.description}
                              </p>
                            </>
                          ) : (
                            <div className="pt-3 border-t border-border">
                              <div className="flex items-center gap-2 text-muted-foreground mb-3">
                                <Lock size={14} />
                                <span className="text-sm">Login to view full details</span>
                              </div>
                              <Link to="/auth" onClick={(e) => e.stopPropagation()}>
                                <Button variant="gold" size="sm" className="w-full">
                                  Login to View
                                </Button>
                              </Link>
                            </div>
                          )}
                        </div>
                      </GlassmorphismCard>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Total Projects", value: stats?.total || 0, suffix: "+" },
                { label: "Completed", value: stats?.completed || 0, suffix: "" },
                { label: "Ongoing", value: stats?.ongoing || 0, suffix: "" },
                { label: "Happy Clients", value: 200, suffix: "+" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#FFB800] to-[#FFA500] bg-clip-text text-transparent mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Projects;
