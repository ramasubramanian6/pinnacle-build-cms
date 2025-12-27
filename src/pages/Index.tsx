import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { PackagesSection } from "@/components/home/PackagesSection";
import { PropertiesSection } from "@/components/home/PropertiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Brixx Space | Professional Construction Consultation & Advisory in Tirunelveli</title>
        <meta
          name="description"
          content="Brixx Space - Professional construction consultation and project advisory firm backed by 30+ years of industry expertise. Expert services in Tirunelveli, Tamil Nadu."
        />
        <meta name="keywords" content="construction consultation Tirunelveli, project advisory Tamil Nadu, civil engineering, construction planning, Brixx Space" />
        <link rel="canonical" href="https://brixxspace.com" />
      </Helmet>
      <Layout>
        <HeroSection />
        <AboutSection />
        <PackagesSection />
        <PropertiesSection />
        <TestimonialsSection />
      </Layout>
    </>
  );
};

export default Index;
