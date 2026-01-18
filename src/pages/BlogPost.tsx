import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useBlog, useBlogs } from "@/hooks/useBlogs";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data: post, isLoading } = useBlog(slug || "");
    const { data: allPosts } = useBlogs();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LuxuryLoader />
            </div>
        );
    }

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

    // Map fields if necessary (handling differences between API and previous static data)
    const displayImage = post.image_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=600&fit=crop";
    const displayReadTime = post.read_time || "5 min read";

    return (
        <>
            <Helmet>
                <title>{post.title} | Brixx Space Blog</title>
                <meta name="description" content={post.excerpt || ""} />
            </Helmet>
            <Layout>
                {/* Hero Image */}
                <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-[#0A0A0A]">
                    <img
                        src={displayImage}
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
                                    {post.category || "General"}
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
                                        {displayReadTime}
                                    </span>
                                    <span>By {post.author || "Brixx Space Team"}</span>
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
                                {/* Main Content */}
                                <motion.article
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-lg prose prose-lg prose-slate max-w-none hover:prose-a:text-[#FFB800] prose-a:transition-colors prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-strong:text-slate-900"
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {post.content || ""}
                                    </ReactMarkdown>
                                </motion.article>

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
                            {allPosts?.filter(p => p.id !== post.id).slice(0, 3).map((relatedPost) => (
                                <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#FFB800]/50 hover:shadow-2xl hover:shadow-[#FFB800]/10 transition-all duration-500"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relatedPost.image_url || "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop"}
                                                alt={relatedPost.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-[#FFB800] text-sm font-semibold uppercase tracking-wider">
                                                {relatedPost.category || "General"}
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
