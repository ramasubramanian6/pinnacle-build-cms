import { useState, useRef } from "react";
import { useSliderImages, useCreateSliderImage, useDeleteSliderImage } from "@/hooks/useSliderImages";
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
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";

export default function AdminSliderImages() {
    const { data: sliderImages, isLoading } = useSliderImages();
    const createSliderImage = useCreateSliderImage();
    const deleteSliderImage = useDeleteSliderImage();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image_url: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            image_url: "",
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
            await createSliderImage.mutateAsync({
                ...formData,
                order: (sliderImages?.length || 0) + 1
            });
            toast.success("Slider image added successfully");
            setIsDialogOpen(false);
            resetForm();
        } catch (error) {
            toast.error("Failed to add slider image");
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
                <title>Manage Slider Images | BRIXXSPACE Admin</title>
            </Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Slider Images</h1>
                            <p className="text-muted-foreground">Manage images for the home page slider</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Image
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Slider Image</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title (Optional)</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            placeholder="e.g. Modern Architecture"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description (Optional)</Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            placeholder="Short description..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Image</Label>
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
                                                <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                                                    <img
                                                        src={formData.image_url}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
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
                                                <div className="w-full h-40 rounded-lg border border-dashed border-border flex items-center justify-center bg-secondary/50">
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
                                            {uploading ? "Uploading..." : "Add Image"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sliderImages?.map((image) => (
                            <Card key={image.id} className="overflow-hidden group">
                                <div className="relative aspect-video">
                                    <img
                                        src={image.image_url}
                                        alt={image.title || "Slider Image"}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="destructive" size="sm">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete Image</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Are you sure you want to delete this slider image?
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className="bg-destructive text-destructive-foreground"
                                                        onClick={() => deleteSliderImage.mutate(image.id)}
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </div>
                                {(image.title || image.description) && (
                                    <CardContent className="p-4">
                                        {image.title && <h3 className="font-bold text-lg mb-1">{image.title}</h3>}
                                        {image.description && <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>}
                                    </CardContent>
                                )}
                            </Card>
                        ))}
                        {!sliderImages?.length && (
                            <div className="col-span-full py-12 text-center text-muted-foreground bg-secondary/20 rounded-lg border border-dashed border-border">
                                <p>No slider images added yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
