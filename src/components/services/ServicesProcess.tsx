import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/premium/ScrollReveal";
import { ClipboardCheck, PencilRuler, HardHat, Key } from "lucide-react";

export const ServicesProcess = () => {
    const steps = [
        {
            icon: ClipboardCheck,
            title: "Consultation",
            description: "We begin with a thorough discussion to understand your vision, requirements, and budget.",
            color: "bg-blue-500"
        },
        {
            icon: PencilRuler,
            title: "Planning & Design",
            description: "Our experts create detailed architectural plans and 3D designs tailored to your needs.",
            color: "bg-amber-500"
        },
        {
            icon: HardHat,
            title: "Construction",
            description: "We execute the build with precision, using premium materials and skilled labor.",
            color: "bg-green-500"
        },
        {
            icon: Key,
            title: "Handover",
            description: "Final quality checks and walkthrough before handing over the keys to your dream space.",
            color: "bg-purple-500"
        }
    ];

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}
            />

            <div className="container mx-auto px-6">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                            How We Work
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                            Our Construction <span className="text-accent">Process</span>
                        </h2>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                            A transparent, step-by-step approach to ensure your project is delivered on time and to perfection.
                        </p>
                    </div>
                </ScrollReveal>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-slate-200 -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {steps.map((step, index) => (
                            <ScrollReveal key={index} delay={index * 0.1}>
                                <div className="relative flex flex-col items-center text-center group">
                                    <div className={`w-24 h-24 rounded-2xl ${step.color} bg-opacity-10 flex items-center justify-center mb-6 relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                                        <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white shadow-md`}>
                                            <step.icon className="w-6 h-6" />
                                        </div>
                                    </div>

                                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
