import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Construction",
    slug: "future-sustainable-construction",
    excerpt: "Exploring innovative green building practices and how they're shaping the future of the construction industry.",
    author: "John Mitchell",
    date: "Dec 20, 2024",
    category: "Sustainability",
    image: projectCommercial,
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "5 Key Trends in Commercial Real Estate 2025",
    slug: "commercial-real-estate-trends-2025",
    excerpt: "A comprehensive look at the emerging trends that will define commercial real estate development in the coming year.",
    author: "Sarah Chen",
    date: "Dec 18, 2024",
    category: "Industry Insights",
    image: projectResidential,
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Behind the Scenes: Building Skyline Tower",
    slug: "behind-scenes-skyline-tower",
    excerpt: "An exclusive look at the engineering marvels and challenges we overcame during the construction of Skyline Tower.",
    author: "Michael Torres",
    date: "Dec 15, 2024",
    category: "Project Stories",
    image: projectOngoing,
    readTime: "10 min read",
  },
  {
    id: 4,
    title: "Smart Buildings: Integrating Technology in Construction",
    slug: "smart-buildings-technology",
    excerpt: "How IoT, AI, and automation are revolutionizing modern building design and construction processes.",
    author: "Emily Rodriguez",
    date: "Dec 12, 2024",
    category: "Technology",
    image: projectCommercial,
    readTime: "6 min read",
  },
  {
    id: 5,
    title: "Choosing the Right Materials for Your Project",
    slug: "choosing-right-materials",
    excerpt: "A guide to selecting construction materials that balance durability, cost-effectiveness, and sustainability.",
    author: "David Park",
    date: "Dec 10, 2024",
    category: "Construction Tips",
    image: projectResidential,
    readTime: "8 min read",
  },
  {
    id: 6,
    title: "The Importance of Safety in Construction",
    slug: "importance-safety-construction",
    excerpt: "Why safety protocols are non-negotiable and how we maintain our perfect safety record at Apex Construction.",
    author: "Lisa Johnson",
    date: "Dec 8, 2024",
    category: "Safety",
    image: projectOngoing,
    readTime: "4 min read",
  },
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Apex Construction Insights & Industry News</title>
        <meta 
          name="description" 
          content="Stay updated with the latest construction industry insights, project stories, and expert tips from Apex Construction's blog." 
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-slate-dark">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-accent font-medium uppercase tracking-wider text-sm mb-4 block">
                Our Blog
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Insights & Stories
              </h1>
              <p className="text-cream/70 text-lg">
                Explore the latest trends in construction, project stories, 
                and expert insights from our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to={`/blog/${blogPosts[0].slug}`} className="group block">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <img
                      src={blogPosts[0].image}
                      alt={blogPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded">
                      Featured
                    </span>
                  </div>
                  <div className="lg:pl-8">
                    <span className="text-accent font-medium text-sm mb-3 block">
                      {blogPosts[0].category}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                      {blogPosts[0].title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                      {blogPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{blogPosts[0].author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{blogPosts[0].date}</span>
                      </div>
                      <span>{blogPosts[0].readTime}</span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group block">
                    <div className="bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border">
                      <div className="relative h-[200px] overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-primary text-xs font-semibold uppercase tracking-wider rounded">
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
                            <Calendar size={14} />
                            <span>{post.date}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
