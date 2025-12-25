import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { MapPin, ArrowUpRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const categories = ["All", "Residential", "Commercial", "Infrastructure", "Ongoing", "Completed"];

const projects = [
  {
    id: 1,
    title: "Nellai Heights",
    category: "Residential",
    status: "Completed",
    location: "Palayamkottai, Tirunelveli",
    year: "2023",
    image: projectResidential,
    description: "Premium 3-tower residential complex with 120 luxury apartments and modern amenities.",
  },
  {
    id: 2,
    title: "BRIXX Commercial Plaza",
    category: "Commercial",
    status: "Completed",
    location: "Junction Road, Tirunelveli",
    year: "2022",
    image: projectCommercial,
    description: "State-of-the-art commercial complex with office spaces, retail outlets, and basement parking.",
  },
  {
    id: 3,
    title: "Thamiraparani Bridge Extension",
    category: "Infrastructure",
    status: "Ongoing",
    location: "Tirunelveli",
    year: "2024",
    image: projectOngoing,
    description: "Major infrastructure project extending the bridge connectivity across Thamiraparani river.",
  },
  {
    id: 4,
    title: "Green Valley Villas",
    category: "Residential",
    status: "Completed",
    location: "Vannarpettai, Tirunelveli",
    year: "2021",
    image: projectResidential,
    description: "Exclusive gated community with 45 premium villas featuring contemporary architecture.",
  },
  {
    id: 5,
    title: "Tech Park Nellai",
    category: "Commercial",
    status: "Ongoing",
    location: "Bypass Road, Tirunelveli",
    year: "2024",
    image: projectCommercial,
    description: "Modern IT park with 5 lakh sq.ft. of Grade-A office space designed for tech companies.",
  },
  {
    id: 6,
    title: "Nellai Smart Road Project",
    category: "Infrastructure",
    status: "Completed",
    location: "Tirunelveli Municipal Corporation",
    year: "2023",
    image: projectOngoing,
    description: "Smart road infrastructure with LED lighting, drainage, and pedestrian pathways.",
  },
  {
    id: 7,
    title: "Royal Apartments",
    category: "Residential",
    status: "Completed",
    location: "NGO Colony, Tirunelveli",
    year: "2020",
    image: projectResidential,
    description: "Affordable housing project with 200 units designed for middle-class families.",
  },
  {
    id: 8,
    title: "Nellai Convention Center",
    category: "Commercial",
    status: "Completed",
    location: "Tirunelveli Town",
    year: "2022",
    image: projectCommercial,
    description: "Multi-purpose convention center with seating for 2000+ guests and modern AV facilities.",
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
        <title>Our Projects | BRIXXSPACE - Construction Portfolio in Tirunelveli</title>
        <meta 
          name="description" 
          content="Explore BRIXXSPACE's portfolio of residential, commercial, and infrastructure projects in Tirunelveli. View our completed and ongoing developments." 
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
                that showcase our commitment to excellence in construction across South Tamil Nadu.
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
                    <div className="relative h-[300px] rounded-lg overflow-hidden mb-4">
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
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span className="text-sm">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span className="text-sm">{project.year}</span>
                      </div>
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

        {/* Stats Section */}
        <section className="py-16 bg-slate-dark">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "200+", label: "Projects Completed" },
                { value: "50L+", label: "Sq.Ft. Constructed" },
                { value: "15+", label: "Cities Covered" },
                { value: "₹500Cr+", label: "Project Value" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-cream/60 text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
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
