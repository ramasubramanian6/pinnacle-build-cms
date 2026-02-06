import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Accessibility } from "lucide-react";
import { useSliderImages } from "@/hooks/useSliderImages";
import heroBg from "@/assets/hero-construction.jpg"; // Fallback static image

export const HeroSection = () => {
  const { data: images, isLoading } = useSliderImages();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate slider
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [images]);

  const hasImages = images && images.length > 0;
  const currentImage = hasImages ? images[currentIndex].image_url : heroBg;

  // Preload next image for smoother transitions
  useEffect(() => {
    if (hasImages) {
      const nextIndex = (currentIndex + 1) % images.length;
      const img = new Image();
      img.src = images[nextIndex].image_url;
    }
  }, [currentIndex, hasImages, images]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#080808]">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for text contrast */}
          <img
            src={currentImage}
            alt={hasImages ? images[currentIndex].title || "Luxury Home" : "Luxury Custom Home"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-end pb-32 md:pb-24 lg:justify-end">

        {/* Centered Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center">

          {/* Main Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-tight tracking-tight mb-6"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              {hasImages && images[currentIndex].title ? images[currentIndex].title : "Luxury Custom Home Builders"}
            </motion.h1>
          </AnimatePresence>

          {/* Horizontal Line & Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 max-w-4xl mx-auto px-4"
          >
            <div className="h-px bg-white/60 flex-1 hidden md:block"></div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white font-body text-lg md:text-xl font-medium tracking-wide text-center"
              >
                {hasImages && images[currentIndex].description ? images[currentIndex].description : "Custom built homes for those with discerning taste."}
              </motion.p>
            </AnimatePresence>
            <div className="h-px bg-white/60 flex-1 hidden md:block"></div>
          </motion.div>
        </div>

        {/* Bottom Elements */}
        <div className="absolute bottom-12 left-0 right-0 px-6 md:px-12 flex items-center justify-between z-30">
          {/* Accessibility Icon (Bottom Left) */}
          {/* <div className="hidden md:block">
            <button className="bg-[#0055ff] p-2 rounded-full text-white hover:bg-blue-600 transition-colors" aria-label="Accessibility settings">
              <Accessibility className="w-6 h-6" />
            </button>
          </div> */}

          {/* Slider Indicators (Bottom Center) - DYNAMIC */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-3">
            {hasImages ? (
              images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex
                    ? "bg-white scale-125"
                    : "border border-white/50 bg-transparent hover:bg-white"
                    }`}
                ></div>
              ))
            ) : (
              // Fallback static dot if no images loaded/ready
              <div className="w-2.5 h-2.5 rounded-full bg-white cursor-pointer"></div>
            )}
          </div>

          {/* Right side spacer */}
          <div className="hidden md:block w-10"></div>
        </div>

      </div>
    </section>
  );
};
