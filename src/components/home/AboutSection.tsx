import { motion } from "framer-motion";
import { Building2, Award, Shield, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-construction.jpg";

export const AboutSection = () => {
    const features = [
        "35+ Years of Industry Experience",
        "Technical Excellence & Innovation",
        "Transparent & Ethical Practices",
        "End-to-End Project Support"
    ];

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                            <img
                                src={heroImage}
                                alt="Construction Site"
                                className="w-full h-[400px] md:h-[600px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        {/* Floating Experience Card */}
                        <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-accent/10 rounded-full">
                                    <Award className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Since 1989</p>
                                    <p className="text-xl font-bold text-slate-900">Excellence in Construction</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
                            <Building2 className="w-4 h-4" />
                            <span>About Brixx Space</span>
                        </div>

                        <h2 className="font-display text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            Building Visions into <span className="text-accent">Concrete Reality</span>
                        </h2>

                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            Brixx Space is a premier construction consultation and project advisory firm in South Tamil Nadu. With over three decades of expertise, we don't just build structures; we build trust, efficiency, and lasting value.
                        </p>

                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Led by Er. Loknath S and Mr. A. Ulagu Lakshmanan, our team combines traditional engineering wisdom with modern construction management to deliver projects that stand the test of time.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 mb-10">
                            {features.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href="/about"
                            className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors group"
                        >
                            More About Us
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
