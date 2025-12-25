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
        <title>Apex Construction | Premium Construction & Infrastructure Company</title>
        <meta 
          name="description" 
          content="Apex Construction - Building tomorrow's landmarks today. 35+ years of excellence in residential, commercial, and infrastructure construction projects." 
        />
        <meta name="keywords" content="construction company, building contractor, commercial construction, residential construction, infrastructure" />
        <link rel="canonical" href="https://apexconstruction.com" />
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
