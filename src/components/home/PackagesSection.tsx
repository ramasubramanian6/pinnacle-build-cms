import { motion } from "framer-motion";
import { usePackages } from "@/hooks/usePackages";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PackagesSection = () => {
    const { data: packages, isLoading } = usePackages();

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-500/20 to-yellow-600/20 rounded-full blur-3xl"
                />
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
                        <span className="text-sm font-semibold text-amber-400">Our Packages</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Unique Packages,
                        <span className="block bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                            Tailored to Your Needs
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                        Choose the perfect package for your construction project. Flexible options designed to meet your specific requirements.
                    </p>
                </motion.div>

                {/* Packages Grid */}
                {!isLoading && packages && packages.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {packages.map((pkg, index) => (
                            <motion.div
                                key={pkg.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                {/* Featured Badge */}
                                {pkg.is_popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                        <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 shadow-lg shadow-amber-500/50">
                                            <Star className="w-3.5 h-3.5 text-white fill-white" />
                                            <span className="text-xs font-bold text-white uppercase">Most Popular</span>
                                        </div>
                                    </div>
                                )}

                                <div
                                    className={`relative h-full p-8 rounded-3xl border transition-all duration-500 ${pkg.is_popular
                                        ? "bg-gradient-to-br from-amber-500/10 to-yellow-600/10 border-amber-500/50 shadow-2xl shadow-amber-500/20 scale-105"
                                        : "bg-white/5 border-white/10 hover:border-amber-500/30 hover:bg-white/10"
                                        }`}
                                >
                                    {/* Package Name */}
                                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                                        {pkg.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-slate-400 mb-6 text-sm">
                                        {pkg.description}
                                    </p>

                                    {/* Price Info */}
                                    {pkg.price && (
                                        <div className="mb-6 pb-6 border-b border-white/10">
                                            <p className="text-amber-400 font-semibold text-lg">
                                                {pkg.price}
                                            </p>
                                        </div>
                                    )}

                                    {/* Includes List */}
                                    {pkg.features && pkg.features.length > 0 && (
                                        <div className="space-y-3 mb-8">
                                            <p className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                                                Includes:
                                            </p>
                                            {pkg.features.map((item, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="mt-0.5 flex-shrink-0">
                                                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center">
                                                            <Check className="w-3 h-3 text-white" />
                                                        </div>
                                                    </div>
                                                    <span className="text-slate-300 text-sm leading-relaxed">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* CTA Button */}
                                    <Button
                                        className={`w-full h-12 font-semibold transition-all duration-300 ${pkg.is_popular
                                            ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-900 shadow-lg shadow-amber-500/30"
                                            : "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-amber-500/50"
                                            }`}
                                    >
                                        Choose Package
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className="text-slate-300 mb-6">
                        Not sure which package is right for you?
                    </p>
                    <a
                        href="https://api.whatsapp.com/send?phone=919894948011&text=Hi%2C%20I%27m%20interested%20in%20a%20consultation%20for%20my%20construction%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-11 rounded-md px-8 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/10 hover:bg-white/20 text-white border-2 border-white/20 hover:border-amber-500/50 backdrop-blur-sm transition-all duration-300"
                    >
                        Schedule a Consultation
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
