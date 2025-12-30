import { useRef, useEffect } from "react";
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
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProject } from "@/hooks/useProjects";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";
import projectOngoing from "@/assets/project-ongoing.jpg";

// Duplicate of fallback data for static lookup if DB fails or is empty
// Ideally this should be shared or imported, but defining here for robustness
const fallbackImages = [projectResidential, projectCommercial, projectOngoing];

const staticProjects: any[] = [
    {
        id: "1",
        title: "Luxury Villa Complex",
        description: "Modern luxury residential complex with state-of-the-art amenities and sustainable design. This sprawling estate features 12 exclusive villas, each with private gardens and swimming pools. The architecture blends contemporary aesthetics with traditional climate-responsive design.",
        location: "Tirunelveli, TN",
        category: "Residential",
        status: "ongoing",
        image_url: projectResidential,
        total_units: 12,
        sold_units: 8,
        start_date: "2024-01-01",
        estimated_completion: "2025-06-30",
        amenities: ["Swimming Pool", "Clubhouse", "24/7 Security", "Solar Power", "Landscaped Gardens"],
        progress: 65
    },
    {
        id: "2",
        title: "Tech Park One",
        description: "Premium commercial space designed for modern IT and business operations. Located in the emerging tech corridor of Madurai, this project offers Grade A office spaces with world-class infrastructure.",
        location: "Madurai, TN",
        category: "Commercial",
        status: "ongoing",
        image_url: projectCommercial,
        total_units: 45,
        sold_units: 20,
        start_date: "2023-11-15",
        estimated_completion: "2025-12-31",
        amenities: ["High-speed Internet", "Food Court", "Conference Hills", "Ample Parking"],
        progress: 40
    },
    {
        id: "3",
        title: "City Center Mall",
        description: "A landmark shopping and entertainment destination in the heart of the city. Featuring over 100 retail outlets, a multiplex cinema, and a diverse food court.",
        location: "Tirunelveli, TN",
        category: "Commercial",
        status: "completed",
        image_url: projectOngoing,
        total_units: 120,
        sold_units: 115,
        start_date: "2022-03-01",
        estimated_completion: "2024-01-15",
        amenities: ["Multiplex", "Gaming Zone", "Food Court", "Hypermarket"],
        progress: 100
    },
    {
        id: "4",
        title: "Riverside Apartments",
        description: "Scenic riverside residential apartments offering peaceful living with city connectivity. These apartments offer panoramic views of the Thamirabarani river.",
        location: "Tirunelveli, TN",
        category: "Residential",
        status: "completed",
        image_url: projectResidential,
        total_units: 36,
        sold_units: 36,
        start_date: "2022-06-01",
        estimated_completion: "2023-12-01",
        amenities: ["River View", "Walking Track", "Children's Play Area", "Gym"],
        progress: 100
    }
];

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect if not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/auth", { state: { from: `/projects/${id}` } });
        }
    }, [user, navigate, id]);

    const { data: fetchedProject, isLoading } = useProject(id || "");

    // Fallback logic
    const project = fetchedProject || staticProjects.find(p => p.id === id);

    if (!user) return null; // Will redirect

    if (isLoading && !project) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-24 text-center">
                    <p className="text-slate-600">Loading project details...</p>
                </div>
            </Layout>
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
                                                <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                                    <Phone className="w-4 h-4 mr-2" />
                                                    Call Now
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
                                            <Button variant="outline" className="w-full">
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
