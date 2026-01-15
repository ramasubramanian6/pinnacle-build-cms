
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Loader2, ArrowRight, Building, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Interest {
    id: string;
    created_at: string;
    subject: string;
    message: string;
    status: string;
    // We don't have direct project link yet in contact_submissions unless we parse subject or add a column.
    // Assuming subject format "Project Interest: <Project Name>"
}

const Interests = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [interests, setInterests] = useState<Interest[]>([]);

    useEffect(() => {
        if (user) {
            fetchInterests();
        }
    }, [user]);

    const fetchInterests = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/contacts/user");
            const interests = data.filter((c: any) => c.subject?.startsWith("Project Interest:"));
            setInterests(interests as Interest[]);
        } catch (error) {
            console.error("Error fetching interests:", error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "in_progress": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case "resolved": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "closed": return "bg-slate-500/10 text-slate-500 border-slate-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-[60vh]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-display font-bold mb-2">My Interests</h1>
                    <p className="text-muted-foreground mb-8">Projects you have expressed interest in.</p>

                    {interests.length === 0 ? (
                        <Card className="text-center py-12">
                            <CardContent className="pt-6">
                                <Building className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Interests Yet</h3>
                                <p className="text-muted-foreground mb-6">Explore our projects and let us know which ones catch your eye!</p>
                                <Link to="/projects">
                                    <Button variant="gold">Explore Projects</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6">
                            {interests.map((interest) => (
                                <Card key={interest.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg text-foreground">
                                                        {interest.subject.replace("Project Interest: ", "")}
                                                    </h3>
                                                    <Badge variant="outline" className={getStatusColor(interest.status)}>
                                                        {interest.status.replace("_", " ")}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {format(new Date(interest.created_at), "MMM d, yyyy")}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Could add a link back to project details if we stored project ID */}
                                                <Button variant="outline" asChild>
                                                    <Link to="/contact">Contact Support</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Interests;
