import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Property {
  id: string;
  title: string;
  description: string | null;
  property_type: string;
  status: string;
  price: number;
  area_sqft: number;
  bedrooms: number | null;
  bathrooms: number | null;
  location: string;
  address: string | null;
  image_url: string | null;
  gallery: string[] | null;
  amenities: string[] | null;
  featured: boolean | null;
  project_id: string | null;
  created_at: string;
  updated_at: string;
}

export const useProperties = (status?: string) => {
  return useQuery({
    queryKey: ["properties", status],
    queryFn: async () => {
      let query = supabase.from("properties").select("*").order("created_at", { ascending: false });
      
      if (status && status !== "All") {
        query = query.eq("status", status.toLowerCase());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      return data as Property[];
    },
  });
};

export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `${(price / 10000000).toFixed(2)} Cr`;
  } else if (price >= 100000) {
    return `${(price / 100000).toFixed(2)} Lac`;
  }
  return price.toLocaleString("en-IN");
};
