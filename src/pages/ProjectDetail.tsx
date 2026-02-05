import { useRef, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    MapPin,
    Calendar,
    Maximize2,
    CheckCircle2,
    ArrowLeft,
    Building2,
    Phone,
    Mail,
    Share2
} from "lucide-react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/hooks/useProjects";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";

const fallbackImages = ["/placeholder.svg"];

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Protect Route
    useEffect(() => {
        if (!user) {
            navigate("/auth", { state: { from: location }, replace: true });
        }
    }, [user, navigate, location]);

    // Check if already interested
    const [interestSent, setInterestSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);


    const { data: fetchedProject, isLoading } = useProject(id || "");

    // Fallback logic removed
    const project = fetchedProject;

    useEffect(() => {
        if (user && project) {
            const checkInterest = async () => {
                const { data } = await api.get('/contacts/user');
                const hasInterest = data.some((c: any) => c.subject === `Project Interest: ${project.title}`);
                if (hasInterest) setInterestSent(true);
            };
            checkInterest();
        }
    }, [user, project]);

    const handleInterest = async () => {
        if (!user) {
            toast.error("Please login to register interest");
            return;
        }
        if (!project) return;
        setSubmitting(true);
        try {
            await api.post('/contacts', {
                name: user.user_metadata?.full_name || user.fullName || 'User',
                email: user.email || '',
                phone: user.phone || null,
                subject: `Project Interest: ${project.title}`,
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

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LuxuryLoader />
            </div>
        );
    }

    if (!project) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">Project Not Found</h1>
                    <Link to="/projects">
                        <Button>Back to Projects</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const projectImage = project.image_url || fallbackImages[0];
    const projectYear = project.estimated_completion ? new Date(project.estimated_completion).getFullYear() : 'N/A';

    return (
        <>
            <Helmet>
                <title>{project.title} | Brixx Space Projects</title>
                <meta name="description" content={project.description || `Details about ${project.title}`} />
            </Helmet>
            <Layout>
                {/* Hero Image */}
                <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-[#0A0A0A]">
                    <img
                        src={projectImage}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />

                    {/* Back Button */}
                    <div className="absolute top-24 left-0 right-0 z-10">
                        <div className="container mx-auto px-6">
                            <Link to="/projects">
                                <Button variant="ghost" className="text-white hover:text-[#FFB800] hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Projects
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
                                <div className="flex gap-2 mb-4">
                                    <span className="px-3 py-1 bg-accent text-primary text-sm font-semibold uppercase tracking-wider rounded-full">
                                        {project.category}
                                    </span>
                                    <span className={`px-3 py-1 text-sm font-semibold uppercase tracking-wider rounded-full ${project.status === "completed" ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                    {project.title}
                                </h1>
                                <div className="flex items-center gap-2 text-white/80 text-lg">
                                    <MapPin className="w-5 h-5 text-[#FFB800]" />
                                    {project.location}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                                <div>
                                    {/* Stats Grid */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-200 mb-8"
                                    >
                                        <div className="text-center">
                                            <Maximize2 className="w-6 h-6 text-accent mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-slate-900">{project.total_units || 'N/A'}</p>
                                            <p className="text-sm text-slate-600">Total Units</p>
                                        </div>
                                        <div className="text-center">
                                            <CheckCircle2 className="w-6 h-6 text-accent mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-slate-900">{project.sold_units !== null ? project.sold_units : 'N/A'}</p>
                                            <p className="text-sm text-slate-600">Sold Units</p>
                                        </div>
                                        <div className="text-center">
                                            <Calendar className="w-6 h-6 text-accent mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-slate-900">{projectYear}</p>
                                            <p className="text-sm text-slate-600">Completion</p>
                                        </div>
                                        <div className="text-center">
                                            <Building2 className="w-6 h-6 text-accent mx-auto mb-2" />
                                            <p className="text-2xl font-bold text-slate-900">{project.progress ? `${project.progress}%` : 'N/A'}</p>
                                            <p className="text-sm text-slate-600">Progress</p>
                                        </div>
                                    </motion.div>

                                    {/* Description */}
                                    <div className="mb-8">
                                        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">About Project</h2>
                                        <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-line">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Gallery */}
                                    {project.gallery && project.gallery.length > 0 && (
                                        <div className="mb-12">
                                            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Gallery</h2>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                {project.gallery.map((img, idx) => (
                                                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                                                        <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Amenities */}
                                    {project.amenities && project.amenities.length > 0 && (
                                        <div>
                                            <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">Amenities</h2>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {project.amenities.map((amenity: string, idx: number) => (
                                                    <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
                                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                                        <span className="text-slate-700">{amenity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Sidebar */}
                                <aside>
                                    <div className="sticky top-24 space-y-6">
                                        {/* Contact Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="p-6 rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FFA500]"
                                        >
                                            <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">
                                                Interested?
                                            </h3>
                                            <p className="text-slate-800 mb-6">
                                                Contact us for brochures, floor plans, and pricing details.
                                            </p>
                                            <div className="space-y-3">
                                                <Button
                                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                                                    onClick={handleInterest}
                                                    disabled={interestSent || submitting}
                                                >
                                                    {interestSent ? (
                                                        <>
                                                            <CheckCircle2 className="w-4 h-4 mr-2" />
                                                            Interest Sent
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Phone className="w-4 h-4 mr-2" />
                                                            {submitting ? "Sending..." : "I'm Interested"}
                                                        </>
                                                    )}
                                                </Button>
                                                <Link to="/contact">
                                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Enquiry
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="p-6 rounded-3xl bg-slate-50 border border-slate-200"
                                        >
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <Share2 className="w-5 h-5 text-accent" />
                                                Share Project
                                            </h3>
                                            <Button
                                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white border-none"
                                                onClick={() => {
                                                    const text = `Check out this project: ${project.title}\n${window.location.href}`;
                                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                                }}
                                            >
                                                Share via WhatsApp
                                            </Button>
                                        </motion.div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default ProjectDetail;
