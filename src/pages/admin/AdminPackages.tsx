import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { usePackages, useCreatePackage, useUpdatePackage, useDeletePackage, Package } from "@/hooks/usePackages";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LuxuryLoader, DotsLoader } from "@/components/premium/LuxuryLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Star } from "lucide-react";

export default function AdminPackages() {
    const { user, loading: authLoading } = useAuth();
    const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
    const { data: packages, isLoading: packagesLoading } = usePackages();
    const createPackage = useCreatePackage();
    const updatePackage = useUpdatePackage();
    const deletePackage = useDeletePackage();
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPackage, setEditingPackage] = useState<Package | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        features: [""],
        is_popular: false,
        order_index: 0,
        cta_text: "Get Started",
        cta_link: "#contact",
    });

    useEffect(() => {
        if (!authLoading && !user) navigate("/auth");
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!roleLoading && isAdmin === false) navigate("/dashboard");
    }, [isAdmin, roleLoading, navigate]);

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: "",
            features: [""],
            is_popular: false,
            order_index: 0,
            cta_text: "Get Started",
            cta_link: "#contact",
        });
        setEditingPackage(null);
    };

    const handleEdit = (pkg: Package) => {
        setEditingPackage(pkg);
        setFormData({
            title: pkg.title,
            description: pkg.description || "",
            price: pkg.price || "",
            features: pkg.features && pkg.features.length > 0 ? pkg.features : [""],
            is_popular: pkg.is_popular,
            order_index: pkg.order_index,
            cta_text: pkg.cta_text || "Get Started",
            cta_link: pkg.cta_link || "#contact",
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanedFeatures = formData.features.filter(item => item.trim() !== "");
        const packageData = { ...formData, features: cleanedFeatures };

        if (editingPackage) {
            await updatePackage.mutateAsync({ id: editingPackage.id, ...packageData });
        } else {
            await createPackage.mutateAsync(packageData);
        }
        setIsDialogOpen(false);
        resetForm();
    };

    const addFeatureItem = () => {
        setFormData({ ...formData, features: [...formData.features, ""] });
    };

    const updateFeatureItem = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData({ ...formData, features: newFeatures });
    };

    const removeFeatureItem = (index: number) => {
        const newFeatures = formData.features.filter((_, i) => i !== index);
        setFormData({ ...formData, features: newFeatures.length > 0 ? newFeatures : [""] });
    };

    if (authLoading || roleLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LuxuryLoader />
            </div>
        );
    }

    if (!isAdmin) return null;

    return (
        <>
            <Helmet>
                <title>Manage Packages | BRIXXSPACE Admin</title>
            </Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Service Packages</h1>
                            <p className="text-muted-foreground">Manage your pricing plans and packages</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Package
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Package Name</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price Info</Label>
                                            <Input
                                                id="price"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                placeholder="e.g., Contact for pricing"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="order_index">Order Index</Label>
                                            <Input
                                                id="order_index"
                                                type="number"
                                                value={formData.order_index}
                                                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-8">
                                            <Checkbox
                                                id="is_popular"
                                                checked={formData.is_popular}
                                                onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked as boolean })}
                                            />
                                            <Label htmlFor="is_popular">Popular Package</Label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Features Included</Label>
                                        {formData.features.map((item, index) => (
                                            <div key={index} className="flex gap-2 mb-2">
                                                <Input
                                                    placeholder="Feature item"
                                                    value={item}
                                                    onChange={(e) => updateFeatureItem(index, e.target.value)}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="icon"
                                                    onClick={() => removeFeatureItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" size="sm" onClick={addFeatureItem}>
                                            <Plus className="h-4 w-4 mr-2" /> Add Item
                                        </Button>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-accent text-accent-foreground">
                                            {editingPackage ? "Update" : "Create"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            {packagesLoading ? (
                                <div className="p-8 text-center">
                                    <DotsLoader />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border">
                                            <TableHead className="text-muted-foreground">Name</TableHead>
                                            <TableHead className="text-muted-foreground">Price</TableHead>
                                            <TableHead className="text-muted-foreground">Featured</TableHead>
                                            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {packages?.map((pkg) => (
                                            <TableRow key={pkg.id} className="border-border">
                                                <TableCell className="font-medium text-foreground">{pkg.title}</TableCell>
                                                <TableCell className="text-muted-foreground">{pkg.price}</TableCell>
                                                <TableCell>
                                                    {pkg.is_popular && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-medium bg-amber-500/10 px-2 py-1 rounded">
                                                            <Star className="w-3 h-3 fill-amber-500" /> Popular
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(pkg)}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button size="icon" variant="ghost" className="text-destructive">
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Package</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete "{pkg.title}"? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        className="bg-destructive text-destructive-foreground"
                                                                        onClick={() => deletePackage.mutate(pkg.id)}
                                                                    >
                                                                        Delete
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </AdminLayout>
        </>
    );
}
