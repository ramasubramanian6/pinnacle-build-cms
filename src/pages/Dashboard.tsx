import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { 
  Building2, 
  Clock, 
  FileText, 
  MessageSquare, 
  Bell, 
  Settings, 
  LogOut,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";
import { GlassmorphismCard, GradientBorderCard } from "@/components/premium/GlassmorphismCard";
import { ScrollReveal, StaggerReveal } from "@/components/premium/ScrollReveal";
import { GradientText } from "@/components/premium/AnimatedText";
import { ProgressRing, AnimatedCounter } from "@/components/premium/ProgressRing";
import { Button } from "@/components/ui/button";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";

const mockProjects = [
  {
    id: 1,
    name: "Nellai Heights - Unit 42",
    progress: 75,
    status: "In Progress",
    nextMilestone: "Interior Finishing",
    dueDate: "Feb 15, 2025",
  },
  {
    id: 2,
    name: "Green Valley Villa - Plot 12",
    progress: 45,
    status: "Foundation",
    nextMilestone: "Ground Floor Structure",
    dueDate: "Mar 20, 2025",
  },
];

const recentUpdates = [
  { id: 1, message: "Foundation work completed for Unit 42", time: "2 hours ago", type: "milestone" },
  { id: 2, message: "New document uploaded: Floor Plan Rev.3", time: "1 day ago", type: "document" },
  { id: 3, message: "Site inspection scheduled for tomorrow", time: "2 days ago", type: "notification" },
];

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LuxuryLoader />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Client";

  return (
    <>
      <Helmet>
        <title>Dashboard | BRIXXSPACE Client Portal</title>
        <meta name="description" content="Your exclusive BRIXXSPACE client dashboard. Track projects, view updates, and manage your construction journey." />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="pt-32 pb-12 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <ScrollReveal>
                <span className="text-accent font-medium uppercase tracking-wider text-sm mb-2 block">
                  Welcome Back
                </span>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Hello, <GradientText>{userName}</GradientText>
                </h1>
                <p className="text-muted-foreground mt-2">
                  Here's an overview of your projects and recent updates.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon">
                    <Bell className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8 bg-secondary">
          <div className="container mx-auto px-6">
            <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: Building2, label: "Active Projects", value: 2 },
                { icon: Clock, label: "Days to Next Milestone", value: 12 },
                { icon: FileText, label: "Documents", value: 8 },
                { icon: MessageSquare, label: "Unread Messages", value: 3 },
              ].map((stat) => (
                <GlassmorphismCard key={stat.label} className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="font-display text-2xl font-bold text-foreground">
                    <AnimatedCounter value={stat.value} />
                  </p>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </GlassmorphismCard>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Projects Column */}
              <div className="lg:col-span-2 space-y-6">
                <ScrollReveal>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Your Projects
                  </h2>
                </ScrollReveal>

                {mockProjects.map((project, index) => (
                  <ScrollReveal key={project.id} delay={index * 0.1}>
                    <GradientBorderCard className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-6">
                        <ProgressRing 
                          progress={project.progress} 
                          size={100} 
                          strokeWidth={8}
                          showPercentage
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-display text-xl font-semibold text-foreground">
                              {project.name}
                            </h3>
                            <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                              {project.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                                Next Milestone
                              </p>
                              <p className="text-foreground font-medium">{project.nextMilestone}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">
                                Expected Date
                              </p>
                              <p className="text-foreground font-medium">{project.dueDate}</p>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </GradientBorderCard>
                  </ScrollReveal>
                ))}
              </div>

              {/* Updates Column */}
              <div className="space-y-6">
                <ScrollReveal>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Recent Updates
                  </h2>
                </ScrollReveal>

                <GlassmorphismCard className="p-6">
                  <div className="space-y-4">
                    {recentUpdates.map((update, index) => (
                      <motion.div
                        key={update.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          update.type === "milestone" ? "bg-green-500" :
                          update.type === "document" ? "bg-blue-500" : "bg-accent"
                        }`} />
                        <div>
                          <p className="text-foreground text-sm">{update.message}</p>
                          <p className="text-muted-foreground text-xs mt-1">{update.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassmorphismCard>

                <GlassmorphismCard variant="subtle" className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-display text-lg font-semibold text-foreground">
                        Overall Progress
                      </p>
                      <p className="text-muted-foreground text-sm">Across all projects</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <ProgressRing 
                      progress={60} 
                      size={120} 
                      strokeWidth={10}
                      showPercentage
                      label="Complete"
                    />
                  </div>
                </GlassmorphismCard>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Dashboard;
