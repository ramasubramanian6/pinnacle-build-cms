import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface Property {
  id: string; // Mapped from _id
  _id?: string;
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
  amenities: string[] | null;
  featured: boolean | null;
  dimensions: string | null;
  facing: string | null;
  zoning: string | null;
  created_at: string;
  updated_at: string;
  project_id?: string | null;
}

export const useProperties = (filters?: any) => {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      const { data } = await api.get("/properties");
      let properties = data.map((p: any) => ({ ...p, id: p._id })) as Property[];

      // Basic filtering client-side for now
      if (filters) {
        if (filters.status && filters.status !== 'All') {
          properties = properties.filter(p => p.status === filters.status);
        }
        if (filters.type && filters.type !== 'All') {
          properties = properties.filter(p => p.property_type === filters.type);
        }
        if (filters.location && filters.location !== 'All') {
          properties = properties.filter(p => p.location === filters.location);
        }
      }

      return properties;
    },
  });
};

export const useProperty = (id: string) => {
  return useQuery({
    queryKey: ["properties", id],
    queryFn: async () => {
      if (!id) return null;
      const { data } = await api.get(`/properties/${id}`);
      return { ...data, id: data._id } as Property;
    },
    enabled: !!id
  });
};

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: async () => {
      const { data } = await api.get("/properties");
      // Assuming we'll add filtering on backend later or just filter client side for now
      const properties = data.map((p: any) => ({ ...p, id: p._id })) as Property[];
      return properties.filter(p => p.featured).slice(0, 3);
    }
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (property: any) => {
      const { data } = await api.post("/properties", property);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property created");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create property");
    }
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string;[key: string]: any }) => {
      const { data } = await api.put(`/properties/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property updated");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to update property");
    }
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property deleted");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete property");
    }
  });
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};
