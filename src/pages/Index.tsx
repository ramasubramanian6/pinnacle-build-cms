import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>BRIXXSPACE | Premium Construction & Infrastructure Company in Tirunelveli</title>
        <meta 
          name="description" 
          content="BRIXXSPACE - Nellai's Future, Built by Us. Leading construction and infrastructure company in Tirunelveli offering premium residential, commercial, and infrastructure projects." 
        />
        <meta name="keywords" content="construction company Tirunelveli, building contractor Tamil Nadu, commercial construction, residential construction, infrastructure Nellai" />
        <link rel="canonical" href="https://brixxspace.com" />
      </Helmet>
      <Layout>
        <HeroSection />
        <FeaturedProjects />
        <WhyChooseUs />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
