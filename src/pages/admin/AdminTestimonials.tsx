import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X, Star } from "lucide-react";
import type { Testimonial } from "@/hooks/useTestimonials";

const AdminTestimonials = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({
        client_name: "",
        client_position: "",
        company: "",
        testimonial_text: "",
        rating: 5,
        featured: false,
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: testimonials, isLoading } = useQuery({
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

    const createMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const { error } = await supabase.from("testimonials").insert([data]);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast({ title: "Testimonial added successfully" });
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Testimonial> }) => {
            const { error } = await supabase.from("testimonials").update(data).eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast({ title: "Testimonial updated successfully" });
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("testimonials").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
            toast({ title: "Testimonial deleted successfully" });
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const resetForm = () => {
        setFormData({ client_name: "", client_position: "", company: "", testimonial_text: "", rating: 5, featured: false });
        setIsEditing(false);
        setEditingTestimonial(null);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setFormData({
            client_name: testimonial.client_name,
            client_position: testimonial.client_position || "",
            company: testimonial.company || "",
            testimonial_text: testimonial.testimonial_text,
            rating: testimonial.rating || 5,
            featured: testimonial.featured,
        });
        setIsEditing(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTestimonial) {
            updateMutation.mutate({ id: editingTestimonial.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <Layout>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold">Manage Testimonials</h1>
                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-gradient-to-r from-amber-500 to-yellow-600"
                        >
                            {isEditing ? <X className="mr-2" /> : <Plus className="mr-2" />}
                            {isEditing ? "Cancel" : "Add Testimonial"}
                        </Button>
                    </div>

                    {isEditing && (
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4">
                                {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <Input
                                    placeholder="Client Name"
                                    value={formData.client_name}
                                    onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Client Position"
                                    value={formData.client_position}
                                    onChange={(e) => setFormData({ ...formData, client_position: e.target.value })}
                                />
                                <Input
                                    placeholder="Company"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                                <div>
                                    <label className="text-sm font-medium mb-2 block">Rating</label>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                                    />
                                    <label className="text-sm font-medium">Featured Testimonial</label>
                                </div>
                            </div>
                            <Textarea
                                placeholder="Testimonial Text"
                                value={formData.testimonial_text}
                                onChange={(e) => setFormData({ ...formData, testimonial_text: e.target.value })}
                                className="mb-4"
                                rows={4}
                                required
                            />
                            <Button type="submit" className="bg-gradient-to-r from-amber-500 to-yellow-600">
                                <Save className="mr-2" />
                                {editingTestimonial ? "Update" : "Create"}
                            </Button>
                        </form>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : testimonials && testimonials.length > 0 ? (
                            testimonials.map((testimonial) => (
                                <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-lg relative">
                                    {testimonial.featured && (
                                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-white" /> Featured
                                        </div>
                                    )}
                                    <div className="mb-3">{renderStars(testimonial.rating || 5)}</div>
                                    <p className="text-slate-700 mb-4 italic">"{testimonial.testimonial_text}"</p>
                                    <div className="border-t pt-4">
                                        <h4 className="font-semibold text-slate-900">{testimonial.client_name}</h4>
                                        {testimonial.client_position && testimonial.company && (
                                            <p className="text-sm text-slate-600">
                                                {testimonial.client_position}, {testimonial.company}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(testimonial)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this testimonial?")) {
                                                    deleteMutation.mutate(testimonial.id);
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 col-span-full">No testimonials found. Add your first testimonial!</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminTestimonials;
