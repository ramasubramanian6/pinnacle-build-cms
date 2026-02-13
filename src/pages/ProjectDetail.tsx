import { useRef, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    MapPin,
    Calendar,
    ArrowLeft,
    Building2,
    Phone,
    Mail,
    Share2,
    User,
    Ruler,
    IndianRupee,
    PlayCircle,
    Download,
    Lock,
    Clock,
    CheckCircle2,
    Compass,
    Home,
    Car,
    Layers
} from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/hooks/useProjects";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LockedContent } from "@/components/premium/LockedContent";

const fallbackImages = ["/placeholder.svg"];

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // -- Existing Logic for Auth Redirect (Optional: user removed this req, but keeping for safety if needed) --
    // useEffect(() => {
    //     if (!user) {
    //         navigate("/auth", { state: { from: location }, replace: true });
    //     }
    // }, [user, navigate, location]);

    // -- Interest Logic --
    const [interestSent, setInterestSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneInput, setPhoneInput] = useState("");
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const { updateProfile } = useAuth();

    const { data: fetchedProject, isLoading } = useProject(id || "");

    useEffect(() => {
        if (user && fetchedProject) {
            const checkInterest = async () => {
                try {
                    const { data } = await api.get('/contacts/user');
                    const hasInterest = data.some((c: any) => c.subject === `Project Interest: ${fetchedProject.title}`);
                    if (hasInterest) setInterestSent(true);
                } catch (e) {
                    console.error("Failed to check interest", e);
                }
            };
            checkInterest();
        }
    }, [user, fetchedProject]);

    const handleInterest = async () => {
        if (!user) {
            toast.error("Please login to register interest");
            navigate("/auth", { state: { from: location } });
            return;
        }
        if (!fetchedProject) return;

        if (!user.phone) {
            setShowPhoneModal(true);
            return;
        }
        await submitInterest();
    };

    const submitInterest = async () => {
        if (!user || !fetchedProject) return;
        setSubmitting(true);
        try {
            await api.post('/contacts', {
                name: user.user_metadata?.full_name || user.fullName || 'User',
                email: user.email || '',
                phone: user.phone || null,
                subject: `Project Interest: ${fetchedProject.title}`,
                message: `User has expressed interest in this project.`,
            });
            setInterestSent(true);
            toast.success("Interest registered! Our team will contact you soon.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to register interest. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handlePhoneSubmit = async () => {
        if (!phoneInput.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        try {
            setSubmitting(true);
            await updateProfile({ phone: phoneInput });
            setShowPhoneModal(false);
            await submitInterest();
        } catch (error) {
            console.error(error);
            setSubmitting(false);
        }
    };

    const handleEbookDownload = () => {
        if (!user) {
            navigate('/auth', { state: { from: location } });
            return;
        }
        if (!ebook?.url) {
            toast.error("eBook download URL not available");
            return;
        }

        // Open eBook URL directly
        window.open(ebook.url, '_blank');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LuxuryLoader />
            </div>
        );
    }

    if (!fetchedProject) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">Project Not Found</h1>
                    <Link to="/projects"><Button>Back to Projects</Button></Link>
                </div>
            </Layout>
        );
    }

    const project = fetchedProject;
    const projectImage = project.image_url || fallbackImages[0];
    const isPremiumUser = !!user;

    // Helper for safe access
    const extInfo = project.extended_info || {};
    const team = project.team || {};
    const ebook = project.ebook; // can be undefined
    const episodes = project.episodes || [];
    const products = project.products || [];

    // -- Video Modal Logic --

    const handlePlayVideo = (url: string, isPremium: boolean) => {
        if (isPremium && !isPremiumUser) {
            toast.error("This is a premium episode. Please login to watch.");
            navigate("/auth", { state: { from: location } });
            return;
        }
        setSelectedVideo(url);
    };

    const isDirectVideo = (url: string) => {
        return url.includes("cloudinary.com") || url.endsWith(".mp4") || url.endsWith(".webm");
    };

    const getEmbedUrl = (url: string) => {
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            const videoId = url.split("v=")[1]?.split("&")[0] || url.split("/").pop();
            return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
        if (url.includes("vimeo.com")) {
            const videoId = url.split("/").pop();
            return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
        }
        return url;
    };

    return (
        <>
            <Helmet>
                <title>{project.title} | Brixx Space Projects</title>
                <meta name="description" content={project.description || `Details about ${project.title}`} />
            </Helmet>
            <Layout>
                {/* --- 1. Hero Section (Full Height) --- */}
                <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">
                    <img
                        src={projectImage}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                    {/* Navbar Spacer */}
                    <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />

                    <div className="absolute bottom-0 left-0 right-0 pb-16 pt-32 bg-gradient-to-t from-black to-transparent">
                        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-end">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-accent tracking-widest uppercase text-sm font-semibold">
                                        {((project.projectCategory as any)?.title || project.category)}
                                        {((project.projectSubcategory as any)?.title && ` • ${(project.projectSubcategory as any).title}`)}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-white/50" />
                                    <span className="text-white/80 uppercase text-sm tracking-wider">{project.location}</span>
                                </div>
                                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                                    {project.title}
                                </h1>
                                {project.featuresDescription && (
                                    <p className="text-xl text-white/80 max-w-2xl mb-8 font-light leading-relaxed">
                                        {project.featuresDescription}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-4 mt-8">
                                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 gap-2 rounded-full px-8 text-base font-semibold">
                                        <PlayCircle className="w-5 h-5" />
                                        Play Full Video
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-black gap-2 rounded-full px-8 text-base font-semibold bg-transparent">
                                        <Download className="w-5 h-5" />
                                        Download eBook
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* --- 2. Main Content Grid --- */}
                <section className="py-20 bg-background border-t border-border/10">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 xl:gap-24">

                            {/* --- LEFT COLUMN --- */}
                            <div className="space-y-16">

                                {/* Episodes Section */}
                                {episodes.length > 0 && (
                                    <section>
                                        <div className="flex items-center justify-between mb-8">
                                            <h2 className="font-display text-3xl font-bold text-foreground">Episodes ({episodes.length})</h2>
                                            <span className="text-sm text-muted-foreground">Watch unique elements of this project</span>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {episodes.map((ep, idx) => (
                                                <div key={idx} className="group cursor-pointer" onClick={() => handlePlayVideo(ep.video_url, ep.isPremium || false)}>
                                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-3 border border-border/50">
                                                        {ep.thumbnail ? (
                                                            <img src={ep.thumbnail} alt={ep.title} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                                                                <PlayCircle className="w-12 h-12 text-white opacity-90 group-hover:scale-110 transition-transform" />
                                                            </div>
                                                        )}
                                                        {ep.isPremium && !isPremiumUser && (
                                                            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                                                                <Lock className="w-3 h-3 text-accent" /> Premium
                                                            </div>
                                                        )}
                                                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                                            {ep.duration}
                                                        </div>
                                                    </div>
                                                    <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">{ep.title}</h3>
                                                    {ep.isPremium && !isPremiumUser ? (
                                                        <span className="text-xs text-accent">Login to watch</span>
                                                    ) : (
                                                        <span className="text-xs text-muted-foreground">Watch Now</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* About Project */}
                                <section className="prose prose-lg prose-slate dark:prose-invert max-w-none">
                                    <h2 className="font-display text-3xl font-bold text-foreground not-prose mb-6">About Project</h2>
                                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {project.content || project.description}
                                    </div>

                                </section>

                                {/* Process Section */}
                                {project.process && project.process.length > 0 && (
                                    <section>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-8">Our Process</h2>
                                        <div className="space-y-8 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-border/50">
                                            {project.process.map((step, idx) => (
                                                <div key={idx} className="relative flex gap-8">
                                                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-background bg-accent text-accent-foreground font-bold shadow-lg">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="pt-2">
                                                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Benefits Section */}
                                {project.benefits && project.benefits.length > 0 && (
                                    <section>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-8">Why Choose This?</h2>
                                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {project.benefits.map((benefit, idx) => (
                                                <div key={idx} className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-border/50 hover:border-accent/50 transition-colors group">
                                                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-black transition-colors">
                                                        <CheckCircle2 className="w-6 h-6 text-accent group-hover:text-black transition-colors" />
                                                    </div>
                                                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* FAQs Section */}
                                {project.faqs && project.faqs.length > 0 && (
                                    <section>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
                                        <div className="space-y-4">
                                            {project.faqs.map((faq, idx) => (
                                                <div key={idx} className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                                                    <h3 className="font-bold text-lg mb-2 flex items-start gap-3">
                                                        <span className="text-accent">Q.</span> {faq.question}
                                                    </h3>
                                                    <p className="text-muted-foreground pl-8">{faq.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Detailed Amenities */}
                                {project.amenities && project.amenities.length > 0 && (
                                    <section>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-8">Detailed Amenities</h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {project.amenities.map((amenity, idx) => (
                                                <div key={idx} className="flex items-start p-4 bg-muted/30 rounded-lg border border-border/50">
                                                    <CheckCircle2 className="w-5 h-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                                                    <span className="font-medium text-foreground">{amenity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Gallery */}
                                {project.gallery && project.gallery.length > 0 && (
                                    <section>
                                        <h2 className="font-display text-3xl font-bold text-foreground mb-8">Gallery</h2>
                                        <div className="columns-1 md:columns-2 gap-6 space-y-6">
                                            {project.gallery.map((img, idx) => (
                                                <div key={idx} className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all break-inside-avoid">
                                                    <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* eBook Section */}
                                {ebook && (
                                    <section className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-border">
                                        <div className="flex flex-col md:flex-row gap-8 items-center">
                                            <div className="w-full md:w-1/3 aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
                                                {ebook.image ? (
                                                    <img src={ebook.image} alt={ebook.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-muted-foreground text-sm font-medium">eBook Preview</span>
                                                )}
                                            </div>
                                            <div className="flex-1 space-y-6">
                                                <div>
                                                    <h2 className="font-display text-2xl font-bold text-foreground mb-2">{ebook.title}</h2>
                                                    <p className="text-muted-foreground">Download full eBook with all plans, drawings, photos, materials info and editorial text.</p>
                                                </div>
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                    <div className="p-3 bg-background rounded-lg border border-border text-center">
                                                        <div className="text-2xl font-bold text-foreground">{ebook.pages}</div>
                                                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Pages</div>
                                                    </div>
                                                    <div className="p-3 bg-background rounded-lg border border-border text-center">
                                                        <div className="text-2xl font-bold text-foreground">{ebook.images}</div>
                                                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Images</div>
                                                    </div>
                                                    <div className="p-3 bg-background rounded-lg border border-border text-center">
                                                        <div className="text-2xl font-bold text-foreground">{ebook.drawings}</div>
                                                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Drawings</div>
                                                    </div>
                                                    <div className="p-3 bg-background rounded-lg border border-border text-center">
                                                        <div className="text-lg font-bold text-foreground pt-1">{ebook.size}</div>
                                                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Size</div>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="w-full sm:w-auto bg-accent text-primary font-bold px-8 py-6 rounded-xl hover:bg-accent/90"
                                                    onClick={handleEbookDownload}
                                                >
                                                    {user ? (
                                                        <>
                                                            <Download className="w-5 h-5 mr-3" /> Download PDF eBook
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Lock className="w-4 h-4 mr-3" /> Login to Download
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </section>
                                )}

                                {/* Products Section */}
                                {products.length > 0 && (
                                    <section>
                                        <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                                            <h2 className="font-display text-2xl font-bold text-foreground">Products Used</h2>
                                            {!isPremiumUser && <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">For Members Only</span>}
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                            {products.map((prod, idx) => (
                                                <div key={idx} className="flex justify-between items-baseline border-b border-border/50 pb-2">
                                                    <span className="text-muted-foreground font-medium">{prod.category}:</span>
                                                    <LockedContent
                                                        text={prod.brand}
                                                        isLocked={!isPremiumUser && prod.isPremium}
                                                        className="font-semibold text-foreground text-right"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        {!isPremiumUser && (
                                            <div className="mt-8 text-center bg-slate-50 dark:bg-slate-900 rounded-xl p-6">
                                                <p className="text-muted-foreground mb-4">Join our community to view complete material specifications and brands used in this project.</p>
                                                <Link to="/auth"><Button variant="outline">Login to View Details</Button></Link>
                                            </div>
                                        )}
                                    </section>
                                )}

                            </div>

                            {/* --- RIGHT COLUMN (Sticky) --- */}
                            <aside className="relative">
                                <div className="sticky top-24 space-y-10">

                                    {/* Architecture Team */}
                                    <div className="space-y-6">
                                        <h3 className="font-display text-xl font-bold text-foreground border-b border-border pb-2">Architecture Team</h3>
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                                {team.architect_image ? (
                                                    <img src={team.architect_image} alt="Architect" className="w-full h-full object-cover" />
                                                ) : (
                                                    <User className="w-full h-full p-4 text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-lg">{team.principalArchitect || project.architect || "Principal Architect"}</div>
                                                <div className="text-sm text-muted-foreground">{team.firm || "Firm Name"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Fact File */}
                                    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 space-y-6 border border-border">
                                        <h3 className="font-display text-xl font-bold text-foreground">Project Info</h3>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Location</span>
                                                <span className="font-medium text-foreground text-right">{project.location}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Plot Area</span>
                                                <span className="font-medium text-foreground text-right">{extInfo.plotArea || "N/A"}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Built-up Area</span>
                                                <span className="font-medium text-foreground text-right">{project.area ? `${project.area} sq ft` : "N/A"}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Facing</span>
                                                <span className="font-medium text-foreground text-right">{extInfo.facing || "N/A"}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Vastu</span>
                                                <span className="font-medium text-foreground text-right">{extInfo.vastu || "No"}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">No. of Rooms</span>
                                                <span className="font-medium text-foreground text-right">{extInfo.rooms || 4}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">No. of Car Parking</span>
                                                <span className="font-medium text-foreground text-right">{extInfo.parking || 2}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">No. of Floors</span>
                                                <span className="font-medium text-foreground text-right">{extInfo.floors || 2}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Start Year</span>
                                                <span className="font-medium text-foreground text-right">{project.start_date ? new Date(project.start_date).getFullYear().toString() : "2022"}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm">
                                                <span className="text-muted-foreground">Completion</span>
                                                <span className="font-medium text-foreground text-right">{project.estimated_completion ? new Date(project.estimated_completion).getFullYear().toString() : "2024"}</span>
                                            </div>
                                            <div className="grid grid-cols-[140px_1fr] gap-4 text-sm border-t border-border pt-4 mt-2">
                                                <span className="text-muted-foreground font-semibold">Project Cost</span>
                                                <span className="font-medium text-foreground text-right">
                                                    <LockedContent
                                                        text={project.cost || "Contact for price"}
                                                        isLocked={!isPremiumUser}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {!isPremiumUser && (
                                        <div className="text-xs text-center text-muted-foreground bg-accent/10 p-2 rounded">
                                            Full cost details available for members
                                        </div>
                                    )}

                                    {/* CTAs */}
                                    <div className="space-y-4">
                                        <Button
                                            className="w-full bg-accent hover:bg-gold-dark text-black font-bold h-12 text-base shadow-gold"
                                            onClick={handleInterest}
                                            disabled={interestSent || submitting}
                                        >
                                            {interestSent ? <span className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-2" /> Interest Registered</span> : "I'm Interested in this Project"}
                                        </Button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </Layout>


            {/* Phone Modal */}
            <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Contact Number Required</DialogTitle>
                        <DialogDescription>
                            Please provide your phone number so our team can reach you regarding this project.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="phone" className="sr-only">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="+91 98765 43210"
                                value={phoneInput}
                                onChange={(e) => setPhoneInput(e.target.value)}
                                type="tel"
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button type="button" variant="secondary" onClick={() => setShowPhoneModal(false)}>Cancel</Button>
                        <Button type="button" onClick={handlePhoneSubmit} disabled={submitting}>{submitting ? "Saving..." : "Submit"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Video Player Modal */}
            <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-none">
                    <div className="relative aspect-video w-full">
                        {selectedVideo && (isDirectVideo(selectedVideo) ? (
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                className="w-full h-full"
                                controlsList="nodownload"
                            />
                        ) : (
                            <iframe
                                src={getEmbedUrl(selectedVideo)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ProjectDetail;
