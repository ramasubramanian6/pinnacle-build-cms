import { useState, useEffect, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useAdmin";
import { useProjects, Project, useCreateProject, useUpdateProject, useDeleteProject } from "@/hooks/useProjects";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LuxuryLoader, DotsLoader } from "@/components/premium/LuxuryLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminProjects() {
  const { user, loading: authLoading } = useAuth();
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const navigate = useNavigate();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "Residential",
    status: "ongoing",
    image_url: "",
    featured_image: "",
    gallery: [] as string[],
    progress: 0,
    total_units: 0,
    sold_units: 0,
    featured: false,
    estimated_completion: "",
    start_date: "",
    amenities: "",
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
      location: "",
      category: "Residential",
      status: "ongoing",
      image_url: "",
      featured_image: "",
      gallery: [],
      progress: 0,
      total_units: 0,
      sold_units: 0,
      featured: false,
      estimated_completion: "",
      start_date: "",
      amenities: "",
    });
    setEditingProject(null);
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

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description || "",
      location: project.location,
      category: project.category,
      status: project.status,
      image_url: project.image_url || "",
      featured_image: project.featured_image || "",
      gallery: project.gallery || [],
      progress: project.progress || 0,
      total_units: project.total_units || 0,
      sold_units: project.sold_units || 0,
      featured: project.featured || false,
      estimated_completion: project.estimated_completion || "",
      start_date: project.start_date || "",
      amenities: project.amenities ? project.amenities.join(", ") : "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert amenities string to array
    const amenitiesArray = formData.amenities
      .split(",")
      .map(item => item.trim())
      .filter(item => item !== "");

    const submissionData = {
      ...formData,
      amenities: amenitiesArray
    };

    if (editingProject) {
      await updateProject.mutateAsync({ id: editingProject.id, ...submissionData });
    } else {
      await createProject.mutateAsync(submissionData);
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
        <title>Manage Projects | BRIXXSPACE Admin</title>
      </Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground">Manage your construction projects</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90" data-testid="add-project-btn">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Residential">Residential</SelectItem>
                          <SelectItem value="Commercial">Commercial</SelectItem>
                          <SelectItem value="Industrial">Industrial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ongoing">Ongoing</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="planned">Planned</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="progress">Progress (%)</Label>
                      <Input
                        id="progress"
                        type="number"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total_units">Total Units</Label>
                      <Input
                        id="total_units"
                        type="number"
                        min="0"
                        value={formData.total_units}
                        onChange={(e) => setFormData({ ...formData, total_units: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sold_units">Sold Units</Label>
                      <Input
                        id="sold_units"
                        type="number"
                        min="0"
                        value={formData.sold_units}
                        onChange={(e) => setFormData({ ...formData, sold_units: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amenities">Amenities (comma separated)</Label>
                    <Textarea
                      id="amenities"
                      placeholder="e.g. Swimming Pool, Gym, 24/7 Security"
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date</Label>
                      <Input
                        id="start_date"
                        type="date"
                        value={formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimated_completion">Estimated Completion Date</Label>
                      <Input
                        id="estimated_completion"
                        type="date"
                        value={formData.estimated_completion ? new Date(formData.estimated_completion).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, estimated_completion: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Project Image</Label>
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
                      {formData.image_url && (
                        <div className="relative w-full h-40 rounded-lg overflow-hidden border border-border">
                          <img
                            src={formData.image_url}
                            alt="Project Preview"
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
                      )}
                      {/* Hidden Input to store URL just in case */}
                      <Input
                        type="hidden"
                        value={formData.image_url}
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border rounded-lg p-4 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="featured">Featured on Home Page</Label>
                        <p className="text-sm text-muted-foreground">Pin this project to the home page featured section</p>
                      </div>
                      <Switch
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                      />
                    </div>

                    {formData.featured && (
                      <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2">
                        <Label htmlFor="featured_image">Featured Image (Home Page Display)</Label>
                        <div className="flex flex-col gap-4">
                          <Input
                            id="featured_image"
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploading(true);
                              try {
                                const url = await uploadImageToCloudinary(file);
                                setFormData(prev => ({ ...prev, featured_image: url }));
                                toast.success("Featured image uploaded");
                              } catch (error) {
                                toast.error("Failed to upload featured image");
                              } finally {
                                setUploading(false);
                              }
                            }}
                            disabled={uploading}
                          />
                          {formData.featured_image && (
                            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border">
                              <img src={formData.featured_image} alt="Featured Preview" className="w-full h-full object-cover" />
                              <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-6 w-6" onClick={() => setFormData(prev => ({ ...prev, featured_image: "" }))}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gallery">Gallery Images (Max 5)</Label>
                    <div className="flex flex-col gap-4">
                      <Input
                        id="gallery"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length === 0) return;
                          setUploading(true);
                          try {
                            const uploadPromises = files.map(file => uploadImageToCloudinary(file));
                            const urls = await Promise.all(uploadPromises);
                            setFormData(prev => ({ ...prev, gallery: [...(prev.gallery || []), ...urls].slice(0, 5) }));
                            toast.success(`${urls.length} images uploaded`);
                          } catch (error) {
                            toast.error("Failed to upload images");
                          } finally {
                            setUploading(false);
                          }
                        }}
                        disabled={uploading || (formData.gallery?.length || 0) >= 5}
                      />
                      <div className="grid grid-cols-5 gap-2">
                        {formData.gallery?.map((url, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-border group">
                            <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-accent text-accent-foreground">
                      {editingProject ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="bg-card border-border">
            <CardContent className="p-0">
              {projectsLoading ? (
                <div className="p-8 text-center">
                  <DotsLoader />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-muted-foreground">Title</TableHead>
                      <TableHead className="text-muted-foreground">Location</TableHead>
                      <TableHead className="text-muted-foreground">Category</TableHead>
                      <TableHead className="text-muted-foreground">Status</TableHead>
                      <TableHead className="text-muted-foreground">Progress</TableHead>
                      <TableHead className="text-muted-foreground text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects?.map((project) => (
                      <TableRow key={project.id} className="border-border">
                        <TableCell className="font-medium text-foreground">{project.title}</TableCell>
                        <TableCell className="text-muted-foreground">{project.location}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{project.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              project.status === "completed"
                                ? "bg-green-500/10 text-green-400"
                                : project.status === "ongoing"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : "bg-orange-500/10 text-orange-400"
                            }
                          >
                            {project.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{project.progress || 0}%</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(project)} data-testid={`edit-project-${project.id}`}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="icon" variant="ghost" className="text-destructive" data-testid={`delete-project-${project.id}`}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{project.title}"? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-destructive text-destructive-foreground"
                                    onClick={() => deleteProject.mutate(project.id)}
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
