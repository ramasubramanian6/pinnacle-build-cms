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
import type { Package } from "@/hooks/usePackages";

const AdminPackages = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        includes: [""],
        price_info: "",
        featured: false,
        order_index: 0,
    });

    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: packages, isLoading } = useQuery({
        queryKey: ["packages"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from("packages")
                .select("*")
                .order("order_index", { ascending: true });
            if (error) throw error;
            return data as Package[];
        },
    });

    const createMutation = useMutation({
        mutationFn: async (data: typeof formData) => {
            const { error } = await supabase.from("packages").insert([data]);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            toast({ title: "Package added successfully" });
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Package> }) => {
            const { error } = await supabase.from("packages").update(data).eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            toast({ title: "Package updated successfully" });
            resetForm();
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase.from("packages").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["packages"] });
            toast({ title: "Package deleted successfully" });
        },
        onError: (error: any) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const resetForm = () => {
        setFormData({ name: "", description: "", includes: [""], price_info: "", featured: false, order_index: 0 });
        setIsEditing(false);
        setEditingPackage(null);
    };

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setFormData({
            name: pkg.name,
            description: pkg.description || "",
            includes: pkg.includes || [""],
            price_info: pkg.price_info || "",
            featured: pkg.featured,
            order_index: pkg.order_index,
        });
        setIsEditing(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cleanedIncludes = formData.includes.filter(item => item.trim() !== "");
        if (editingPackage) {
            updateMutation.mutate({ id: editingPackage.id, data: { ...formData, includes: cleanedIncludes } });
        } else {
            createMutation.mutate({ ...formData, includes: cleanedIncludes });
        }
    };

    const addIncludeItem = () => {
        setFormData({ ...formData, includes: [...formData.includes, ""] });
    };

    const updateIncludeItem = (index: number, value: string) => {
        const newIncludes = [...formData.includes];
        newIncludes[index] = value;
        setFormData({ ...formData, includes: newIncludes });
    };

    const removeIncludeItem = (index: number) => {
        const newIncludes = formData.includes.filter((_, i) => i !== index);
        setFormData({ ...formData, includes: newIncludes });
    };

    return (
        <Layout>
            <div className="container mx-auto px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-4xl font-bold">Manage Service Packages</h1>
                        <Button
                            onClick={() => setIsEditing(!isEditing)}
                            className="bg-gradient-to-r from-amber-500 to-yellow-600"
                        >
                            {isEditing ? <X className="mr-2" /> : <Plus className="mr-2" />}
                            {isEditing ? "Cancel" : "Add Package"}
                        </Button>
                    </div>

                    {isEditing && (
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-8">
                            <h2 className="text-2xl font-bold mb-4">
                                {editingPackage ? "Edit Package" : "Add New Package"}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <Input
                                    placeholder="Package Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                />
                                <Input
                                    placeholder="Price Info (e.g., Contact for pricing)"
                                    value={formData.price_info}
                                    onChange={(e) => setFormData({ ...formData, price_info: e.target.value })}
                                />
                                <Input
                                    placeholder="Order Index"
                                    type="number"
                                    value={formData.order_index}
                                    onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                                />
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={formData.featured}
                                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                                    />
                                    <label className="text-sm font-medium">Featured Package</label>
                                </div>
                            </div>
                            <Textarea
                                placeholder="Description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="mb-4"
                                rows={3}
                            />

                            <div className="mb-4">
                                <label className="text-sm font-medium mb-2 block">Includes:</label>
                                {formData.includes.map((item, index) => (
                                    <div key={index} className="flex gap-2 mb-2">
                                        <Input
                                            placeholder="Feature item"
                                            value={item}
                                            onChange={(e) => updateIncludeItem(index, e.target.value)}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => removeIncludeItem(index)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addIncludeItem}>
                                    <Plus className="w-4 h-4 mr-2" /> Add Item
                                </Button>
                            </div>

                            <Button type="submit" className="bg-gradient-to-r from-amber-500 to-yellow-600">
                                <Save className="mr-2" />
                                {editingPackage ? "Update" : "Create"}
                            </Button>
                        </form>
                    )}

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : packages && packages.length > 0 ? (
                            packages.map((pkg) => (
                                <div key={pkg.id} className="bg-white p-6 rounded-lg shadow-lg relative">
                                    {pkg.featured && (
                                        <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-white" /> Featured
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{pkg.name}</h3>
                                    <p className="text-slate-600 text-sm mb-4">{pkg.description}</p>
                                    {pkg.price_info && (
                                        <p className="text-amber-600 font-semibold mb-4">{pkg.price_info}</p>
                                    )}
                                    {pkg.includes && pkg.includes.length > 0 && (
                                        <ul className="space-y-1 mb-4">
                                            {pkg.includes.map((item, idx) => (
                                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="text-amber-500">✓</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex gap-2 mt-4">
                                        <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this package?")) {
                                                    deleteMutation.mutate(pkg.id);
                                                }
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-slate-500 col-span-full">No packages found. Add your first package!</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AdminPackages;
