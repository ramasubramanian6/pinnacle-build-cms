import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Loader2 } from "lucide-react";
import { useFeaturedProjects } from "@/hooks/useProjects";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const fallbackImages = [projectCommercial, projectResidential, projectOngoing];

export const FeaturedProjects = () => {
  const { data: projects = [], isLoading } = useFeaturedProjects();

  const getProjectImage = (index: number, imageUrl: string | null) => {
    return imageUrl || fallbackImages[index % fallbackImages.length];
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </section>
    );
  }

  // Fallback data for preview/development if no projects exist
  const displayProjects = projects.length > 0 ? projects : [
    {
      id: "preview-1",
      title: "Luxury Villa Estate",
      category: "Residential",
      location: "Beverly Hills, CA",
      image_url: null,
    },
    {
      id: "preview-2",
      title: "Tech Park One",
      category: "Commercial",
      location: "San Francisco, CA",
      image_url: null,
    },
    {
      id: "preview-3",
      title: "Skyline Heights",
      category: "Residential",
      location: "New York, NY",
      image_url: null,
    }
  ];

  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.05),transparent_50%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              Featured Projects
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl text-lg leading-relaxed">
              Landmark constructions from premium residences
              to commercial complexes and vital infrastructure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-white font-medium hover:text-accent transition-colors mt-8 md:mt-0 border-b border-white/20 hover:border-accent pb-1"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Large Project */}
          {displayProjects[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:row-span-2 group"
            >
              <Link to={`/projects/${displayProjects[0].id}`} className="block h-full relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <div className="relative h-full min-h-[500px] lg:min-h-full">
                  <img
                    src={getProjectImage(0, displayProjects[0].image_url)}
                    alt={displayProjects[0].title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-4 py-1.5 bg-accent text-slate-950 text-xs font-bold uppercase tracking-wider rounded mb-4">
                      {displayProjects[0].category}
                    </span>
                    <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                      {displayProjects[0].title}
                    </h3>
                    <div className="flex items-center gap-3 text-slate-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <MapPin size={18} className="text-accent" />
                      <span className="text-base">{displayProjects[0].location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Smaller Projects */}
          {displayProjects.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="group"
            >
              <Link to={`/projects/${project.id}`} className="block relative overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <div className="relative h-[300px]">
                  <img
                    src={getProjectImage(index + 1, project.image_url)}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-accent text-slate-950 text-xs font-bold uppercase tracking-wider rounded mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <MapPin size={16} className="text-accent" />
                      <span className="text-sm">{project.location}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
