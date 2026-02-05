import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/premium/ScrollReveal";
import { GradientText } from "@/components/premium/AnimatedText";
import { useBlogs } from "@/hooks/useBlogs";

// Static blog data (fallback)
// Static data removed

import { useAuth } from "@/contexts/AuthContext";

const Blog = () => {
  const { data: fetchedBlogs, isLoading } = useBlogs();
  const { user } = useAuth();

  // Use fetched blogs if available, otherwise fall back to static data
  // Use fetched blogs only
  const posts = fetchedBlogs && fetchedBlogs.length > 0
    ? fetchedBlogs.map(post => ({
      ...post,
      // Map database fields to UI expected fields if they differ, or utilize existing ones
      readTime: post.read_time || "5 min read",
      image: post.image_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"
    }))
    : [];

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

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
                <span className="text-accent">Insights &</span> Stories
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Explore the latest trends in construction, project stories, and expert insights from the Brixx Space team.
              </p>
            </ScrollReveal>
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
                <Link
                  to={user ? `/blog/${featuredPost.slug}` : "/auth"}
                  state={!user ? { from: { pathname: `/blog/${featuredPost.slug}` } } : undefined}
                >
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
                  <Link
                    to={user ? `/blog/${post.slug}` : "/auth"}
                    state={!user ? { from: { pathname: `/blog/${post.slug}` } } : undefined}
                  >
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
