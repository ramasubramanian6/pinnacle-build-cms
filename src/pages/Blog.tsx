import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GlassmorphismCard, GradientBorderCard } from "@/components/premium/GlassmorphismCard";
import { GradientText } from "@/components/premium/AnimatedText";
import { blogPosts } from "@/data/blog";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const imageMap: Record<string, string> = {
  "project-residential": projectResidential,
  "project-commercial": projectCommercial,
  "project-ongoing": projectOngoing,
};

const Blog = () => {
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  const otherPosts = blogPosts.filter(post => post.id !== featuredPost.id);

  return (
    <>
      <Helmet>
        <title>Blog | BRIXXSPACE Insights & Industry News</title>
        <meta 
          name="description" 
          content="Stay updated with the latest construction industry insights, project stories, and expert tips from BRIXXSPACE's blog." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <ScrollReveal>
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Blog
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                <GradientText>Insights</GradientText> & Stories
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explore the latest trends in construction, project stories, 
                and expert insights from our team.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <Link to={`/blog/${featuredPost.slug}`} className="group block">
                <GradientBorderCard className="overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-[300px] lg:h-[400px] overflow-hidden">
                      <img
                        src={imageMap[featuredPost.image]}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 px-4 py-1.5 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
                        Featured
                      </span>
                    </div>
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="text-accent font-medium text-sm mb-3 block">
                        {featuredPost.category}
                      </span>
                      <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground text-lg mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <User size={16} className="text-accent" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-accent" />
                          <span>{featuredPost.date}</span>
                        </div>
                        <span className="text-accent">{featuredPost.readTime}</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight size={16} />
                      </span>
                    </div>
                  </div>
                </GradientBorderCard>
              </Link>
            </ScrollReveal>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group block">
                  <GlassmorphismCard hover className="overflow-hidden h-full">
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={imageMap[post.image]}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-accent" />
                          <span>{post.date}</span>
                        </div>
                        <span className="text-accent">{post.readTime}</span>
                      </div>
                    </div>
                  </GlassmorphismCard>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
