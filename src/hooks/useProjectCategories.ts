import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import { toast } from "sonner";

export interface ProjectCategory {
    id: string;
    _id: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    image_url?: string;
    order: number;
    isActive: boolean;
}

export const useProjectCategories = () => {
    const queryClient = useQueryClient();

    const fetchCategories = async (): Promise<ProjectCategory[]> => {
        const { data } = await api.get("/project-categories");
        return data;
    };

    const createCategory = useMutation({
        mutationFn: async (categoryData: Partial<ProjectCategory>) => {
            const { data } = await api.post("/project-categories", categoryData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-categories"] });
            toast.success("Project category created successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create category");
        },
    });

    const updateCategory = useMutation({
        mutationFn: async ({ id, ...data }: { id: string } & Partial<ProjectCategory>) => {
            const response = await api.put(`/project-categories/${id}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-categories"] });
            toast.success("Project category updated successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update category");
        },
    });

    const deleteCategory = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/project-categories/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["project-categories"] });
            toast.success("Project category deleted successfully");
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete category");
        },
    });

    return {
        data: useQuery({
            queryKey: ["project-categories"],
            queryFn: fetchCategories,
        }).data,
        isLoading: useQuery({
            queryKey: ["project-categories"],
            queryFn: fetchCategories,
        }).isLoading,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
