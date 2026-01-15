import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial, Testimonial } from "@/hooks/useTestimonials";
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
import { Plus, Pencil, Trash2, Star, Quote } from "lucide-react";

export default function AdminTestimonials() {
    const { user, loading: authLoading } = useAuth();
    const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
    const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();
    const createTestimonial = useCreateTestimonial();
    const updateTestimonial = useUpdateTestimonial();
    const deleteTestimonial = useDeleteTestimonial();
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        rating: 5,
        avatar_url: "",
        featured: false,
    });

    useEffect(() => {
        if (!authLoading && !user) navigate("/auth");
    }, [user, authLoading, navigate]);

    useEffect(() => {
        if (!roleLoading && isAdmin === false) navigate("/dashboard");
    }, [isAdmin, roleLoading, navigate]);

    const resetForm = () => {
        setFormData({
            name: "",
            role: "",
            content: "",
            rating: 5,
            avatar_url: "",
            featured: false,
        });
        setEditingTestimonial(null);
    };

    const handleEdit = (t: Testimonial) => {
        setEditingTestimonial(t);
        setFormData({
            name: t.name,
            role: t.role,
            content: t.content,
            rating: t.rating,
            avatar_url: t.avatar_url || "",
            featured: t.featured,
        });
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingTestimonial) {
            await updateTestimonial.mutateAsync({ id: editingTestimonial.id, ...formData });
        } else {
            await createTestimonial.mutateAsync(formData);
        }
        setIsDialogOpen(false);
        resetForm();
    };

    const StarRating = ({ rating, onRatingChange, interactive = false }: { rating: number, onRatingChange?: (r: number) => void, interactive?: boolean }) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onRatingChange?.(star)}
                    className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
                >
                    <Star
                        className={`w-5 h-5 ${star <= rating ? "fill-amber-500 text-amber-500" : "text-slate-300"}`}
                    />
                </button>
            ))}
        </div>
    );

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
                <title>Manage Testimonials | BRIXXSPACE Admin</title>
            </Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Client Testimonials</h1>
                            <p className="text-muted-foreground">Manage client reviews and feedback</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Testimonial
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Client Name</Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="role">Role / Company</Label>
                                            <Input
                                                id="role"
                                                value={formData.role}
                                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="content">Testimonial Content</Label>
                                        <Textarea
                                            id="content"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={4}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Rating</Label>
                                            <StarRating
                                                rating={formData.rating}
                                                onRatingChange={(r) => setFormData({ ...formData, rating: r })}
                                                interactive
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 pt-6">
                                            <Checkbox
                                                id="featured"
                                                checked={formData.featured}
                                                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                                            />
                                            <Label htmlFor="featured">Featured Testimonial</Label>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="avatar_url">Avatar URL</Label>
                                        <Input
                                            id="avatar_url"
                                            value={formData.avatar_url}
                                            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 pt-4">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-accent text-accent-foreground">
                                            {editingTestimonial ? "Update" : "Create"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            {testimonialsLoading ? (
                                <div className="p-8 text-center">
                                    <DotsLoader />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border">
                                            <TableHead className="text-muted-foreground">Client</TableHead>
                                            <TableHead className="text-muted-foreground">Rating</TableHead>
                                            <TableHead className="text-muted-foreground">Featured</TableHead>
                                            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {testimonials?.map((t) => (
                                            <TableRow key={t.id} className="border-border">
                                                <TableCell className="font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="text-foreground">{t.name}</span>
                                                        <span className="text-xs text-muted-foreground">{t.role}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <StarRating rating={t.rating} />
                                                </TableCell>
                                                <TableCell>
                                                    {t.featured && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-medium bg-amber-500/10 px-2 py-1 rounded">
                                                            <Star className="w-3 h-3 fill-amber-500" /> Featured
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(t)}>
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
                                                                    <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete "{t.name}"'s testimonial? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        className="bg-destructive text-destructive-foreground"
                                                                        onClick={() => deleteTestimonial.mutate(t.id)}
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
