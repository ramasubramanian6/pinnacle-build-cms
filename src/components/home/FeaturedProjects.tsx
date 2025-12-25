import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const projects = [
  {
    id: 1,
    title: "Skyline Tower",
    category: "Commercial",
    location: "Manhattan, NY",
    image: projectCommercial,
    featured: true,
  },
  {
    id: 2,
    title: "The Residences at Park Avenue",
    category: "Residential",
    location: "Upper East Side, NY",
    image: projectResidential,
    featured: false,
  },
  {
    id: 3,
    title: "Harbor View Complex",
    category: "Ongoing",
    location: "Brooklyn, NY",
    image: projectOngoing,
    featured: false,
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
              Our Portfolio
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Featured Projects
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-foreground font-medium hover:text-accent transition-colors mt-4 md:mt-0"
            >
              View All Projects
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
            transition={{ duration: 0.6 }}
            className="lg:row-span-2"
          >
            <Link to={`/projects/${projects[0].id}`} className="group block h-full">
              <div className="relative h-full min-h-[500px] lg:min-h-full rounded-lg overflow-hidden">
                <img
                  src={projects[0].image}
                  alt={projects[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded mb-4">
                    {projects[0].category}
                  </span>
                  <h3 className="font-display text-3xl font-bold text-cream mb-3 group-hover:text-accent transition-colors">
                    {projects[0].title}
                  </h3>
                  <div className="flex items-center gap-2 text-cream/60">
                    <MapPin size={16} />
                    <span className="text-sm">{projects[0].location}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smaller Projects */}
          {projects.slice(1).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Link to={`/projects/${project.id}`} className="group block">
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-dark via-slate-dark/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded mb-3">
                      {project.category}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-cream mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-cream/60">
                      <MapPin size={14} />
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
