import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { MapPin, ArrowUpRight, ArrowRight, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { AnimatedCounter } from "@/components/premium/ProgressRing";
import { useProjects, useProjectStats, Project } from "@/hooks/useProjects";
import { useAuth } from "@/contexts/AuthContext";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";
import { useProjectCategories } from "@/hooks/useProjectCategories";
import { Button } from "@/components/ui/button";

// Fallback images removed
const fallbackImages = ["/placeholder.svg"];

const ProjectCategorySection = ({ category, projects, user }: { category: any, projects: Project[], user: any }) => {
  // Filter projects for this category (preserving existing logic)
  const categoryProjects = projects.filter(p => {
    // Check direct Project Category ID match
    if (p.projectCategory) {
      const pCatId = typeof p.projectCategory === 'string' ? p.projectCategory : (p.projectCategory as any)._id;
      if (pCatId === category.id || pCatId === category._id) return true;
    }

    // Fallback: Check if string 'category' matches title
    if (!p.projectCategory && p.category && p.category.toLowerCase() === category.title.toLowerCase()) {
      return true;
    }

    return false;
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categoryProjects]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  if (categoryProjects.length === 0) return null;

  const isScrollable = categoryProjects.length > 8; // Adjust threshold as needed

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-200 bg-white overflow-hidden mb-12"
    >
      {/* Header */}
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              {category.title}
            </h2>
            <p className="text-slate-500 max-w-3xl text-lg leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Scroll Buttons (Only if scrollable) */}
          {isScrollable && (
            <div className="flex items-center gap-2 hidden md:flex shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
                className="rounded-full border-slate-200 hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
                className="rounded-full border-slate-200 hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {isScrollable ? (
          // Horizontal Scroll Layout
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="flex gap-6 overflow-x-auto pb-6 -mb-6 scrollbar-hide snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categoryProjects.map((project, index) => (
              <div key={project.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                <ProjectCard project={project} index={index} user={user} />
              </div>
            ))}
          </div>
        ) : (
          // Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} user={user} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, user }: { project: Project, index: number, user: any }) => {
  return (
    <Link
      to={user ? `/projects/${project.id}` : "/auth"}
      state={!user ? { from: { pathname: `/projects/${project.id}` } } : undefined}
      className="group/card relative h-full block h-full outline-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-sm"
      >
        {/* Image Area */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            src={project.image_url || fallbackImages[0]}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-300" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm ${project.status === "completed"
              ? "bg-emerald-500 text-white"
              : "bg-blue-500 text-white"
              }`}>
              {project.status}
            </span>
          </div>

          {/* Floating Arrow */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300 border border-white/30">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin size={12} className="text-accent" />
            <span className="truncate">{project.location}</span>
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover/card:text-accent transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            {project.total_units ? (
              <span className="text-xs text-slate-400 font-medium">
                {project.total_units} Units
              </span>
            ) : (
              <span></span>
            )}
            <div className="flex items-center text-xs font-bold text-accent uppercase tracking-wider">
              View Details <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover/card:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Projects = () => {
  const { data: fetchedProjects = [], isLoading: projectsLoading } = useProjects("All");
  const { data: projectCategories, isLoading: categoriesLoading } = useProjectCategories();
  const { data: stats } = useProjectStats();
  const { user } = useAuth();

  const isLoading = projectsLoading || categoriesLoading;

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
                <span className="text-accent">Featured</span> Projects
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

        {/* Projects Sections */}
        <section className="py-10 bg-white min-h-[600px]">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <LuxuryLoader />
              </div>
            ) : (
              <div className="space-y-12">
                {/* Dynamic Sections Based on Project Categories */}
                {projectCategories?.map(category => (
                  <ProjectCategorySection
                    key={category._id || category.id}
                    category={category}
                    projects={fetchedProjects}
                    user={user}
                  />
                ))}

                {/* Fallback for projects without project category or legacy category match */}
                {fetchedProjects.some(p => {
                  const hasProjectCat = !!p.projectCategory;
                  const hasLegacyMatch = projectCategories?.some(cat => p.category && p.category.toLowerCase() === cat.title.toLowerCase());
                  return !hasProjectCat && !hasLegacyMatch;
                }) && (
                    <ProjectCategorySection
                      key="other"
                      category={{ id: "other", title: "All Projects", description: "Browse our complete portfolio." }}
                      projects={fetchedProjects.filter(p => {
                        const hasProjectCat = !!p.projectCategory;
                        const hasLegacyMatch = projectCategories?.some(cat => p.category && p.category.toLowerCase() === cat.title.toLowerCase());
                        return !hasProjectCat && !hasLegacyMatch;
                      })}
                      user={user}
                    />
                  )}

                {fetchedProjects.length === 0 && (
                  <div className="text-center py-20 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p>No projects found yet. Check back soon!</p>
                  </div>
                )}
              </div>
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




