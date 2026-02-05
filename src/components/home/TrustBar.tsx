import { motion } from "framer-motion";
import { Building2, Award, Calendar, Users } from "lucide-react";

const stats = [
    {
        icon: Calendar,
        value: "35+",
        label: "Years of Experience",
    },
    {
        icon: Building2,
        value: "200+",
        label: "Projects Completed",
    },
    {
        icon: Users,
        value: "50+",
        label: "Expert Professionals",
    },
    {
        icon: Award,
        value: "100%",
        label: "Quality Assurance",
    },
];

export const TrustBar = () => {
    return (
        <section className="bg-slate-950 py-10 border-b border-white/10 relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 group"
                        >
                            <div className="p-3 rounded-xl bg-white/5 group-hover:bg-accent/10 transition-colors duration-300 border border-white/5 group-hover:border-accent/20">
                                <stat.icon className="w-6 h-6 text-accent" />
                            </div>
                            <div>
                                <h4 className="text-3xl font-display font-bold text-white mb-1">
                                    {stat.value}
                                </h4>
                                <p className="text-sm text-slate-400 font-medium uppercase tracking-wide">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
