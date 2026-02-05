import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSliderImages } from '@/hooks/useSliderImages';
import { LuxuryLoader } from '@/components/premium/LuxuryLoader';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { HeroSection } from '@/components/home/HeroSection';

export function ImageSlider() {
    const { data: images, isLoading } = useSliderImages();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    if (isLoading) return <div className="h-[500px] flex items-center justify-center"><LuxuryLoader /></div>;

    if (!images || images.length === 0) return <HeroSection />;

    return (
        <div className="relative group overflow-hidden bg-black/5">
            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="flex h-[80vh] min-h-[500px] lg:h-[700px]">
                    {images.map((image) => (
                        <div className="flex-[0_0_100%] min-w-0 relative" key={image.id}>
                            <div className="absolute inset-0">
                                <img
                                    src={image.image_url}
                                    alt={image.title || "Slide"}
                                    className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000"
                                />
                                {/* Premium Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="container mx-auto px-6">
                                    <div className="max-w-3xl pt-20">
                                        <div className="hidden md:flex items-center gap-2 mb-6 animate-in slide-in-from-bottom-5 fade-in duration-700">
                                            <div className="w-12 h-[2px] bg-accent"></div>
                                            <span className="text-accent uppercase tracking-widest font-semibold text-sm">Welcome to Brixx Space</span>
                                        </div>

                                        {image.title && (
                                            <h2 className="text-3xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-3 md:mb-6 leading-tight animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100">
                                                {image.title}
                                            </h2>
                                        )}
                                        {image.description && (
                                            <p className="text-sm md:text-xl text-slate-200 mb-6 md:mb-8 max-w-xl leading-relaxed animate-in slide-in-from-bottom-5 fade-in duration-700 delay-200">
                                                {image.description}
                                            </p>
                                        )}


                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-20">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollPrev}
                    className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={scrollNext}
                    className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm"
                >
                    <ArrowRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
