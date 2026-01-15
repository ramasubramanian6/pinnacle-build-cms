import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
    MapPin,
    Maximize2,
    Phone,
    Mail,
    IndianRupee,
    Bed,
    Bath,
    Calendar,
    CheckCircle2,
    ArrowLeft,
    Share2
} from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useProperty } from "@/hooks/useProperties";
import projectResidential from "@/assets/project-residential.jpg";
import projectCommercial from "@/assets/project-commercial.jpg";

const fallbackImages = [projectResidential, projectCommercial];

const PropertyDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!user) {
            navigate("/auth", { state: { from: `/properties/${id}` } });
        }
    }, [user, navigate, id]);

    // Fetch property details
    const { data: property, isLoading } = useProperty(id || "");

    if (!user) {
        return null; // Will redirect
    }

    if (isLoading) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-24 text-center">
                    <p className="text-slate-600">Loading property details...</p>
                </div>
            </Layout>
        );
    }

    if (!property) {
        return (
            <Layout>
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-slate-900">Property Not Found</h1>
                    <Link to="/properties">
                        <Button>Back to Properties</Button>
                    </Link>
                </div>
            </Layout>
        );
    }

    const getStatusColor = (status: string) => {
        const statusLower = status.toLowerCase();
        switch (statusLower) {
            case "available":
                return "bg-green-500 text-white";
            case "sold":
                return "bg-red-500 text-white";
            case "upcoming":
                return "bg-blue-500 text-white";
            default:
                return "bg-slate-500 text-white";
        }
    };

    const propertyImage = property.image_url || fallbackImages[0];
    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(property.price);

    return (
        <>
            <Helmet>
                <title>{property.title} | Brixx Space Properties</title>
                <meta name="description" content={property.description || `${property.title} - Premium property in ${property.location}`} />
            </Helmet>
            <Layout>
                {/* Hero Image */}
                <section className="relative h-[60vh] md:h-[70vh] overflow-hidden bg-[#0A0A0A]">
                    <img
                        src={propertyImage}
                        alt={property.title}
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />

                    {/* Back Button */}
                    <div className="absolute top-24 left-0 right-0 z-10">
                        <div className="container mx-auto px-6">
                            <Link to="/properties">
                                <Button variant="ghost" className="text-white hover:text-[#FFB800] hover:bg-white/10">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to Properties
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
                                <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 ${getStatusColor(property.status)}`}>
                                    {property.status}
                                </span>
                                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2 text-white/80 text-lg">
                                    <MapPin className="w-5 h-5 text-[#FFB800]" />
                                    {property.location}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Property Details */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                                {/* Main Content */}
                                <div>
                                    {/* Price & Key Info */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="mb-8"
                                    >
                                        <div className="flex items-center gap-2 mb-6">
                                            <IndianRupee className="w-8 h-8 text-[#FFB800]" />
                                            <span className="text-4xl font-bold text-slate-900">{formattedPrice}</span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200">
                                            <div className="text-center">
                                                <Maximize2 className="w-6 h-6 text-[#FFB800] mx-auto mb-2" />
                                                <p className="text-2xl font-bold text-slate-900">{property.area_sqft}</p>
                                                <p className="text-sm text-slate-600">Sq. Ft.</p>
                                            </div>
                                            {property.bedrooms && (
                                                <div className="text-center">
                                                    <Bed className="w-6 h-6 text-[#FFB800] mx-auto mb-2" />
                                                    <p className="text-2xl font-bold text-slate-900">{property.bedrooms}</p>
                                                    <p className="text-sm text-slate-600">Bedrooms</p>
                                                </div>
                                            )}
                                            {property.bathrooms && (
                                                <div className="text-center">
                                                    <Bath className="w-6 h-6 text-[#FFB800] mx-auto mb-2" />
                                                    <p className="text-2xl font-bold text-slate-900">{property.bathrooms}</p>
                                                    <p className="text-sm text-slate-600">Bathrooms</p>
                                                </div>
                                            )}
                                            <div className="text-center">
                                                <Calendar className="w-6 h-6 text-[#FFB800] mx-auto mb-2" />
                                                <p className="text-2xl font-bold text-slate-900">{new Date(property.created_at).getFullYear()}</p>
                                                <p className="text-sm text-slate-600">Listed</p>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Description */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="mb-8"
                                    >
                                        <h2 className="font-display text-3xl font-bold text-slate-900 mb-4">
                                            About This Property
                                        </h2>
                                        <p className="text-slate-700 leading-relaxed text-lg">
                                            {property.description || `This premium ${property.title.toLowerCase()} is located in the heart of ${property.location}. Featuring ${property.area_sqft} square feet of thoughtfully designed space, this property offers modern amenities and exceptional quality construction by Brixx Space.`}
                                        </p>
                                    </motion.div>

                                    {/* Features */}
                                    {/* Features */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.3 }}
                                        className="mb-8"
                                    >
                                        <h2 className="font-display text-3xl font-bold text-slate-900 mb-6">
                                            Key Features
                                        </h2>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {[
                                                "Premium Construction Quality",
                                                "Modern Architecture",
                                                "Prime Location",
                                                "Excellent Connectivity",
                                                "Vastu Compliant",
                                                "Gated Community",
                                                "24/7 Security",
                                                "Power Backup"
                                            ].map((feature, index) => (
                                                <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200">
                                                    <CheckCircle2 className="w-5 h-5 text-[#FFB800] flex-shrink-0" />
                                                    <span className="text-slate-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* Land Details & Approvals */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        className="grid md:grid-cols-2 gap-8"
                                    >
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                                                Land Details
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Plot Area</span>
                                                    <span className="font-semibold text-slate-900">{property.area_sqft} Sq.Ft.</span>
                                                </div>
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Dimensions</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {property.dimensions || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Facing</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {property.facing || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Zoning</span>
                                                    <span className="font-semibold text-slate-900">
                                                        {property.zoning || "Residential"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-4">
                                                Approvals & Legal
                                            </h3>
                                            <div className="space-y-3">
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">DTCP Approved</span>
                                                    <span className="font-semibold text-green-600 flex items-center gap-1">
                                                        <CheckCircle2 className="w-4 h-4" /> Yes
                                                    </span>
                                                </div>
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">RERA Registered</span>
                                                    <span className="font-semibold text-green-600 flex items-center gap-1">
                                                        <CheckCircle2 className="w-4 h-4" /> Yes
                                                    </span>
                                                </div>
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Ownership</span>
                                                    <span className="font-semibold text-slate-900">Freehold</span>
                                                </div>
                                                <div className="flex justify-between pb-2 border-b border-slate-200">
                                                    <span className="text-slate-600">Legal Check</span>
                                                    <span className="font-semibold text-green-600 flex items-center gap-1">
                                                        <CheckCircle2 className="w-4 h-4" /> Clear Title
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Sidebar */}
                                <aside>
                                    <div className="sticky top-24 space-y-6">
                                        {/* Contact Card */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6 }}
                                            className="p-6 rounded-3xl bg-gradient-to-br from-[#FFB800] to-[#FFA500]"
                                        >
                                            <h3 className="font-display text-2xl font-bold text-slate-900 mb-4">
                                                Interested?
                                            </h3>
                                            <p className="text-slate-800 mb-6">
                                                Contact us today for a site visit and more information.
                                            </p>
                                            <div className="space-y-3">
                                                <a href="tel:+919894948011">
                                                    <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                                        <Phone className="w-4 h-4 mr-2" />
                                                        Call Now
                                                    </Button>
                                                </a>
                                                <Link to="/contact">
                                                    <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Send Enquiry
                                                    </Button>
                                                </Link>
                                            </div>
                                        </motion.div>

                                        {/* Share */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: 0.2 }}
                                            className="p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200"
                                        >
                                            <h3 className="font-display text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                                <Share2 className="w-5 h-5 text-[#FFB800]" />
                                                Share Property
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

export default PropertyDetail;
