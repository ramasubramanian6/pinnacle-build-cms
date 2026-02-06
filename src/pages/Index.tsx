import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
// import { ImageSlider } from "@/components/home/ImageSlider";
import { HeroSection } from "@/components/home/HeroSection";

import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ConsultationCTA } from "@/components/home/ConsultationCTA";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Brixx Space | Professional Construction Consultation & Advisory in Tirunelveli</title>
        <meta
          name="description"
          content="Brixx Space - Professional construction consultation and project advisory firm backed by 35+ years of industry expertise. Expert services in Tirunelveli, Tamil Nadu."
        />
        <meta name="keywords" content="construction consultation Tirunelveli, project advisory Tamil Nadu, civil engineering, construction planning, Brixx Space" />
        <link rel="canonical" href="https://brixxspace.com" />
      </Helmet>
      <Layout>
        <HeroSection />

        <ServicesOverview />
        <AboutSection />
        <FeaturedProjects />
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Index;
