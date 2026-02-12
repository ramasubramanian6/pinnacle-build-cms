import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { ServiceCategory } from './useServiceCategories';

export interface ServiceSubcategoryImage {
    url: string;
    caption: string;
    order: number;
}

export interface ServiceSubcategory {
    _id: string;
    id: string;
    category: ServiceCategory | string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    images: ServiceSubcategoryImage[];
    features: string[];
    contentHeading: string;
    content: string;
    metaTitle?: string;
    metaDescription?: string;
    order: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

// Get all subcategories
export const useServiceSubcategories = () => {
    return useQuery({
        queryKey: ['service-subcategories'],
        queryFn: async () => {
            const { data } = await api.get<ServiceSubcategory[]>('/service-subcategories');
            return data;
        },
    });
};

// Get subcategories by category slug
export const useServiceSubcategoriesByCategory = (categorySlug: string) => {
    return useQuery({
        queryKey: ['service-subcategories', 'category', categorySlug],
        queryFn: async () => {
            const { data } = await api.get<ServiceSubcategory[]>(`/service-subcategories/category/${categorySlug}`);
            return data;
        },
        enabled: !!categorySlug,
    });
};

// Get subcategory by slug
export const useServiceSubcategoryBySlug = (categorySlug: string, subcategorySlug: string) => {
    return useQuery({
        queryKey: ['service-subcategory', categorySlug, subcategorySlug],
        queryFn: async () => {
            const { data } = await api.get<ServiceSubcategory>(`/service-subcategories/${categorySlug}/${subcategorySlug}`);
            return data;
        },
        enabled: !!categorySlug && !!subcategorySlug,
    });
};

// Get subcategory by ID
export const useServiceSubcategoryById = (id: string) => {
    return useQuery({
        queryKey: ['service-subcategory', id],
        queryFn: async () => {
            const { data } = await api.get<ServiceSubcategory>(`/service-subcategories/id/${id}`);
            return data;
        },
        enabled: !!id,
    });
};

// Create subcategory
export const useCreateServiceSubcategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subcategory: Partial<ServiceSubcategory>) => {
            const { data } = await api.post<ServiceSubcategory>('/service-subcategories', subcategory);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-subcategories'] });
        },
    });
};

// Update subcategory
export const useUpdateServiceSubcategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...subcategory }: Partial<ServiceSubcategory> & { id: string }) => {
            const { data } = await api.put<ServiceSubcategory>(`/service-subcategories/${id}`, subcategory);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-subcategories'] });
        },
    });
};

// Delete subcategory
export const useDeleteServiceSubcategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/service-subcategories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-subcategories'] });
        },
    });
};

// Add image to subcategory
export const useAddSubcategoryImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, image }: { id: string; image: Partial<ServiceSubcategoryImage> }) => {
            const { data } = await api.post<ServiceSubcategory>(`/service-subcategories/${id}/images`, image);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-subcategories'] });
        },
    });
};

// Delete image from subcategory
export const useDeleteSubcategoryImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, index }: { id: string; index: number }) => {
            const { data } = await api.delete<ServiceSubcategory>(`/service-subcategories/${id}/images/${index}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['service-subcategories'] });
        },
    });
};
