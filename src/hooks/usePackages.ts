import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Package {
    id: string;
    title: string;
    price: string;
    description: string | null;
    features: string[] | null;
    is_popular: boolean;
    cta_text: string | null;
    cta_link: string | null;
    order_index: number;
    created_at?: string;
    updated_at?: string;
    // Enhanced content
    images?: string[];
    featuresDescription?: string;
    details?: string;
    status?: string;
    process?: { title: string; description: string; }[];
    benefits?: { title: string; description: string; }[];
    faqs?: { question: string; answer: string; }[];
}

export const usePackages = () => {
    return useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const { data } = await api.get("/packages");
            return data.map((p: any) => ({ ...p, id: p._id })) as Package[];
        },
    });
};

export const usePackageById = (id: string) => {
    return useQuery<Package>({
        queryKey: ["package", id],
        queryFn: async () => {
            const { data } = await api.get(`/packages/${id}`);
            return { ...data, id: data._id } as Package;
        },
        enabled: !!id,
    });
};

export const useCreatePackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (pkg: any) => {
            const { data } = await api.post("/packages", pkg);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            toast.success("Package created");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create package");
        },
    });
};

export const useUpdatePackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updates }: { id: string;[key: string]: any }) => {
            const { data } = await api.put(`/packages/${id}`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            toast.success("Package updated");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update package");
        },
    });
};

export const useDeletePackage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/packages/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            toast.success("Package deleted");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete package");
        },
    });
};
