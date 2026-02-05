import { motion } from "framer-motion";
import { Building2, Award, Shield, Users } from "lucide-react";


export const AboutSection = () => {
    const values = [
        {
            icon: Shield,
            title: "Integrity",
            description: "Highest ethical standards in every project",
        },
        {
            icon: Award,
            title: "Excellence",
            description: "Superior design, execution, and client service",
        },
        {
            icon: Building2,
            title: "Innovation",
            description: "Modern engineering with proven techniques",
        },
        {
            icon: Users,
            title: "Collaboration",
            description: "Strong partnerships with clients and stakeholders",
        },
    ];

    return (
        <section className="relative pt-24 md:pt-32 pb-48 md:pb-64 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-600/10 border border-amber-500/20 mb-4">
                        <span className="text-sm font-semibold text-amber-700">About Us</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                        Building Excellence in
                        <span className="block bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                            South Tamil Nadu
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Brixx Space is a professional construction consultation and project advisory firm backed by{" "}
                        <span className="font-semibold text-amber-700">35+ years of industry expertise</span>.
                        Led by experienced professionals, we provide end-to-end construction consulting, technical planning,
                        and execution guidance.
                    </p>
                    <a
                        href="/about"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 md:text-lg transition-colors"
                    >
                        Read More About Us
                    </a>
                </motion.div>

                {/* Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
                        Our Core Values
                    </h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-amber-500/25">
                                    <value.icon className="w-7 h-7 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                                    {value.title}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
