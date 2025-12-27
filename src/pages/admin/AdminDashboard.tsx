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
import { Building2, FolderKanban, Mail, TrendingUp, Users, CheckCircle2 } from "lucide-react";
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Manage your projects from the Projects tab
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  View contact submissions from the Contacts tab
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
