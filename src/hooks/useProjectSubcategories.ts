import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";
import { ProjectCategory } from "./useProjectCategories";

export interface ProjectSubcategory {
    id: string;
    _id: string;
    category: ProjectCategory | string; // Can be populated object or ID string
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    images: { url: string; caption?: string; order?: number }[];
    features?: string[];
    featuresDescription?: string;
    contentHeading?: string;
    content?: string;
    metaTitle?: string;
    metaDescription?: string;
    order: number;
    isActive: boolean;
    process?: { title: string; description: string }[];
    benefits?: { title: string; description: string }[];
    faqs?: { question: string; answer: string }[];
}

export const useProjectSubcategories = (categoryId?: string) => {
    const queryClient = useQueryClient();

    const fetchSubcategories = async (): Promise<ProjectSubcategory[]> => {
        let url = "/project-subcategories";
        if (categoryId) {
            url += `?category=${categoryId}`;
        }
        const { data } = await api.get(url);
        return data;
    };

    const createSubcategory = useMutation({
        mutationFn: async (subcategoryData: Partial<ProjectSubcategory>) => {
            const { data } = await api.post("/project-subcategories", subcategoryData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-subcategories"] });
            toast.success("Project subcategory created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create subcategory");
        },
    });

    const updateSubcategory = useMutation({
        mutationFn: async ({ id, ...data }: { id: string } & Partial<ProjectSubcategory>) => {
            const response = await api.put(`/project-subcategories/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-subcategories"] });
            toast.success("Project subcategory updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update subcategory");
        },
    });

    const deleteSubcategory = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/project-subcategories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-subcategories"] });
            toast.success("Project subcategory deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete subcategory");
        },
    });

    return {
        data: useQuery({
            queryKey: ["project-subcategories", categoryId],
            queryFn: fetchSubcategories,
        }).data,
        isLoading: useQuery({
            queryKey: ["project-subcategories", categoryId],
            queryFn: fetchSubcategories,
        }).isLoading,
        createSubcategory,
        updateSubcategory,
        deleteSubcategory,
    };
};
