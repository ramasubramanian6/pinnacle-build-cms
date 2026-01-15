import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
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
    queryKey: ["user-projects", user?._id],
    queryFn: async () => {
      if (!user?._id) return [];

      const { data } = await api.get("/user-projects");
      return data.map((up: any) => ({ ...up, id: up._id })) as UserProject[];
    },
    enabled: !!user?._id,
  });
};

export const useUserDashboardStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["user-dashboard-stats", user?._id],
    queryFn: async () => {
      if (!user?._id) return { activeProjects: 0, documentsCount: 0, daysToMilestone: 0 };

      const { data } = await api.get("/user-projects");

      const activeProjects = data.filter((up: any) => up.project?.status === "ongoing").length;
      const documentsCount = data.reduce((sum: number, up: any) => sum + (up.documents_count || 0), 0);

      // Calculate days to nearest milestone
      const today = new Date();
      let daysToMilestone = 0;

      const upcomingMilestones = data
        .filter((up: any) => up.next_milestone_date)
        .map((up: any) => new Date(up.next_milestone_date))
        .filter((date: Date) => date > today)
        .sort((a: Date, b: Date) => a.getTime() - b.getTime());

      if (upcomingMilestones.length > 0) {
        daysToMilestone = Math.ceil((upcomingMilestones[0].getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      }

      return { activeProjects, documentsCount, daysToMilestone };
    },
    enabled: !!user?._id,
  });
};
