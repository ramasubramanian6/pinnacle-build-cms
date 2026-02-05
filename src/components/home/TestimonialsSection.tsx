import { motion } from "framer-motion";
import { useTestimonials } from "@/hooks/useTestimonials";
import { Star, Quote } from "lucide-react";

export const TestimonialsSection = () => {
    const { data: testimonials, isLoading } = useTestimonials();

    const renderStars = (rating: number | null) => {
        const stars = rating || 5;
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-5 h-5 ${i < stars
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-300"
                            }`}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="relative py-24 md:py-32 bg-slate-900 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(251,191,36,0.02),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
                        <span className="text-sm font-semibold text-accent">Testimonials</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        What Our
                        <span className="block text-accent">
                            Clients Say
                        </span>
                    </h2>
                </motion.div>

                {/* Testimonials Grid */}
                {!isLoading && testimonials && testimonials.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {testimonials.slice(0, 6).map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="relative h-full p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/10 transition-all duration-500 backdrop-blur-sm overflow-hidden flex flex-col">
                                    {/* Quote Icon */}
                                    <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <Quote className="w-16 h-16 text-accent" />
                                    </div>

                                    <div className="relative z-10 flex flex-col flex-grow">
                                        {/* Rating */}
                                        <div className="mb-4">
                                            {renderStars(testimonial.rating)}
                                        </div>

                                        {/* Testimonial Text */}
                                        <p className="text-slate-300 leading-relaxed mb-6 line-clamp-6 flex-grow">
                                            "{testimonial.content}"
                                        </p>

                                        {/* Client Info */}
                                        <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-auto">
                                            {/* Client Avatar */}
                                            {testimonial.avatar_url ? (
                                                <img
                                                    src={testimonial.avatar_url}
                                                    alt={testimonial.name}
                                                    className="w-12 h-12 rounded-full object-cover shadow-lg border border-white/10"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg border border-accent/20">
                                                    {testimonial.name.charAt(0)}
                                                </div>
                                            )}

                                            {/* Client Details */}
                                            <div>
                                                <h4 className="font-semibold text-white">
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-sm text-slate-400">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-500">No testimonials available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};
