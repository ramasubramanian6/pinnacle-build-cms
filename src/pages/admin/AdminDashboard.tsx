import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useProjects, useProjectStats } from "@/hooks/useProjects";
import { useProperties } from "@/hooks/useProperties";
import { useContactSubmissions } from "@/hooks/useAdmin";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, FolderKanban, Mail, TrendingUp, Users, CheckCircle2, Settings, Megaphone } from "lucide-react";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const { data: projectStats } = useProjectStats();
  const { data: properties } = useProperties();
  const { data: contacts } = useContactSubmissions();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!roleLoading && isAdmin === false) {
      navigate("/dashboard");
    }
  }, [isAdmin, roleLoading, navigate]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LuxuryLoader />
      </div>
    );
  }

  if (!isAdmin) return null;

  const stats = [
    {
      title: "Total Projects",
      value: projectStats?.total || 0,
      icon: FolderKanban,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Ongoing Projects",
      value: projectStats?.ongoing || 0,
      icon: TrendingUp,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Completed Projects",
      value: projectStats?.completed || 0,
      icon: CheckCircle2,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
    {
      title: "Total Properties",
      value: properties?.length || 0,
      icon: Building2,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
    },
    {
      title: "Contact Inquiries",
      value: contacts?.length || 0,
      icon: Mail,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
    {
      title: "New Inquiries",
      value: contacts?.filter((c) => c.status === "new").length || 0,
      icon: Users,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | BRIXXSPACE</title>
      </Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your business metrics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="bg-card border-border">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/projects")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-accent" />
                  Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage construction projects, updates, and galleries.
                </p>
                <div className="text-2xl font-bold text-foreground">{projectStats?.total || 0}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/properties")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-accent" />
                  Properties
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage real estate listings, pricing, and availability.
                </p>
                <div className="text-2xl font-bold text-foreground">{properties?.length || 0}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/services")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Settings className="w-5 h-5 text-accent" />
                  Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Update service offerings and descriptions.
                </p>
                <p className="text-sm font-medium text-accent">Manage Services →</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/blogs")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-accent" />
                  Blogs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Publish news, articles, and updates.
                </p>
                <p className="text-sm font-medium text-accent">Manage Blogs →</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/testimonials")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" />
                  Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage client reviews and featured testimonials.
                </p>
                <p className="text-sm font-medium text-accent">Manage Testimonials →</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/contacts")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Mail className="w-5 h-5 text-accent" />
                  Inquiries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  View and respond to customer messages.
                </p>
                <div className="text-2xl font-bold text-foreground">{contacts?.length || 0}</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent/50 transition-colors cursor-pointer" onClick={() => navigate("/admin/project-interests")}>
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-accent" />
                  Project Interests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Manage users interested in projects. Call and follow up.
                </p>
                <p className="text-sm font-medium text-accent">View Interests →</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
