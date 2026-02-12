import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Building2,
  ArrowRight,
  Phone,
  ArrowUpRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServiceCategories } from "@/hooks/useServiceCategories";
import { useServiceSubcategories } from "@/hooks/useServiceSubcategories";
import * as LucideIcons from "lucide-react";
import { ScrollReveal } from "@/components/premium/ScrollReveal";
import { PackagesSection } from "@/components/home/PackagesSection";
import { ServicesProcess } from "@/components/services/ServicesProcess";
import { ServicesWhyChooseUs } from "@/components/services/ServicesWhyChooseUs";

const ServiceCategory = ({ category, allSubcategories }: { category: any, allSubcategories: any[] }) => {
  const subcategories = allSubcategories?.filter(sub =>
    (typeof sub.category === 'string' ? sub.category : sub.category.id) === category.id
  ) || [];

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [showRightArrow, setShowRightArrow] = React.useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [subcategories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  const isScrollable = subcategories.length > 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-3xl border border-slate-200 bg-white overflow-hidden"
    >
      {/* Header (No Icon, Professional) */}
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900">
              {category.title}
            </h2>
            <p className="text-slate-500 max-w-3xl text-lg leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Scroll Buttons (Only if scrollable) */}
          {isScrollable && (
            <div className="flex items-center gap-2 hidden md:flex shrink-0">
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
                className="rounded-full border-slate-200 hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <LucideIcons.ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
                className="rounded-full border-slate-200 hover:border-accent hover:text-accent disabled:opacity-30"
              >
                <LucideIcons.ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {subcategories.length > 0 ? (
          isScrollable ? (
            // Horizontal Scroll Layout
            <div
              ref={scrollContainerRef}
              onScroll={checkScroll}
              className="flex gap-6 overflow-x-auto pb-6 -mb-6 scrollbar-hide snap-x"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {subcategories.map((sub, idx) => (
                <div key={sub.id} className="min-w-[300px] md:min-w-[350px] snap-start">
                  <ServiceCard category={category} sub={sub} idx={idx} />
                </div>
              ))}
            </div>
          ) : (
            // Grid Layout
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subcategories.map((sub, idx) => (
                <ServiceCard key={sub.id} category={category} sub={sub} idx={idx} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p>No services found in this category yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ category, sub, idx }: { category: any, sub: any, idx: number }) => {
  // @ts-ignore
  const IconComponent = LucideIcons[category.icon] || Building2;

  return (
    <Link
      to={`/services/${category.slug}/${sub.slug}`}
      className="group/card relative h-full block h-full outline-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: idx * 0.05 }}
        className="h-full bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col shadow-sm"
      >
        {/* Image Area */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          {sub.images && sub.images.length > 0 ? (
            <img
              src={sub.images[0].url}
              alt={sub.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <IconComponent className="w-16 h-16 text-slate-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity duration-300" />

          {/* Floating Arrow (Subtle) */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300 border border-white/30">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover/card:text-accent transition-colors">
            {sub.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
            {sub.shortDescription}
          </p>

          <div className="flex items-center text-xs font-bold text-accent uppercase tracking-wider mt-auto">
            View Details <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover/card:translate-x-1" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Services = () => {
  const { data: categories, isLoading: categoriesLoading } = useServiceCategories();
  const { data: allSubcategories, isLoading: subcategoriesLoading } = useServiceSubcategories();

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
      ))}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Professional Services | Brixx Space Construction</title>
        <meta
          name="description"
          content="Expert construction consultation services backed by 35+ years of experience. Browse our specialized services from residential planning to commercial execution."
        />
      </Helmet>
      <Layout>

        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          {/* ... existing hero content ... */}
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Expertise
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Comprehensive <span className="text-accent">Construction</span> Solutions
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl mb-8">
                From initial concept to final handover, we provide end-to-end services tailored to your specific needs. Explore our service categories below.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* --- Process Section (New) --- */}
        <ServicesProcess />

        {/* --- Service Categories (Full Width & Always Visible) --- */}
        <section className="py-10 bg-white min-h-[600px]">
          <div className="w-full px-4 md:px-8 lg:px-12">
            {categoriesLoading ? (
              <LoadingSkeleton />
            ) : (
              <div className="space-y-12">
                {categories?.map((category, index) => (
                  <ServiceCategory
                    key={category.id}
                    category={category}
                    allSubcategories={allSubcategories || []}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- Why Choose Us (New) --- */}
        <ServicesWhyChooseUs />

        {/* --- Packages Section --- */}
        <PackagesSection />


      </Layout>
    </>
  );
};

export default Services;
