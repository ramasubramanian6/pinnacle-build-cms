import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

// Static blog data (will be replaced with backend data later)
const blogPosts = [
  {
    id: 1,
    slug: "future-sustainable-construction-tamil-nadu",
    title: "The Future of Sustainable Construction in Tamil Nadu",
    excerpt: "Exploring innovative green building practices and how they're shaping the future of the construction industry in South India.",
    author: "Rajesh Kumar",
    date: "Dec 20, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    featured: true,
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    slug: "commercial-real-estate-trends-2025",
    title: "5 Key Trends in Commercial Real Estate 2025",
    excerpt: "A comprehensive look at the emerging trends that will define commercial real estate development in Tamil Nadu.",
    author: "Brixx Space Team",
    date: "Dec 18, 2024",
    readTime: "7 min read",
    category: "Industry Insights",
    featured: false,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    slug: "building-nellai-heights",
    title: "Behind the Scenes: Building Nellai Heights",
    excerpt: "An exclusive look at the engineering marvels and challenges we overcame during the construction of Nellai Heights.",
    author: "Brixx Space Team",
    date: "Dec 15, 2024",
    readTime: "10 min read",
    category: "Project Stories",
    featured: false,
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    slug: "smart-buildings-technology",
    title: "Smart Buildings: Integrating Technology in Construction",
    excerpt: "How IoT, AI, and automation are revolutionizing modern building design and construction processes.",
    author: "Brixx Space Team",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    category: "Technology",
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop"
  },
  {
    id: 5,
    slug: "choosing-right-materials",
    title: "Choosing the Right Materials for Your Project",
    excerpt: "A guide to selecting construction materials that balance durability, cost-effectiveness, and sustainability.",
    author: "Brixx Space Team",
    date: "Dec 10, 2024",
    readTime: "8 min read",
    category: "Construction Tips",
    featured: false,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    slug: "importance-safety-construction",
    title: "The Importance of Safety in Construction",
    excerpt: "Why safety protocols are non-negotiable and how we maintain our perfect safety record at Brixx Space.",
    author: "Brixx Space Team",
    date: "Dec 8, 2024",
    readTime: "4 min read",
    category: "Safety",
    featured: false,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop"
  }
];

const Blog = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <>
      <Helmet>
        <title>Blog - Insights & Stories | Brixx Space</title>
        <meta
          name="description"
          content="Explore the latest trends in construction, project stories, and expert insights from the Brixx Space team."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&h=1080&fit=crop"
              alt="Construction background"
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A]/90 via-[#1A1A1A]/85 to-[#0A0A0A]/90" />
          </div>

          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,184,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,184,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 15, repeat: Infinity }}
              className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FFB800]/20 to-[#8B5CF6]/20 rounded-full blur-3xl"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FFB800]/10 to-[#8B5CF6]/10 border border-[#FFB800]/20 backdrop-blur-sm mb-6">
                <TrendingUp className="w-5 h-5 text-[#FFB800]" />
                <span className="text-sm font-semibold text-[#FFB800]">Our Blog</span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                Insights &
                <span className="block bg-gradient-to-r from-[#FFB800] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent">
                  Stories
                </span>
              </h1>

              <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
                Explore the latest trends in construction, project stories, and expert insights from our team.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
              >
                <Link to={`/blog/${featuredPost.slug}`}>
                  <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-[#FFB800]/20 hover:border-[#FFB800]/50 transition-all duration-500">
                    <div className="grid lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative h-64 lg:h-auto overflow-hidden">
                        <img
                          src={featuredPost.image}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FFA500] text-black text-sm font-bold flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Featured
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-[#FFB800] font-semibold text-sm uppercase tracking-wider mb-4">
                          {featuredPost.category}
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-[#FFB800] transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                          <span>{featuredPost.author}</span>
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {featuredPost.date}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#FFB800] font-semibold group-hover:gap-4 transition-all">
                          Read More
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#FFB800]/50 hover:shadow-2xl hover:shadow-[#FFB800]/10 transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-slate-900 mb-3 group-hover:text-[#FFB800] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#FFB800] to-[#FFA500]">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Ready to Build Your Dreams?
              </h2>
              <p className="text-xl text-slate-800 mb-8">
                Let's discuss your next project and transform your vision into reality.
              </p>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-semibold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center gap-2 mx-auto"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Blog;
