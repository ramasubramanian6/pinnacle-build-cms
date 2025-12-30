import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

// Static blog data (matches Blog.tsx)
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
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop",
        content: `
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">The construction industry in Tamil Nadu is experiencing a remarkable transformation as sustainability becomes not just a buzzword, but a fundamental requirement for modern building practices. This shift represents a crucial evolution in how we approach construction, balancing economic growth with environmental responsibility.</p>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">The Green Building Revolution</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">Tamil Nadu has emerged as a leader in sustainable construction practices in South India. With increasing awareness about climate change and environmental degradation, builders and developers are adopting green building techniques that minimize environmental impact while maximizing energy efficiency.</p>

      <h3 style="color: #1e293b; font-size: 1.5rem; font-weight: 700; margin-top: 2rem; margin-bottom: 1rem;">Key Sustainable Practices</h3>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1.5rem 0; color: #334155;">
        <li style="margin-bottom: 0.5rem; line-height: 1.75;"><strong style="color: #0f172a; font-weight: 600;">Rainwater Harvesting:</strong> Mandatory in most urban areas, this practice helps conserve water and recharge groundwater.</li>
        <li style="margin-bottom: 0.5rem; line-height: 1.75;"><strong style="color: #0f172a; font-weight: 600;">Solar Energy Integration:</strong> Rooftop solar panels are becoming standard in new constructions.</li>
        <li style="margin-bottom: 0.5rem; line-height: 1.75;"><strong style="color: #0f172a; font-weight: 600;">Waste Management:</strong> Construction waste recycling and proper disposal methods are being implemented.</li>
        <li style="margin-bottom: 0.5rem; line-height: 1.75;"><strong style="color: #0f172a; font-weight: 600;">Green Materials:</strong> Use of eco-friendly materials like fly ash bricks, recycled steel, and sustainable wood.</li>
      </ul>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">Economic Benefits</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">Sustainable construction isn't just good for the environment—it makes economic sense too. Buildings designed with sustainability in mind typically see:</p>
      <ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1.5rem 0; color: #334155;">
        <li style="margin-bottom: 0.5rem; line-height: 1.75;">30-40% reduction in energy costs</li>
        <li style="margin-bottom: 0.5rem; line-height: 1.75;">Lower maintenance expenses</li>
        <li style="margin-bottom: 0.5rem; line-height: 1.75;">Higher property values</li>
        <li style="margin-bottom: 0.5rem; line-height: 1.75;">Improved occupant health and productivity</li>
      </ul>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">The Road Ahead</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">As we look to the future, sustainable construction in Tamil Nadu will continue to evolve. Emerging technologies like Building Information Modeling (BIM), IoT-enabled smart buildings, and advanced materials will further enhance our ability to build sustainably.</p>

      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">At Brixx Space, we're committed to leading this transformation, ensuring that every project we undertake meets the highest standards of sustainability while delivering exceptional value to our clients.</p>
    `
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
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=600&fit=crop",
        content: `
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">The commercial real estate landscape in Tamil Nadu is evolving rapidly. Here are the five key trends shaping the industry in 2025.</p>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">1. Flexible Workspaces</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">The demand for flexible, adaptable office spaces continues to grow as hybrid work models become the norm.</p>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">2. Technology Integration</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">Smart buildings with IoT sensors, automated systems, and data analytics are becoming standard.</p>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">3. Sustainability Focus</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">Green certifications and energy-efficient designs are no longer optional but expected.</p>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">4. Mixed-Use Developments</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">Combining residential, commercial, and retail spaces in single developments is gaining popularity.</p>

      <h2 style="color: #0f172a; font-size: 1.875rem; font-weight: 700; margin-top: 3rem; margin-bottom: 1.5rem;">5. Location Strategy</h2>
      <p style="color: #334155; line-height: 1.75; margin-bottom: 1.5rem;">Proximity to transportation hubs and amenities is more important than ever.</p>
    `
    }
];

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/auth", { state: { from: `/blog/${slug}` } });
        }
    }, [user, navigate, slug]);

    if (!user) return null;

    if (!post) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">Blog Post Not Found</h1>
                    <Link to="/blog">
                        <Button>Back to Blog</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    return (
        <>
            <Helmet>
                <title>{post.title} | Brixx Space Blog</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>
            <Layout>
                {/* Hero Image */}
                <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-[#0A0A0A]">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />

                    {/* Breadcrumb */}
                    <div className="absolute top-24 left-0 right-0 z-10">
                        <div className="container mx-auto px-6">
                            <Link to="/blog">
                                <Button variant="ghost" className="text-white hover:text-[#FFB800] hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Blog
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 pb-12">
                        <div className="container mx-auto px-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="max-w-4xl"
                            >
                                <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FFA500] text-black text-sm font-bold mb-4">
                                    {post.category}
                                </span>
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                    {post.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6 text-white/80">
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[#FFB800]" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-[#FFB800]" />
                                        {post.readTime}
                                    </span>
                                    <span>By {post.author}</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Article Content */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                                {/* Main Content - Now with inline styles for guaranteed visibility */}
                                <motion.article
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-lg"
                                    dangerouslySetInnerHTML={{ __html: post.content }}
                                />

                                {/* Sidebar */}
                                <aside className="space-y-8">
                                    {/* Share */}
                                    <div className="sticky top-24">
                                        <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200">
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <Share2 className="w-5 h-5 text-[#FFB800]" />
                                                Share Article
                                            </h3>
                                            <div className="flex flex-col gap-3">
                                                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-slate-700 hover:bg-[#1877F2] hover:text-white transition-all border border-slate-200 hover:border-[#1877F2] group">
                                                    <Facebook className="w-5 h-5" />
                                                    <span className="font-semibold">Facebook</span>
                                                </button>
                                                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-slate-700 hover:bg-[#1DA1F2] hover:text-white transition-all border border-slate-200 hover:border-[#1DA1F2] group">
                                                    <Twitter className="w-5 h-5" />
                                                    <span className="font-semibold">Twitter</span>
                                                </button>
                                                <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white text-slate-700 hover:bg-[#0A66C2] hover:text-white transition-all border border-slate-200 hover:border-[#0A66C2] group">
                                                    <Linkedin className="w-5 h-5" />
                                                    <span className="font-semibold">LinkedIn</span>
                                                </button>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FFA500] text-center">
                                            <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">
                                                Start Your Project
                                            </h3>
                                            <p className="text-slate-800 mb-4">
                                                Ready to build something amazing?
                                            </p>
                                            <Link to="/contact">
                                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                                    Contact Us
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Posts */}
                <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-amber-50/30">
                    <div className="container mx-auto px-6">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-12 text-center">
                            Related Articles
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#FFB800]/50 hover:shadow-2xl hover:shadow-[#FFB800]/10 transition-all duration-500"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relatedPost.image}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-[#FFB800] text-sm font-semibold uppercase tracking-wider">
                                                {relatedPost.category}
                                            </span>
                                            <h3 className="font-display text-xl font-bold text-slate-900 mt-2 mb-3 group-hover:text-[#FFB800] transition-colors line-clamp-2">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm line-clamp-2">
                                                {relatedPost.excerpt}
                                            </p>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default BlogPost;
