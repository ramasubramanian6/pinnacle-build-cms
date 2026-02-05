import { motion } from "framer-motion";
import { Ruler, Hammer, Building2, Paintbrush, ArrowRight, Wallet, Home, Key, Settings } from "lucide-react";
import { useServices } from "@/hooks/useServices";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";

const getIcon = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
        case 'ruler': return Ruler;
        case 'hammer': return Hammer;
        case 'paintbrush': return Paintbrush;
        case 'building': return Building2;
        case 'wallet': return Wallet;
        case 'home': return Home;
        case 'key': return Key;
        default: return Settings;
    }
};

export const ServicesOverview = () => {
    const { data: services, isLoading } = useServices();

    if (isLoading) return <div className="py-24 flex justify-center"><LuxuryLoader /></div>;

    if (!services || services.length === 0) return null;

    return (
        <section className="py-24 bg-transparent relative z-20">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 md:-mt-32">
                    {services.slice(0, 4).map((service, index) => {
                        const Icon = getIcon(service.icon);
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-slate-900/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white/10 hover:border-accent/50 hover:shadow-accent/5 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                                    <Icon className="w-7 h-7 text-accent group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed text-sm mb-6 line-clamp-3">
                                    {service.description}
                                </p>
                                <div className="flex items-center text-sm font-semibold text-accent/0 group-hover:text-accent transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
