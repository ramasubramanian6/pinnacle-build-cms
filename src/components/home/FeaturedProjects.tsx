import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

// Hardcoded static projects for display
const staticProjects = [
  {
    id: "1",
    title: "Luxury Villa Estate",
    category: "Residential",
    image_url: projectResidential,
  },
  {
    id: "2",
    title: "Tech Park One",
    category: "Commercial",
    image_url: projectCommercial,
  },
  {
    id: "3",
    title: "Industrial Storage",
    category: "Industrial",
    image_url: projectOngoing,
  }
];

export const FeaturedProjects = () => {
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:row-span-2 group"
          >
            <Link to="/projects" className="block h-full relative overflow-hidden rounded-xl border border-white/10 shadow-2xl">
              <div className="relative h-full min-h-[500px] lg:min-h-full">
                <img
                  src={staticProjects[0].image_url}
                  alt={staticProjects[0].title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 transform transition-transform duration-500">
                  <span className="inline-block px-4 py-1.5 bg-accent text-slate-950 text-xs font-bold uppercase tracking-wider rounded mb-4">
                    {staticProjects[0].category}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
                    {staticProjects[0].title}
                  </h3>

                  <div className="flex items-center text-accent font-semibold group-hover:text-white transition-colors">
                    View Details <ArrowUpRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Projects */}
          {staticProjects.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="group"
            >
              <Link to="/projects" className="block relative overflow-hidden rounded-xl border border-white/10 shadow-lg">
                <div className="relative h-[300px]">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-8 transition-transform duration-500">
                    <span className="inline-block px-3 py-1 bg-accent text-slate-950 text-xs font-bold uppercase tracking-wider rounded mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      {project.title}
                    </h3>

                    <div className="flex items-center text-accent font-semibold text-sm group-hover:text-white transition-colors">
                      View Details <ArrowUpRight className="ml-2 w-4 h-4" />
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
