import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useBlogs, useCreateBlog, useUpdateBlog, useDeleteBlog, Blog } from "@/hooks/useBlogs";
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
import { Plus, Pencil, Trash2, Calendar, Star } from "lucide-react";

export default function AdminBlogs() {
    const { user, loading: authLoading } = useAuth();
    const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
    const { data: blogs, isLoading: blogsLoading } = useBlogs();
    const createBlog = useCreateBlog();
    const updateBlog = useUpdateBlog();
    const deleteBlog = useDeleteBlog();
    const navigate = useNavigate();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [formData, setFormData] = useState<{
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        author: string;
        date: string;
        read_time: string;
        category: string;
        featured: boolean;
        image_url: string;
    }>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "Brixx Space Team",
        date: new Date().toISOString().split('T')[0],
        read_time: "5 min read",
        category: "Industry Insights",
        featured: false,
        image_url: "",
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
            excerpt: "",
            content: "",
            author: "Brixx Space Team",
            date: new Date().toISOString().split('T')[0],
            read_time: "5 min read",
            category: "Industry Insights",
            featured: false,
            image_url: "",
        });
        setEditingBlog(null);
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt || "",
            content: blog.content || "",
            author: blog.author || "Brixx Space Team",
            date: blog.date || new Date().toISOString().split('T')[0],
            read_time: blog.read_time || "5 min read",
            category: blog.category || "General",
            featured: blog.featured || false,
            image_url: blog.image_url || "",
        });
        setIsDialogOpen(true);
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const blogData = { ...formData };

        if (editingBlog) {
            await updateBlog.mutateAsync({ id: editingBlog.id, ...blogData });
        } else {
            await createBlog.mutateAsync(blogData);
        }
        setIsDialogOpen(false);
        resetForm();
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
                <title>Manage Blogs | BRIXXSPACE Admin</title>
            </Helmet>
            <AdminLayout>
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
                            <p className="text-muted-foreground">Manage your blog content</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                            <DialogTrigger asChild>
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="add-blog-btn">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Post
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingBlog ? "Edit Blog Post" : "Add New Blog Post"}</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Title</Label>
                                            <Input
                                                id="title"
                                                value={formData.title}
                                                onChange={handleTitleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="slug">Slug</Label>
                                            <Input
                                                id="slug"
                                                value={formData.slug}
                                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="excerpt">Excerpt</Label>
                                        <Textarea
                                            id="excerpt"
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            rows={2}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea
                                            id="content"
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={6}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="author">Author</Label>
                                            <Input
                                                id="author"
                                                value={formData.author}
                                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="date">Date</Label>
                                            <Input
                                                id="date"
                                                type="date"
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="category">Category</Label>
                                            <Input
                                                id="category"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="read_time">Read Time</Label>
                                            <Input
                                                id="read_time"
                                                value={formData.read_time}
                                                onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                                                placeholder="e.g. 5 min read"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="image_url">Image URL</Label>
                                        <Input
                                            id="image_url"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="featured"
                                            checked={formData.featured}
                                            onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                                        />
                                        <Label htmlFor="featured">Featured Post</Label>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" className="bg-accent text-accent-foreground">
                                            {editingBlog ? "Update" : "Create"}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>

                    <Card className="bg-card border-border">
                        <CardContent className="p-0">
                            {blogsLoading ? (
                                <div className="p-8 text-center">
                                    <DotsLoader />
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-border">
                                            <TableHead className="text-muted-foreground w-[400px]">Title</TableHead>
                                            <TableHead className="text-muted-foreground">Category</TableHead>
                                            <TableHead className="text-muted-foreground">Date</TableHead>
                                            <TableHead className="text-muted-foreground">Status</TableHead>
                                            <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {blogs?.map((blog) => (
                                            <TableRow key={blog.id} className="border-border">
                                                <TableCell className="font-medium text-foreground">
                                                    <div className="line-clamp-1">{blog.title}</div>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{blog.category}</TableCell>
                                                <TableCell className="text-muted-foreground flex items-center gap-2">
                                                    <Calendar className="w-3 h-3" />
                                                    {blog.date}
                                                </TableCell>
                                                <TableCell>
                                                    {blog.featured && (
                                                        <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-medium bg-amber-500/10 px-2 py-1 rounded">
                                                            <Star className="w-3 h-3 fill-amber-500" /> Featured
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button size="icon" variant="ghost" onClick={() => handleEdit(blog)} data-testid={`edit-blog-${blog.id}`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button size="icon" variant="ghost" className="text-destructive" data-testid={`delete-blog-${blog.id}`}>
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        className="bg-destructive text-destructive-foreground"
                                                                        onClick={() => deleteBlog.mutate(blog.id)}
                                                                        data-testid="confirm-delete-btn"
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
                                        {!blogs?.length && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                                    No blog posts found. Add your first post!
                                                </TableCell>
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
