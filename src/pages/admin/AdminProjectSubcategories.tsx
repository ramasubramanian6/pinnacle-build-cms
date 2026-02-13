import { useState, useEffect } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useProjectCategories, ProjectCategory } from "@/hooks/useProjectCategories";
import { useProjectSubcategories, ProjectSubcategory } from "@/hooks/useProjectSubcategories";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LuxuryLoader, DotsLoader } from "@/components/premium/LuxuryLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Pencil, Trash2, ArrowLeft, Image as ImageIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminProjectSubcategories() {
    const { user, loading: authLoading } = useAuth();
    const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
    const { data: categories } = useProjectCategories();
    const { data: subcategories, isLoading: subLoading, createSubcategory, updateSubcategory, deleteSubcategory } = useProjectSubcategories();
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSub, setEditingSub] = useState<ProjectSubcategory | null>(null);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        category: "",
        title: "",
        slug: "",
        shortDescription: "",
        description: "",
        images: [] as { url: string; caption?: string; order?: number }[],
        features: [] as string[],
        featuresDescription: "",
        contentHeading: "",
        content: "",
        metaTitle: "",
        metaDescription: "",
        order: 0,
        isActive: true,
        // Optional sections
        process: [] as { title: string; description: string }[],
        benefits: [] as { title: string; description: string }[],
        faqs: [] as { question: string; answer: string }[]
    });

    const [featureInput, setFeatureInput] = useState("");

    useEffect(() => {
        if (!authLoading && !user) navigate("/auth");
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!roleLoading && isAdmin === false) navigate("/dashboard");
    }, [isAdmin, roleLoading, navigate]);

    // Update slug when title changes
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
            slug: !editingSub ? generateSlug(title) : prev.slug
        }));
    };

    const resetForm = () => {
        setFormData({
            category: "",
            title: "",
            slug: "",
            shortDescription: "",
            description: "",
            images: [],
            features: [],
            featuresDescription: "",
            contentHeading: "",
            content: "",
            metaTitle: "",
            metaDescription: "",
            order: 0,
            isActive: true,
            process: [],
            benefits: [],
            faqs: []
        });
        setEditingSub(null);
    };

    const handleEdit = (sub: ProjectSubcategory) => {
        setEditingSub(sub);
        setFormData({
            category: typeof sub.category === 'object' ? sub.category?._id : sub.category,
            title: sub.title,
            slug: sub.slug,
            shortDescription: sub.shortDescription || "",
            description: sub.description || "",
            images: sub.images || [],
            features: sub.features || [],
            featuresDescription: sub.featuresDescription || "",
            contentHeading: sub.contentHeading || "",
            content: sub.content || "",
            metaTitle: sub.metaTitle || "",
            metaDescription: sub.metaDescription || "",
            order: sub.order || 0,
            isActive: sub.isActive,
            process: sub.process || [],
            benefits: sub.benefits || [],
            faqs: sub.faqs || []
        });
        setIsDialogOpen(true);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const url = await uploadImageToCloudinary(file);
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, { url, caption: "", order: prev.images.length }]
            }));
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const addFeature = () => {
        if (featureInput.trim()) {
            setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
            setFeatureInput("");
        }
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.category) {
            toast.error("Please select a category");
            return;
        }

        const dataToSubmit = {
            ...formData,
            // Ensure category is sent as ID string
            category: formData.category
        };

        if (editingSub) {
            await updateSubcategory.mutateAsync({ id: editingSub.id, ...dataToSubmit });
        } else {
            await createSubcategory.mutateAsync(dataToSubmit);
        }
        setIsDialogOpen(false);
        resetForm();
    };

    if (authLoading || roleLoading) return <div className="min-h-screen flex items-center justify-center"><LuxuryLoader /></div>;
    if (!isAdmin) return null;

    return (
        <>
            <Helmet><title>Project Subcategories | BRIXXSPACE Admin</title></Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => navigate('/admin/projects')}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Project Subcategories</h1>
                            <p className="text-muted-foreground">Manage subcategories within project categories</p>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Plus className="h-4 w-4 mr-2" /> Add Subcategory
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingSub ? "Edit Subcategory" : "Add New Subcategory"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Parent Category</Label>
                                                <Select
                                                    value={formData.category}
                                                    onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                                                >
                                                    <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                                                    <SelectContent>
                                                        {categories?.map(cat => (
                                                            <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input value={formData.title} onChange={handleTitleChange} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Slug</Label>
                                                <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Order</Label>
                                                <Input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })} />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label>Short Description (Card)</Label>
                                                <Textarea value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} required rows={2} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Full Description</Label>
                                                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows={4} />
                                            </div>
                                            <div className="flex items-center gap-2 pt-2">
                                                <Checkbox checked={formData.isActive} onCheckedChange={(c) => setFormData({ ...formData, isActive: c as boolean })} />
                                                <Label>Active</Label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Images Gallery</Label>
                                        <div className="flex gap-2">
                                            <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="hidden" id="img-upload" />
                                            <Label htmlFor="img-upload" className="cursor-pointer bg-secondary text-secondary-foreground px-4 py-2 rounded flex items-center gap-2">
                                                <ImageIcon className="h-4 w-4" /> Upload Image
                                            </Label>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                                            {formData.images.map((img, idx) => (
                                                <div key={idx} className="relative group border rounded p-1">
                                                    <img src={img.url} alt="Gallery" className="w-full h-24 object-cover rounded" />
                                                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-destructive/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Features</Label>
                                        <div className="flex gap-2">
                                            <Input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Add feature" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                                            <Button type="button" onClick={addFeature} variant="secondary">Add</Button>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {formData.features.map((f, i) => (
                                                <Badge key={i} variant="secondary" className="pr-1">
                                                    {f}
                                                    <button type="button" onClick={() => removeFeature(i)} className="ml-2 hover:text-destructive"><X className="h-3 w-3" /></button>
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                        <Button type="submit" className="bg-accent text-accent-foreground" disabled={uploading}>
                                            {editingSub ? "Update" : "Create"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            {subLoading ? <div className="p-8 text-center"><DotsLoader /></div> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Short Desc</TableHead>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Images</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {subcategories?.map((sub) => (
                                            <TableRow key={sub.id}>
                                                <TableCell className="font-medium text-muted-foreground">
                                                    {typeof sub.category === 'object' ? (sub.category as ProjectCategory)?.title : 'Unknown'}
                                                </TableCell>
                                                <TableCell className="font-semibold">{sub.title}</TableCell>
                                                <TableCell className="max-w-xs truncate text-muted-foreground">{sub.shortDescription}</TableCell>
                                                <TableCell>{sub.order}</TableCell>
                                                <TableCell>{sub.images?.length || 0}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(sub)}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Subcategory</AlertDialogTitle>
                                                                    <AlertDialogDescription>Are you sure?</AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction className="bg-destructive" onClick={() => deleteSubcategory.mutate(sub.id)}>Delete</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        {!subcategories?.length && (
                                            <TableRow>
                                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">No subcategories found.</TableCell>
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
