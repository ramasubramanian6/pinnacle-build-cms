import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useProjectCategories, ProjectCategory } from "@/hooks/useProjectCategories";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LuxuryLoader, DotsLoader } from "@/components/premium/LuxuryLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminProjectCategories() {
    const { user, loading: authLoading } = useAuth();
    const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
    const { data: categories, isLoading: categoriesLoading, createCategory, updateCategory, deleteCategory } = useProjectCategories();
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<ProjectCategory | null>(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        icon: "Building2",
        image_url: "",
        order: 0,
        isActive: true
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
            slug: "",
            description: "",
            icon: "Building2",
            image_url: "",
            order: 0,
            isActive: true
        });
        setEditingCategory(null);
    };

    const handleEdit = (category: ProjectCategory) => {
        setEditingCategory(category);
        setFormData({
            title: category.title,
            slug: category.slug,
            description: category.description,
            icon: category.icon,
            image_url: category.image_url || "",
            order: category.order || 0,
            isActive: category.isActive
        });
        setIsDialogOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            setFormData(prev => ({ ...prev, image_url: url }));
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: !editingCategory ? generateSlug(title) : prev.slug
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCategory) {
            await updateCategory.mutateAsync({ id: editingCategory.id, ...formData });
        } else {
            await createCategory.mutateAsync(formData);
        }
        setIsDialogOpen(false);
        resetForm();
    };

    if (authLoading || roleLoading) return <div className="min-h-screen flex items-center justify-center"><LuxuryLoader /></div>;
    if (!isAdmin) return null;

    return (
        <>
            <Helmet><title>Project Categories | BRIXXSPACE Admin</title></Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => navigate('/admin/projects')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Project Categories</h1>
                            <p className="text-muted-foreground">Manage main project categories</p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Plus className="h-4 w-4 mr-2" /> Add Category
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Title</Label>
                                            <Input value={formData.title} onChange={handleTitleChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Slug</Label>
                                            <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                                    </div>

                                    {/* Note: Icon field removed as per user preference in Services, keeping consistent */}
                                    {/* If needed, uncomment below */}
                                    {/* 
                                    <div className="space-y-2">
                                        <Label>Icon Name (Lucide React)</Label>
                                        <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
                                    </div> 
                                    */}

                                    <div className="space-y-2">
                                        <Label>Cover Image</Label>
                                        <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                                        {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-24 w-auto object-cover rounded mt-2" />}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Order</Label>
                                            <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
                                        </div>
                                        <div className="flex items-center gap-2 pt-8">
                                            <Checkbox checked={formData.isActive} onCheckedChange={(c) => setFormData({ ...formData, isActive: c as boolean })} />
                                            <Label>Active</Label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                        <Button type="submit" className="bg-accent text-accent-foreground" disabled={uploading}>
                                            {editingCategory ? "Update" : "Create"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            {categoriesLoading ? <div className="p-8 text-center"><DotsLoader /></div> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Slug</TableHead>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {categories?.map((cat) => (
                                            <TableRow key={cat.id}>
                                                <TableCell>
                                                    {cat.image_url ? (
                                                        <img src={cat.image_url} alt={cat.title} className="w-10 h-10 rounded object-cover" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xs">No Img</div>
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{cat.title}</TableCell>
                                                <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                                                <TableCell>{cat.order}</TableCell>
                                                <TableCell>
                                                    <Badge variant={cat.isActive ? "default" : "secondary"}>
                                                        {cat.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(cat)}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                                                                    <AlertDialogDescription>Are you sure? This will affect all associated subcategories.</AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction className="bg-destructive" onClick={() => deleteCategory.mutate(cat.id)}>Delete</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {!categories?.length && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No categories found.</TableCell>
                                            </TableRow>
                                        )}
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
