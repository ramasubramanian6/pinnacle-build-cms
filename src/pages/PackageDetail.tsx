import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { usePackageById } from '@/hooks/usePackages';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Phone, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { useState } from 'react';

const PackageDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data: pkg, isLoading } = usePackageById(id || '');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    if (isLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
            </Layout>
        );
    }

    if (!pkg) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Package Not Found</h1>
                        <Link to="/services">
                            <Button>Back to Services</Button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <>
            <Helmet>
                <title>{pkg.title} | Brixx Space Construction</title>
                <meta name="description" content={pkg.description} />
            </Helmet>
            <Layout>
                {/* Hero Section */}
                <section className="pt-32 pb-16 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="max-w-4xl mx-auto text-center">
                                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent font-semibold rounded-full mb-6">
                                    {pkg.status || "Available"}
                                </span>
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                                    {pkg.title}
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                                    {pkg.description}
                                </p>
                                <div className="text-3xl font-bold text-accent mb-8">
                                    {pkg.price}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Details Section */}
                {pkg.details && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                    {pkg.details}
                                </p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Image Gallery */}
                {pkg.images && pkg.images.length > 0 && (
                    <section className="py-20 bg-slate-50">
                        <div className="container mx-auto px-6">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                                Gallery
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {pkg.images.map((image, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="group cursor-pointer aspect-[4/3] rounded-2xl overflow-hidden bg-white relative"
                                        onClick={() => setSelectedImageIndex(index)}
                                    >
                                        <img
                                            src={image} // Assuming simple string array for now based on schema
                                            alt={`${pkg.title} ${index + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop';
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Lightbox Modal */}
                {selectedImageIndex !== null && pkg.images && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <button className="absolute top-4 right-4 text-white text-4xl hover:text-accent transition-colors">×</button>
                        <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={pkg.images[selectedImageIndex]}
                                alt=""
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                )}


                {/* Features Section */}
                {pkg.features && pkg.features.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-6 text-center">
                                    Key Features
                                </h2>
                                {pkg.featuresDescription && (
                                    <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-12">
                                        {pkg.featuresDescription}
                                    </p>
                                )}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {pkg.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100"
                                        >
                                            <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                                            <span className="text-slate-700 text-lg">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Process Section */}
                {pkg.process && pkg.process.length > 0 && (
                    <section className="py-20 bg-slate-50">
                        <div className="container mx-auto px-6">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                                Process
                            </h2>
                            <div className="max-w-4xl mx-auto space-y-8">
                                {pkg.process.map((step: any, index: number) => (
                                    <div key={index} className="flex gap-6 relative">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold z-10 shrink-0">
                                                {index + 1}
                                            </div>
                                            {index !== pkg.process.length - 1 && (
                                                <div className="w-px h-full bg-slate-300 absolute top-10 bottom-0 left-5 -translate-x-1/2" />
                                            )}
                                        </div>
                                        <div className="pb-8">
                                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{step.title}</h3>
                                            <p className="text-slate-600">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Benefits Section */}
                {pkg.benefits && pkg.benefits.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                                Benefits
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {pkg.benefits.map((benefit: any, index: number) => (
                                    <div key={index} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                                        <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                                        <p className="text-slate-600">{benefit.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                {pkg.faqs && pkg.faqs.length > 0 && (
                    <section className="py-20 bg-slate-50">
                        <div className="container mx-auto px-6 max-w-3xl">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                                FAQ
                            </h2>
                            <div className="space-y-4">
                                {pkg.faqs.map((faq: any, index: number) => (
                                    <details key={index} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-slate-900">
                                            {faq.question}
                                            <span className="text-slate-400 group-open:rotate-180 transition-transform">
                                                <ChevronRight className="w-5 h-5 rotate-90" />
                                            </span>
                                        </summary>
                                        <div className="px-6 pb-6 text-slate-600 border-t border-slate-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-slate-900">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                                Interested in {pkg.title}?
                            </h2>
                            <p className="text-xl text-slate-300 mb-8">
                                Get in touch to discuss pricing and customization options
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to={pkg.cta_link || "/contact"}>
                                    <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-primary font-semibold">
                                        {pkg.cta_text || "Request a Quote"}
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <a href="tel:+919894948011">
                                    <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
                                        <Phone className="mr-2 w-4 h-4" />
                                        Call Us Now
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default PackageDetail;
