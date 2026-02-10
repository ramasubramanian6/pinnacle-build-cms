import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout/Layout';
import { useServiceCategoryBySlug } from '@/hooks/useServiceCategories';
import { useServiceSubcategoriesByCategory } from '@/hooks/useServiceSubcategories';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal } from '@/components/premium/ScrollReveal';

const ServiceCategoryDetail = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const { data: category, isLoading: categoryLoading } = useServiceCategoryBySlug(categorySlug || '');
    const { data: subcategories, isLoading: subcategoriesLoading } = useServiceSubcategoriesByCategory(categorySlug || '');

    if (categoryLoading || subcategoriesLoading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
            </Layout>
        );
    }

    if (!category) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
                        <Link to="/services">
                            <Button>Back to Services</Button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    // @ts-ignore
    const IconComponent = LucideIcons[category.icon] || LucideIcons.Building2;

    return (
        <>
            <Helmet>
                <title>{category.title} | Brixx Space Construction</title>
                <meta name="description" content={category.description} />
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
                            <span className="text-slate-900 font-medium">{category.title}</span>
                        </div>
                    </div>
                </section>

                {/* Hero Section */}
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-6">
                        <ScrollReveal>
                            <div className="max-w-4xl mx-auto text-center">
                                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                                    <IconComponent className="w-10 h-10 text-accent" />
                                </div>
                                <h1 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                                    {category.title}
                                </h1>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {category.description}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </section>

                {/* Subcategories Grid */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Our Services
                            </h2>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Explore our specialized services in {category.title.toLowerCase()}
                            </p>
                        </div>

                        {subcategories && subcategories.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {subcategories.map((subcategory, index) => (
                                    <motion.div
                                        key={subcategory.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link to={`/services/${categorySlug}/${subcategory.slug}`}>
                                            <div className="group h-full bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300">
                                                {/* Image */}
                                                {subcategory.images && subcategory.images.length > 0 && (
                                                    <div className="aspect-video overflow-hidden">
                                                        <img
                                                            src={subcategory.images[0].url}
                                                            alt={subcategory.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}

                                                {/* Content */}
                                                <div className="p-6">
                                                    <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                                                        {subcategory.title}
                                                    </h3>
                                                    <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                                                        {subcategory.shortDescription}
                                                    </p>
                                                    <div className="flex items-center text-accent font-medium">
                                                        Learn More
                                                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-slate-600 text-lg">No services available in this category yet.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-slate-900">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Get Started?
                            </h2>
                            <p className="text-xl text-slate-300 mb-8">
                                Contact us today to discuss your {category.title.toLowerCase()} project
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link to="/contact">
                                    <Button className="h-12 px-8 bg-accent hover:bg-accent/90 text-primary font-semibold">
                                        Contact Us
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                                <a href="tel:+919894948011">
                                    <Button variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/10">
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

export default ServiceCategoryDetail;
