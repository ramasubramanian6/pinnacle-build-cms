import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Blog {
    id: string;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string | null;
    author: string | null;
    date: string | null;
    read_time: string | null;
    category: string | null;
    featured: boolean;
    image_url: string | null;
    created_at?: string;
    updated_at?: string;
}

export const useBlogs = () => {
    return useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const { data } = await api.get("/blogs");
            // Map _id to id
            return data.map((b: any) => ({ ...b, id: b._id })) as Blog[];
        },
    });
};

export const useBlog = (slug: string) => {
    return useQuery({
        queryKey: ["blogs", slug],
        queryFn: async () => {
            if (!slug) return null;
            const { data } = await api.get(`/blogs/${slug}`);
            return { ...data, id: data._id } as Blog;
        },
        enabled: !!slug
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (blog: Omit<Blog, "id" | "created_at" | "updated_at">) => {
            const { data } = await api.post("/blogs", blog);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog created");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create blog");
        }
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Blog> & { id: string }) => {
            const { data } = await api.put(`/blogs/${id}`, updates);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog updated");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update blog");
        }
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/blogs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
            toast.success("Blog deleted");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete blog");
        }
    });
};
