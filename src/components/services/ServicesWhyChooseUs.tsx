import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/premium/ScrollReveal";
import { ShieldCheck, Clock, Users, Award } from "lucide-react";

export const ServicesWhyChooseUs = () => {
    const features = [
        {
            icon: ShieldCheck,
            title: "Quality Assurance",
            description: "We never compromise on material quality or workmanship standards."
        },
        {
            icon: Clock,
            title: "On-Time Delivery",
            description: "Strict project management ensures we meet deadlines effectively."
        },
        {
            icon: Users,
            title: "Experienced Team",
            description: "Over 35 years of collective experience in the construction industry."
        },
        {
            icon: Award,
            title: "Transparent Pricing",
            description: "No hidden costs. Detailed quotations and honest communication."
        }
    ];

    return (
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
            {/* Accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />


            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left Content */}
                    <ScrollReveal>
                        <div className="space-y-8">
                            <div>
                                <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                                    Why Choose Us
                                </span>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    Building Trust Through <span className="text-accent">Excellence</span>
                                </h2>
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed">
                                At Brixx Space Construction, we don't just build structures; we build lasting relationships. Our commitment to quality, transparency, and innovation sets us apart in the industry.
                            </p>

                            <div className="grid sm:grid-cols-2 gap-6 pt-4">
                                {features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <feature.icon className="w-6 h-6 text-accent" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg mb-1">{feature.title}</h4>
                                            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right Image/Stats */}
                    <ScrollReveal delay={0.2}>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative z-10">
                                <img
                                    src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                                    alt="Construction Site"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-accent text-slate-900 p-8 rounded-2xl shadow-xl z-20 max-w-xs">
                                <div className="text-5xl font-display font-bold mb-2">35+</div>
                                <div className="font-bold text-lg mb-1">Years Experience</div>
                                <p className="text-sm opacity-80">Serving clients with excellence and dedication since 1989.</p>
                            </div>

                            {/* Decorative Border */}
                            <div className="absolute inset-0 border-2 border-white/10 rounded-3xl transform translate-x-6 translate-y-6 -z-10" />
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};
