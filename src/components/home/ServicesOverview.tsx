import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useServices } from "@/hooks/useServices";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";



export const ServicesOverview = () => {
    const { data: services, isLoading } = useServices();

    if (isLoading) return <div className="py-24 flex justify-center"><LuxuryLoader /></div>;

    if (!services || services.length === 0) return null;

    const featuredServices = services.filter(s => s.featured);
    const displayServices = featuredServices.length > 0 ? featuredServices : services.slice(0, 4);

    return (
        <section className="py-24 bg-slate-950 relative z-20">
            {/* Background Gradient - matching FeaturedProjects style */}
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
                            Our Services
                        </span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                            Featured Services
                        </h2>
                        <p className="text-slate-400 mt-4 max-w-xl text-lg leading-relaxed">
                            Tailored construction solutions from initial design to final handover.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            to="/services"
                            className="group inline-flex items-center gap-2 text-white font-medium hover:text-accent transition-colors mt-8 md:mt-0 border-b border-white/20 hover:border-accent pb-1"
                        >
                            <span>View All Services</span>
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayServices.map((service, index) => {
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="h-full"
                            >
                                <Link to="/services" className="block h-full bg-slate-900/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10 hover:border-accent/50 hover:shadow-accent/5 transition-all duration-300 group">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-slate-400 leading-relaxed text-sm mb-6 line-clamp-3">
                                        {service.description}
                                    </p>
                                    <div className="flex items-center text-sm font-semibold text-accent/0 group-hover:text-accent transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
