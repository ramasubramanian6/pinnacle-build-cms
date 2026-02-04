import { useState, useRef } from "react";
import { usePromotions, useCreatePromotion, useDeletePromotion } from "@/hooks/usePromotions";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LuxuryLoader } from "@/components/premium/LuxuryLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Trash2, Image as ImageIcon, ExternalLink } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export default function AdminPromotions() {
    const { data: promotions, isLoading } = usePromotions();
    const createPromotion = useCreatePromotion();
    const deletePromotion = useDeletePromotion();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image_url: "",
        price: "",
        original_price: "",
        discount: "",
        link: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setFormData({
            title: "",
            image_url: "",
            price: "",
            original_price: "",
            discount: "",
            link: "",
        });
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image_url) {
            toast.error("Please upload an image");
            return;
        }

        try {
            await createPromotion.mutateAsync({
                ...formData,
                price: formData.price ? Number(formData.price) : undefined,
                original_price: formData.original_price ? Number(formData.original_price) : undefined,
            });
            toast.success("Promotion added successfully");
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            toast.error("Failed to add promotion");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <LuxuryLoader />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Manage Flash Deals | BRIXXSPACE Admin</title>
            </Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Flash Deals / Promotions</h1>
                            <p className="text-muted-foreground">Manage promotional items for the home page slider</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Deal
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Add New Flash Deal</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title / Product Name</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Premium Tiles"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Current Price (₹)</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                                placeholder="e.g. 1500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="original_price">Original Price (₹)</Label>
                                            <Input
                                                id="original_price"
                                                type="number"
                                                value={formData.original_price}
                                                onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                                                placeholder="e.g. 2000"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="discount">Discount Label</Label>
                                            <Input
                                                id="discount"
                                                value={formData.discount}
                                                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                                placeholder="e.g. 25% OFF"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="link">Link (Optional)</Label>
                                            <Input
                                                id="link"
                                                value={formData.link}
                                                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                placeholder="e.g. https://..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image">Product Image</Label>
                                        <div className="flex flex-col gap-4">
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                disabled={uploading}
                                                ref={fileInputRef}
                                            />
                                            {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                                            {formData.image_url ? (
                                                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border bg-secondary/20">
                                                    <img
                                                        src={formData.image_url}
                                                        alt="Preview"
                                                        className="w-full h-full object-contain"
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="destructive"
                                                        size="icon"
                                                        className="absolute top-2 right-2 h-6 w-6"
                                                        onClick={() => setFormData(prev => ({ ...prev, image_url: "" }))}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="w-full h-32 rounded-lg border border-dashed border-border flex items-center justify-center bg-secondary/50">
                                                    <ImageIcon className="text-muted-foreground h-8 w-8" />
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-accent text-accent-foreground" disabled={uploading}>
                                            {uploading ? "Uploading..." : "Add Deal"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {promotions?.map((promo) => (
                            <Card key={promo.id} className="overflow-hidden group h-full flex flex-col">
                                <div className="relative aspect-square bg-gray-50 border-b">
                                    <img
                                        src={promo.image_url}
                                        alt={promo.title || "Promo"}
                                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {promo.discount && (
                                        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm">
                                            {promo.discount}
                                        </div>
                                    )}
                                </div>
                                <CardContent className="p-4 flex flex-col flex-1">
                                    <h3 className="font-medium text-sm line-clamp-2 mb-2">{promo.title || "Untitled Promotion"}</h3>
                                    <div className="mt-auto">
                                        <div className="flex items-baseline gap-2 mb-3">
                                            {promo.price && <span className="text-base font-bold">₹{promo.price}</span>}
                                            {promo.original_price && <span className="text-xs text-muted-foreground line-through">₹{promo.original_price}</span>}
                                        </div>
                                        <div className="flex gap-2">
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="sm" className="w-full h-8">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this promotion?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            className="bg-destructive text-destructive-foreground"
                                                            onClick={() => deletePromotion.mutate(promo.id)}
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        {!promotions?.length && (
                            <div className="col-span-full py-12 text-center text-muted-foreground bg-secondary/20 rounded-lg border border-dashed border-border">
                                <p>No flash deals active.</p>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
