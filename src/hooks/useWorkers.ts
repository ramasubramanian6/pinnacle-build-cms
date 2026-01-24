import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Worker {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  bio: string | null;
  position?: string;
  phone?: string;
  email?: string;
  social_links: Record<string, string> | null;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export const useWorkers = () => {
  return useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      const { data } = await api.get("/workers");
      return data.map((w: any) => ({ ...w, id: w._id })) as Worker[];
    },
  });
};

export const useCreateWorker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (worker: any) => {
      const { data } = await api.post("/workers", worker);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      toast.success("Team member created");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create team member");
    },
  });
};

export const useUpdateWorker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string;[key: string]: any }) => {
      const { data } = await api.put(`/workers/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      toast.success("Team member updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update team member");
    },
  });
};

export const useDeleteWorker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/workers/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      toast.success("Team member deleted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete team member");
    },
  });
};
