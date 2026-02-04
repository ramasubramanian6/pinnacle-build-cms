import { motion } from "framer-motion";
import { useWorkers } from "@/hooks/useWorkers";
import { Building2, Award, Shield, Users, Phone, Mail } from "lucide-react";
import { ImageSlider } from "@/components/home/ImageSlider";

export const AboutSection = () => {
    const { data: workers, isLoading } = useWorkers();

    const capabilities = [
        "TATA Hitachi Excavators",
        "JCBs & Bulldozers",
        "Vibratory & Road Rollers",
        "Hot Mix Plant",
        "Paver Finishers",
        "Specialized Machinery",
    ];

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
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-50 via-white to-amber-50/30 overflow-hidden">
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
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Brixx Space is a professional construction consultation and project advisory firm backed by{" "}
                        <span className="font-semibold text-amber-700">35+ years of industry expertise</span>.
                        Led by experienced professionals, we provide end-to-end construction consulting, technical planning,
                        and execution guidance.
                    </p>
                </motion.div>

                {/* Team Members */}
                {!isLoading && workers && workers.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-6xl mx-auto">
                        {workers.map((worker, index) => (
                            <motion.div
                                key={worker.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="group relative"
                            >
                                <div className="relative p-8 rounded-3xl bg-white border border-slate-200 hover:border-amber-400/50 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden">
                                    {/* Gradient Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-yellow-600/0 group-hover:from-amber-500/5 group-hover:to-yellow-600/5 transition-all duration-500 rounded-3xl" />

                                    <div className="relative z-10">
                                        {/* Worker Image Placeholder */}
                                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center mb-6 shadow-xl shadow-amber-500/25 group-hover:scale-110 transition-transform duration-500">
                                            <Users className="w-12 h-12 text-white" />
                                        </div>

                                        {/* Worker Info */}
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                                            {worker.name}
                                        </h3>
                                        <p className="text-amber-600 font-semibold mb-4 uppercase text-sm tracking-wide">
                                            {worker.position}
                                        </p>
                                        <p className="text-slate-600 leading-relaxed mb-6 line-clamp-4">
                                            {worker.bio}
                                        </p>

                                        {/* Contact Info */}
                                        <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                                            {worker.phone && (
                                                <div className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors">
                                                    <Phone className="w-4 h-4" />
                                                    <span className="text-sm">{worker.phone}</span>
                                                </div>
                                            )}
                                            {worker.email && (
                                                <div className="flex items-center gap-2 text-slate-600 hover:text-amber-600 transition-colors">
                                                    <Mail className="w-4 h-4" />
                                                    <span className="text-sm">{worker.email}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Core Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
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



                {/* Slider Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 rounded-3xl overflow-hidden shadow-2xl"
                >
                    <ImageSlider />
                </motion.div>

                {/* Capabilities */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative p-10 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />

                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                            Our Capabilities
                        </h3>
                        <p className="text-slate-300 text-center mb-10 max-w-2xl mx-auto">
                            Advanced construction equipment and resources for projects of any scale and complexity
                        </p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {capabilities.map((capability, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300 group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 group-hover:scale-150 transition-transform duration-300" />
                                    <span className="text-white font-medium">{capability}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section >
    );
};
