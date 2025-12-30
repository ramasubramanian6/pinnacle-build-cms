import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
            const { data, error } = await supabase
                .from("blogs" as any)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching blogs:", error);
                throw error;
            }
            return data as unknown as Blog[];
        },
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (blog: Omit<Blog, "id" | "created_at" | "updated_at">) => {
            const { data, error } = await supabase
                .from("blogs" as any)
                .insert([blog])
                .select()
                .single();

            if (error) {
                console.error("Error creating blog:", error);
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Blog> & { id: string }) => {
            const { data, error } = await supabase
                .from("blogs" as any)
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) {
                console.error("Error updating blog:", error);
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("blogs" as any)
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Error deleting blog:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
    });
};
