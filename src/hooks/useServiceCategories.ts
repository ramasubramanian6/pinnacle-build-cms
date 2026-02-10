import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

export interface ServiceCategory {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image_url?: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Get all categories
export const useServiceCategories = () => {
    return useQuery({
        queryKey: ['service-categories'],
        queryFn: async () => {
            const { data } = await api.get<ServiceCategory[]>('/service-categories');
            return data;
        },
    });
};

// Get category by slug
export const useServiceCategoryBySlug = (slug: string) => {
    return useQuery({
        queryKey: ['service-category', slug],
        queryFn: async () => {
            const { data } = await api.get<ServiceCategory>(`/service-categories/slug/${slug}`);
            return data;
        },
        enabled: !!slug,
    });
};

// Get category by ID
export const useServiceCategoryById = (id: string) => {
    return useQuery({
        queryKey: ['service-category', id],
        queryFn: async () => {
            const { data } = await api.get<ServiceCategory>(`/service-categories/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

// Create category
export const useCreateServiceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (category: Partial<ServiceCategory>) => {
            const { data } = await api.post<ServiceCategory>('/service-categories', category);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-categories'] });
        },
    });
};

// Update category
export const useUpdateServiceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...category }: Partial<ServiceCategory> & { id: string }) => {
            const { data } = await api.put<ServiceCategory>(`/service-categories/${id}`, category);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-categories'] });
        },
    });
};

// Delete category
export const useDeleteServiceCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/service-categories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-categories'] });
        },
    });
};
