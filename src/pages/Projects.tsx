import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const categories = ["All", "Residential", "Commercial", "Ongoing", "Completed"];

const projects = [
  {
    id: 1,
    title: "Skyline Tower",
    category: "Commercial",
    status: "Completed",
    location: "Manhattan, NY",
    image: projectCommercial,
    description: "A 52-story commercial tower featuring state-of-the-art office spaces and retail outlets.",
  },
  {
    id: 2,
    title: "The Residences at Park Avenue",
    category: "Residential",
    status: "Completed",
    location: "Upper East Side, NY",
    image: projectResidential,
    description: "Luxury residential complex with 120 premium apartments and world-class amenities.",
  },
  {
    id: 3,
    title: "Harbor View Complex",
    category: "Commercial",
    status: "Ongoing",
    location: "Brooklyn, NY",
    image: projectOngoing,
    description: "Mixed-use development featuring offices, retail, and waterfront dining.",
  },
  {
    id: 4,
    title: "Central Park Estates",
    category: "Residential",
    status: "Completed",
    location: "Central Park West, NY",
    image: projectResidential,
    description: "Exclusive residential development overlooking Central Park.",
  },
  {
    id: 5,
    title: "Tech Hub Center",
    category: "Commercial",
    status: "Ongoing",
    location: "Silicon Alley, NY",
    image: projectCommercial,
    description: "Modern tech campus designed for innovation and collaboration.",
  },
  {
    id: 6,
    title: "Riverside Condominiums",
    category: "Residential",
    status: "Completed",
    location: "Hudson River, NY",
    image: projectResidential,
    description: "Waterfront living with stunning river views and premium finishes.",
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Ongoing" || activeCategory === "Completed") {
      return project.status === activeCategory;
    }
    return project.category === activeCategory;
  });

  return (
    <>
      <Helmet>
        <title>Our Projects | Apex Construction Portfolio</title>
        <meta 
          name="description" 
          content="Explore Apex Construction's portfolio of residential, commercial, and infrastructure projects. View our completed and ongoing developments." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-slate-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Portfolio
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Featured Projects
              </h1>
              <p className="text-cream/70 text-lg">
                Discover our extensive portfolio of completed and ongoing projects 
                that showcase our commitment to excellence in construction.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-accent text-primary"
                      : "bg-secondary text-foreground hover:bg-accent/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                >
                  <Link to={`/projects/${project.id}`} className="group block">
                    <div className="relative h-[350px] rounded-lg overflow-hidden mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded">
                          {project.category}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded ${
                          project.status === "Completed" 
                            ? "bg-green-500 text-white" 
                            : "bg-blue-500 text-white"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="text-primary" size={20} />
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin size={14} />
                      <span className="text-sm">{project.location}</span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Projects;
