import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string[] | null;
    image_url: string | null;
    created_at?: string;
    updated_at?: string;
}

export const useServices = () => {
    return useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const { data } = await api.get("/services");
            return data.map((s: any) => ({ ...s, id: s._id })) as Service[];
        },
    });
};

export const useCreateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (service: any) => {
            const { data } = await api.post("/services", service);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toast.success("Service created");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create service");
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updates }: { id: string;[key: string]: any }) => {
            const { data } = await api.put(`/services/${id}`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toast.success("Service updated");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update service");
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/services/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toast.success("Service deleted");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete service");
        },
    });
};
