import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SliderImage {
    id: string;
    title?: string;
    description?: string;
    image_url: string;
    order: number;
    createdAt: string;
}

export const useSliderImages = () => {
    return useQuery<SliderImage[]>({
        queryKey: ["slider-images"],
        queryFn: async () => {
            const { data } = await api.get("/slider-images");
            return data;
        },
    });
};

export const useCreateSliderImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (imageData: Partial<SliderImage>) => {
            const { data } = await api.post("/slider-images", imageData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["slider-images"] });
        },
    });
};

export const useDeleteSliderImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/slider-images/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["slider-images"] });
        },
    });
};
