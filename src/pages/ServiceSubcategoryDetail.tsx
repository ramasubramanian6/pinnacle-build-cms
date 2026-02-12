import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useServiceSubcategoryBySlug } from '@/hooks/useServiceSubcategories';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, CheckCircle2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { useState } from 'react';

const ServiceSubcategoryDetail = () => {
    const { categorySlug, subcategorySlug } = useParams<{ categorySlug: string; subcategorySlug: string }>();
    const { data: subcategory, isLoading } = useServiceSubcategoryBySlug(categorySlug || '', subcategorySlug || '');
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

    if (!subcategory) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
                        <Link to="/services">
                            <Button>Back to Services</Button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    const category = typeof subcategory.category === 'object' ? subcategory.category : null;

    return (
        <>
            <Helmet>
                <title>{subcategory.metaTitle || `${subcategory.title} | Brixx Space Construction`}</title>
                <meta name="description" content={subcategory.metaDescription || subcategory.shortDescription} />
            </Helmet>
            <Layout>
                {/* Breadcrumb */}
                <section className="pt-24 pb-8 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <Link to="/services" className="hover:text-accent transition-colors">Services</Link>
                            <ChevronRight className="w-4 h-4" />
                            {category && (
                                <>
                                    <Link to={`/services/${categorySlug}`} className="hover:text-accent transition-colors">
                                        {category.title}
                                    </Link>
                                    <ChevronRight className="w-4 h-4" />
                                </>
                            )}
                            <span className="text-slate-900 font-medium">{subcategory.title}</span>
                        </div>
                    </div>
                </section>

                {/* Hero Section */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="max-w-4xl mx-auto text-center">
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                                    {subcategory.title}
                                </h1>
                                <p className="text-xl text-slate-600 leading-relaxed">
                                    {subcategory.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Image Gallery */}
                {subcategory.images && subcategory.images.length > 0 && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="max-w-7xl mx-auto">
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                                    Service Photos
                                </h2>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {subcategory.images.map((image, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group cursor-pointer"
                                            onClick={() => setSelectedImageIndex(index)}
                                        >
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 relative">
                                                <img
                                                    src={image.url}
                                                    alt={image.caption || `Gallery image ${index + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format&fit=crop';
                                                        e.currentTarget.alt = 'Construction placeholder image';
                                                    }}
                                                />
                                            </div>
                                            {image.caption && (
                                                <p className="mt-3 text-sm text-slate-600 text-center">{image.caption}</p>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Lightbox Modal */}
                {selectedImageIndex !== null && subcategory.images && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white text-4xl hover:text-accent transition-colors"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            ×
                        </button>
                        <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={subcategory.images[selectedImageIndex].url}
                                alt={subcategory.images[selectedImageIndex].caption || ''}
                                className="w-full h-auto rounded-lg"
                            />
                            {subcategory.images[selectedImageIndex].caption && (
                                <p className="text-white text-center mt-4 text-lg">
                                    {subcategory.images[selectedImageIndex].caption}
                                </p>
                            )}
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                                    disabled={selectedImageIndex === 0}
                                >
                                    Previous
                                </button>
                                <button
                                    className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                                    onClick={() => setSelectedImageIndex(Math.min(subcategory.images.length - 1, selectedImageIndex + 1))}
                                    disabled={selectedImageIndex === subcategory.images.length - 1}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Features Section */}
                {subcategory.features && subcategory.features.length > 0 && (
                    <section className="py-20 bg-slate-50">
                        <div className="container mx-auto px-6">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                                    Key Features
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {subcategory.features.map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200"
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

                {/* Content Section */}
                {subcategory.content && (
                    <section className="py-20 bg-white">
                        <div className="container mx-auto px-6">
                            <div className="max-w-4xl mx-auto">
                                {subcategory.contentHeading && (
                                    <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-8 text-center">
                                        {subcategory.contentHeading}
                                    </h2>
                                )}
                                <div className="prose prose-lg prose-slate max-w-none">
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                                        {subcategory.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-20 bg-slate-900">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                                Interested in {subcategory.title}?
                            </h2>
                            <p className="text-xl text-slate-300 mb-8">
                                Get in touch with our team to discuss your project requirements
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/contact">
                                    <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-primary font-semibold">
                                        Request a Quote
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

export default ServiceSubcategoryDetail;
