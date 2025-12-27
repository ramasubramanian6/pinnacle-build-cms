import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Testimonial {
    id: string;
    client_name: string;
    client_position: string | null;
    company: string | null;
    testimonial_text: string;
    rating: number | null;
    image_url: string | null;
    featured: boolean;
    created_at: string;
    updated_at: string;
}

export const useTestimonials = () => {
    return useQuery({
        queryKey: ["testimonials"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as Testimonial[];
        },
    });
};

export const useFeaturedTestimonials = () => {
    return useQuery({
        queryKey: ["testimonials", "featured"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("testimonials")
                .select("*")
                .eq("featured", true)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data as Testimonial[];
        },
    });
};
