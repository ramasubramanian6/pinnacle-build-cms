import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Package {
    id: string;
    name: string;
    description: string | null;
    includes: string[];
    price_info: string | null;
    featured: boolean;
    order_index: number;
    created_at: string;
    updated_at: string;
}

export const usePackages = () => {
    return useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("packages")
                .select("*")
                .order("order_index", { ascending: true });

            if (error) throw error;
            return data as Package[];
        },
    });
};
