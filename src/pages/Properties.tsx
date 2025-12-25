import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { MapPin, Maximize2, DollarSign, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

const statuses = ["All", "Available", "Sold", "Upcoming"];

const properties = [
  {
    id: 1,
    name: "Penthouse Suite A",
    location: "Skyline Tower, Manhattan",
    price: "$2,850,000",
    area: "3,200 sq ft",
    bedrooms: 4,
    bathrooms: 3,
    status: "Available",
    image: projectResidential,
  },
  {
    id: 2,
    name: "Executive Office Floor",
    location: "Tech Hub Center, NY",
    price: "$5,500,000",
    area: "8,500 sq ft",
    status: "Available",
    image: projectCommercial,
  },
  {
    id: 3,
    name: "Garden Duplex Unit",
    location: "Central Park Estates",
    price: "$1,950,000",
    area: "2,100 sq ft",
    bedrooms: 3,
    bathrooms: 2,
    status: "Sold",
    image: projectResidential,
  },
  {
    id: 4,
    name: "Waterfront Villa",
    location: "Riverside Condominiums",
    price: "$3,200,000",
    area: "4,500 sq ft",
    bedrooms: 5,
    bathrooms: 4,
    status: "Available",
    image: projectResidential,
  },
  {
    id: 5,
    name: "Harbor View Loft",
    location: "Harbor View Complex",
    price: "Coming Soon",
    area: "1,800 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    status: "Upcoming",
    image: projectCommercial,
  },
  {
    id: 6,
    name: "Corner Office Suite",
    location: "Skyline Tower",
    price: "$1,200,000",
    area: "2,800 sq ft",
    status: "Sold",
    image: projectCommercial,
  },
];

const Properties = () => {
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredProperties = properties.filter((property) => {
    if (activeStatus === "All") return true;
    return property.status === activeStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500 text-white";
      case "Sold":
        return "bg-red-500 text-white";
      case "Upcoming":
        return "bg-blue-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <>
      <Helmet>
        <title>Properties for Sale | Apex Construction Real Estate</title>
        <meta 
          name="description" 
          content="Browse premium properties for sale by Apex Construction. Luxury residences, commercial spaces, and exclusive developments in prime locations." 
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
                Real Estate
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Premium Properties
              </h1>
              <p className="text-cream/70 text-lg">
                Discover exclusive properties developed by Apex Construction. 
                From luxury residences to prime commercial spaces.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-background border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-4">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeStatus === status
                      ? "bg-accent text-primary"
                      : "bg-secondary text-foreground hover:bg-accent/10"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  layout
                  className="group"
                >
                  <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border">
                    <div className="relative h-[250px] overflow-hidden">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                        {property.name}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin size={14} />
                        <span className="text-sm">{property.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between py-4 border-t border-b border-border mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-accent" />
                          <span className="font-semibold text-foreground">{property.price}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Maximize2 size={16} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{property.area}</span>
                        </div>
                      </div>

                      {property.bedrooms && (
                        <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                          <span>{property.bedrooms} Beds</span>
                          <span>{property.bathrooms} Baths</span>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button variant="gold" className="flex-1">
                          <Phone size={16} className="mr-2" />
                          Enquire
                        </Button>
                        <Button variant="outline" size="icon">
                          <Mail size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Properties;
