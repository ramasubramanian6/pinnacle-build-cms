import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Service {
    id: string;
    title: string;
    description: string | null;
    icon: string | null;
    features: string[] | null;
    created_at?: string;
    updated_at?: string;
}

export const useServices = () => {
    return useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("services" as any) // Typecast as any until table exists in types
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching services:", error);
                throw error;
            }
            return data as unknown as Service[];
        },
    });
};

export const useCreateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (service: Omit<Service, "id" | "created_at" | "updated_at">) => {
            const { data, error } = await supabase
                .from("services" as any)
                .insert([service])
                .select()
                .single();

            if (error) {
                console.error("Error creating service:", error);
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Service> & { id: string }) => {
            const { data, error } = await supabase
                .from("services" as any)
                .update(updates)
                .eq("id", id)
                .select()
                .single();

            if (error) {
                console.error("Error updating service:", error);
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from("services" as any)
                .delete()
                .eq("id", id);

            if (error) {
                console.error("Error deleting service:", error);
                throw error;
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};
