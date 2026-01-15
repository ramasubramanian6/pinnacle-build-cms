import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatar_url: string | null;
    featured: boolean;
    created_at?: string;
    updated_at?: string;
}

export const useTestimonials = () => {
    return useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const { data } = await api.get("/testimonials");
            return data.map((t: any) => ({ ...t, id: t._id })) as Testimonial[];
        },
    });
};

export const useCreateTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (testimonial: any) => {
            const { data } = await api.post("/testimonials", testimonial);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast.success("Testimonial created");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create testimonial");
        },
    });
};

export const useUpdateTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...updates }: { id: string;[key: string]: any }) => {
            const { data } = await api.put(`/testimonials/${id}`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast.success("Testimonial updated");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update testimonial");
        },
    });
};

export const useDeleteTestimonial = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/testimonials/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast.success("Testimonial deleted");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete testimonial");
        },
    });
};
