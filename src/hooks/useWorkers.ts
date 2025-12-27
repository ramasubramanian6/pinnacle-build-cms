import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Worker {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  phone: string | null;
  email: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export const useWorkers = () => {
  return useQuery({
    queryKey: ["workers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workers")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as Worker[];
    },
  });
};
