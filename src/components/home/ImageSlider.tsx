import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSliderImages } from '@/hooks/useSliderImages';
import { LuxuryLoader } from '@/components/premium/LuxuryLoader';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

    if (!images || images.length === 0) return null;

    return (
        <div className="relative group overflow-hidden bg-black/5">
            <div className="embla overflow-hidden" ref={emblaRef}>
                <div className="flex h-[500px] sm:h-[600px] lg:h-[700px]">
                    {images.map((image) => (
                        <div className="flex-[0_0_100%] min-w-0 relative" key={image.id}>
                            <div className="absolute inset-0">
                                <img
                                    src={image.image_url}
                                    alt={image.title || "Slide"}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-10">
                                <div className="container mx-auto">
                                    {image.title && (
                                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 animate-in slide-in-from-bottom-5 fade-in duration-700">
                                            {image.title}
                                        </h2>
                                    )}
                                    {image.description && (
                                        <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-in slide-in-from-bottom-5 fade-in duration-700 delay-100">
                                            {image.description}
                                        </p>
                                    )}
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
