import { motion } from "framer-motion";
import { useProperties } from "@/hooks/useProperties";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin, Maximize, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PropertiesSection = () => {
    const { data: properties, isLoading } = useProperties();
    const { user } = useAuth();

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/30 mb-4">
                        <span className="text-sm font-semibold text-amber-400">Properties</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Available
                        <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                            Land & Properties
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        {user
                            ? "Explore our exclusive property listings with complete details"
                            : "Sign in to view complete property details including pricing and contact information"
                        }
                    </p>
                </motion.div>

                {/* Properties Grid */}
                {!isLoading && properties && properties.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {properties.slice(0, 6).map((property, index) => (
                            <motion.div
                                key={property.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative h-full rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/30 overflow-hidden transition-all duration-500">
                                    {/* Property Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        {property.image_url ? (
                                            <img
                                                src={property.image_url}
                                                alt={property.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-yellow-600/20 flex items-center justify-center">
                                                <MapPin className="w-16 h-16 text-amber-400/50" />
                                            </div>
                                        )}


                                    </div>

                                    {/* Property Info */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                            {property.title}
                                        </h3>

                                        {/* Public Info - Always Visible */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <MapPin className="w-4 h-4 text-amber-400" />
                                                <span className="text-sm">{property.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Maximize className="w-4 h-4 text-amber-400" />
                                                <span className="text-sm">{property.area_sqft} sq.ft</span>
                                            </div>
                                        </div>

                                        {/* Authenticated Info - Only for Logged-in Users */}
                                        {user ? (
                                            <>
                                                {property.price && (
                                                    <div className="mb-4 pb-4 border-b border-white/10">
                                                        <p className="text-2xl font-bold text-amber-400">
                                                            ₹{property.price.toLocaleString()}
                                                        </p>
                                                    </div>
                                                )}

                                                {property.description && (
                                                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                                                        {property.description}
                                                    </p>
                                                )}

                                                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-semibold">
                                                    View Full Details
                                                </Button>
                                            </>
                                        ) : (
                                            <Link to="/auth">
                                                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-semibold">
                                                    View Details
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No properties available at the moment.</p>
                    </div>
                )}

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <Link to="/properties">
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 font-semibold shadow-xl shadow-amber-500/25"
                        >
                            View All Properties
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};
