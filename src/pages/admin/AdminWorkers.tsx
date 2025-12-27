import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import type { Worker } from "@/hooks/useWorkers";

const AdminWorkers = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingWorker, setEditingWorker] = useState<Worker | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        position: "",
        bio: "",
        phone: "",
        email: "",
        order_index: 0,
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: workers, isLoading } = useQuery({
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

    const createMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const { error } = await supabase.from("workers").insert([data]);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
            toast({ title: "Worker added successfully" });
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Worker> }) => {
            const { error } = await supabase.from("workers").update(data).eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
            toast({ title: "Worker updated successfully" });
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("workers").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["workers"] });
            toast({ title: "Worker deleted successfully" });
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const resetForm = () => {
        setFormData({ name: "", position: "", bio: "", phone: "", email: "", order_index: 0 });
        setIsEditing(false);
        setEditingWorker(null);
    };

    const handleEdit = (worker: Worker) => {
        setEditingWorker(worker);
        setFormData({
            name: worker.name,
            position: worker.position,
            bio: worker.bio || "",
            phone: worker.phone || "",
            email: worker.email || "",
            order_index: worker.order_index,
        });
        setIsEditing(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingWorker) {
            updateMutation.mutate({ id: editingWorker.id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold">Manage Team Members</h1>
                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-gradient-to-r from-amber-500 to-yellow-600"
                        >
                            {isEditing ? <X className="mr-2" /> : <Plus className="mr-2" />}
                            {isEditing ? "Cancel" : "Add Worker"}
                        </Button>
                    </div>

                    {isEditing && (
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4">
                                {editingWorker ? "Edit Worker" : "Add New Worker"}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Position"
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Input
                                    placeholder="Order Index"
                                    type="number"
                                    value={formData.order_index}
                                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                                />
                            </div>
                            <Textarea
                                placeholder="Bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="mt-4"
                                rows={4}
                            />
                            <Button type="submit" className="mt-4 bg-gradient-to-r from-amber-500 to-yellow-600">
                                <Save className="mr-2" />
                                {editingWorker ? "Update" : "Create"}
                            </Button>
                        </form>
                    )}

                    <div className="grid gap-6">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : workers && workers.length > 0 ? (
                            workers.map((worker) => (
                                <div key={worker.id} className="bg-white p-6 rounded-lg shadow-lg">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-slate-900">{worker.name}</h3>
                                            <p className="text-amber-600 font-semibold mb-2">{worker.position}</p>
                                            {worker.bio && <p className="text-slate-600 mb-4">{worker.bio}</p>}
                                            <div className="flex gap-4 text-sm text-slate-600">
                                                {worker.phone && <span>📞 {worker.phone}</span>}
                                                {worker.email && <span>📧 {worker.email}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(worker)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => {
                                                    if (confirm("Are you sure you want to delete this worker?")) {
                                                        deleteMutation.mutate(worker.id);
                                                    }
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500">No workers found. Add your first worker!</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminWorkers;
