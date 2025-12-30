import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Project {
  id: string;
  title: string;
  description: string | null;
  location: string;
  status: string;
  category: string;
  image_url: string | null;
  progress: number | null;
  start_date: string | null;
  estimated_completion: string | null;
  total_units: number | null;
  sold_units: number | null;
  amenities: string[] | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useProjects = (category?: string) => {
  return useQuery({
    queryKey: ["projects", category],
    queryFn: async () => {
      let query = supabase.from("projects").select("*").order("created_at", { ascending: false });

      if (category && category !== "All") {
        if (category === "Ongoing" || category === "Completed") {
          query = query.eq("status", category.toLowerCase());
        } else {
          query = query.eq("category", category);
        }
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data as Project;
    },
    enabled: !!id,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProjectStats = () => {
  return useQuery({
    queryKey: ["projects", "stats"],
    queryFn: async () => {
      const { data, error } = await supabase.from("projects").select("status");
      if (error) throw error;

      const completed = data.filter(p => p.status === "completed").length;
      const ongoing = data.filter(p => p.status === "ongoing").length;

      return {
        total: data.length,
        completed,
        ongoing,
      };
    },
  });
};
