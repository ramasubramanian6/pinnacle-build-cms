import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Project {
  id: string; // Mapped from _id
  _id?: string;
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
  gallery: string[] | null;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
  client?: string;
  architect?: string;
  area?: number;
  year?: number;
  cost?: string;
  content?: string;
  embedded_video?: string;
  // New Fields
  episodes?: {
    title: string;
    duration: string;
    thumbnail: string;
    video_url: string;
    isPremium: boolean;
  }[];
  ebook?: {
    title: string;
    pages: number;
    images: number;
    drawings: number;
    size: string;
    url: string;
    image?: string;
  };
  products?: {
    category: string;
    brand: string;
    items?: string[];
    isPremium: boolean;
  }[];
  team?: {
    principalArchitect?: string;
    firm?: string;
    architect_image?: string;
    photoCredit?: string;
    cinematographer?: string;
    structuralConsultant?: string;
  };
  extended_info?: {
    plotArea?: string;
    facing?: string;
    vastu?: string;
    rooms?: number;
    parking?: number;
    floors?: number;
  };
  // Enhanced content
  featuresDescription?: string;
  process?: { title: string; description: string; }[];
  benefits?: { title: string; description: string; }[];
  faqs?: { question: string; answer: string; }[];
  // Linked Services
  serviceCategory?: string; // ID or populated object
  serviceSubcategory?: string; // ID or populated object
  projectCategory?: string | any; // ID or populated object
  projectSubcategory?: string | any; // ID or populated object
}

export const useProjects = (category?: string) => {
  return useQuery({
    queryKey: ["projects", category],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      let projects = data.map((p: any) => ({ ...p, id: p._id })) as Project[];

      if (category && category !== "All") {
        if (category === "Ongoing" || category === "Completed") {
          projects = projects.filter(p => p.status === category.toLowerCase());
        } else {
          projects = projects.filter(p => p.category === category);
        }
      }
      return projects;
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await api.get(`/projects/${id}`);
      return { ...data, id: data._id } as Project;
    },
    enabled: !!id,
  });
};

export const useFeaturedProjects = () => {
  return useQuery({
    queryKey: ["projects", "featured"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      // Filter on client or server. Server doesn't support query params yet, so client filter.
      // Assuming 'featured' field exists
      const projects = data.map((p: any) => ({ ...p, id: p._id })) as Project[];
      const featured = projects.filter(p => p.featured);
      return featured.length > 0 ? featured.slice(0, 3) : projects.slice(0, 3);
    },
  });
};

export const useProjectStats = () => {
  return useQuery({
    queryKey: ["projects", "stats"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      const projects = data as any[];

      const completed = projects.filter(p => p.status === "completed").length;
      const ongoing = projects.filter(p => p.status === "ongoing").length;

      return {
        total: projects.length,
        completed,
        ongoing,
      };
    },
  });
};

export interface UserProject {
  id: string;
  user_id: string;
  project_id: string;
  status: string | null;
  next_milestone: string | null;
  next_milestone_date: string | null;
  documents_count: number | null;
  project: Project;
}

export const useUserProjects = () => {
  return useQuery({
    queryKey: ["user-projects"],
    queryFn: async () => {
      const { data } = await api.get("/user-projects");
      // Backend returns formatted object { ..., project: { ... } }
      // Map _id to id
      return data.map((up: any) => ({
        ...up,
        id: up._id,
        project: { ...up.project, id: up.project._id }
      })) as UserProject[];
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (project: any) => {
      const { data } = await api.post("/projects", project);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create project");
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string;[key: string]: any }) => {
      const { data } = await api.put(`/projects/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update project");
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete project");
    },
  });
};
