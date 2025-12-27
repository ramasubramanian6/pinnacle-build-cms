import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface UserProject {
  id: string;
  user_id: string;
  project_id: string;
  role: string | null;
  documents_count: number | null;
  next_milestone: string | null;
  next_milestone_date: string | null;
  created_at: string;
  project: {
    id: string;
    title: string;
    status: string;
    progress: number | null;
    image_url: string | null;
    location: string;
  } | null;
}

export const useUserProjects = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-projects", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("user_projects")
        .select(`
          *,
          project:projects(id, title, status, progress, image_url, location)
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as UserProject[];
    },
    enabled: !!user?.id,
  });
};

export const useUserDashboardStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-dashboard-stats", user?.id],
    queryFn: async () => {
      if (!user?.id) return { activeProjects: 0, documentsCount: 0, daysToMilestone: 0 };
      
      const { data, error } = await supabase
        .from("user_projects")
        .select("*, project:projects(status)")
        .eq("user_id", user.id);

      if (error) throw error;
      
      const activeProjects = data.filter(up => up.project?.status === "ongoing").length;
      const documentsCount = data.reduce((sum, up) => sum + (up.documents_count || 0), 0);
      
      // Calculate days to nearest milestone
      const today = new Date();
      let daysToMilestone = 0;
      
      const upcomingMilestones = data
        .filter(up => up.next_milestone_date)
        .map(up => new Date(up.next_milestone_date!))
        .filter(date => date > today)
        .sort((a, b) => a.getTime() - b.getTime());
      
      if (upcomingMilestones.length > 0) {
        daysToMilestone = Math.ceil((upcomingMilestones[0].getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      }

      return { activeProjects, documentsCount, daysToMilestone };
    },
    enabled: !!user?.id,
  });
};
