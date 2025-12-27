import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { MapPin, Maximize2, Phone, Mail, IndianRupee, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/premium/ScrollReveal";
import { AnimatedBorderCard } from "@/components/premium/GlassmorphismCard";
import { GradientText } from "@/components/premium/AnimatedText";
import { useProperties, formatPrice } from "@/hooks/useProperties";
import { useAuth } from "@/contexts/AuthContext";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

const propertyStatuses = ["All", "Available", "Sold", "Upcoming"];
const fallbackImages = [projectResidential, projectCommercial];

const Properties = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const { data: properties = [], isLoading } = useProperties(activeStatus);
  const { user } = useAuth();

  const getPropertyImage = (property: { image_url: string | null }, index: number) => {
    return property.image_url || fallbackImages[index % fallbackImages.length];
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "available":
        return "bg-green-500/90 text-white";
      case "sold":
        return "bg-red-500/90 text-white";
      case "upcoming":
        return "bg-blue-500/90 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      <Helmet>
        <title>Properties for Sale | BRIXXSPACE Real Estate Tirunelveli</title>
        <meta
          name="description"
          content="Browse premium properties for sale by BRIXXSPACE. Luxury residences, commercial spaces, and exclusive developments in Tirunelveli."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Real Estate
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <GradientText>Premium</GradientText> Properties
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Discover exclusive properties developed by BRIXXSPACE.
                From luxury residences to prime commercial spaces in Tirunelveli.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-secondary border-b border-border">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-4">
              {propertyStatuses.map((status) => (
                <motion.button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeStatus === status
                    ? "bg-accent text-primary shadow-gold"
                    : "bg-card text-foreground border border-border hover:border-accent/50"
                    }`}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No properties found in this category.</p>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
              >
                {properties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    layout
                    className="group"
                  >
                    <AnimatedBorderCard className="overflow-hidden h-full">
                      <div className="relative h-[250px] overflow-hidden">
                        <img
                          src={getPropertyImage(property, index)}
                          alt={property.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full ${getStatusColor(property.status)}`}>
                          {property.status}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground mb-4">
                          <MapPin size={14} className="text-accent" />
                          <span className="text-sm">{property.location}</span>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Maximize2 size={16} className="text-accent" />
                            <span>{property.area_sqft} sq.ft</span>
                          </div>
                        </div>

                        {user ? (
                          <>
                            <div className="flex items-center justify-between py-4 border-t border-b border-border mb-4">
                              <div className="flex items-center gap-1">
                                <IndianRupee size={16} className="text-accent" />
                                <span className="font-semibold text-foreground">{formatPrice(property.price)}</span>
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
                          </>
                        ) : (
                          <div className="pt-4 border-t border-border">
                            <Link to={user ? `/properties/${property.id}` : "/auth"}>
                              <Button variant="gold" className="w-full">
                                View More Details
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </AnimatedBorderCard>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Properties;
