import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

export interface Promotion {
    id: string;
    title?: string;
    image_url: string;
    price?: number;
    original_price?: number;
    discount?: string;
    link?: string;
    active: boolean;
    createdAt: string;
}

export const usePromotions = () => {
    return useQuery<Promotion[]>({
        queryKey: ["promotions"],
        queryFn: async () => {
            const { data } = await api.get("/promotions");
            return data;
        },
    });
};

export const useCreatePromotion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (promotionData: Partial<Promotion>) => {
            const { data } = await api.post("/promotions", promotionData);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotions"] });
        },
    });
};

export const useDeletePromotion = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await api.delete(`/promotions/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotions"] });
        },
    });
};
