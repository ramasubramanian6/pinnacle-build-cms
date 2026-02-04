import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { usePromotions } from '@/hooks/usePromotions';
import { ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/hooks/useProperties';
import { Skeleton } from '@/components/ui/skeleton';

export function PromotionalSlider() {
    const { data: promotions, isLoading } = usePromotions();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
        breakpoints: {
            '(min-width: 640px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 3 }
        }
    });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (isLoading) return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-2xl font-bold mb-6">Flash Deals</h2>
                <div className="flex gap-4 overflow-hidden">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-64 w-64 rounded-xl" />)}
                </div>
            </div>
        </section>
    );

    if (!promotions || promotions.length === 0) return null;

    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">Flash Deals</h2>
                        <span className="text-primary text-sm font-medium animate-pulse px-2 py-1 bg-primary/10 rounded-full">Limited Time</span>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full h-8 w-8">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full h-8 w-8">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex -ml-4">
                        {promotions.map((promo) => (
                            <div className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%] pl-4 min-w-0" key={promo.id}>
                                <div className="h-full border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col bg-white group">
                                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                                        <img
                                            src={promo.image_url}
                                            alt={promo.title || "Product"}
                                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {promo.discount && (
                                            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                                                {promo.discount}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 flex flex-col flex-grow">
                                        {promo.title && (
                                            <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                                                {promo.title}
                                            </h3>
                                        )}

                                        <div className="mt-auto pt-2">
                                            <div className="flex items-baseline gap-2">
                                                {promo.price && <span className="text-lg font-bold text-gray-900">₹{promo.price.toLocaleString()}</span>}
                                                {promo.original_price && <span className="text-sm text-gray-400 line-through">₹{promo.original_price.toLocaleString()}</span>}
                                            </div>
                                        </div>

                                        {promo.link && (
                                            <Button
                                                variant="secondary"
                                                className="w-full mt-3 text-xs h-8"
                                                onClick={() => window.open(promo.link, '_blank')}
                                            >
                                                View Deal
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
