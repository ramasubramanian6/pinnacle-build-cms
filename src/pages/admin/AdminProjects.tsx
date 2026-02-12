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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2, X, Link as LinkIcon, Download } from "lucide-react";

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

  // Initial State for Form
  const initialFormState: any = {
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
    client: "",
    architect: "", // Keeping for backward compatibility or simple display
    area: 0,
    year: new Date().getFullYear(),
    cost: "",
    content: "",
    embedded_video: "",
    // New Fields
    episodes: [],
    ebook: {
      title: "",
      pages: 0,
      images: 0,
      drawings: 0,
      size: "",
      url: ""
    },
    products: [],
    team: {
      principalArchitect: "",
      firm: "",
      architect_image: "",
      designTeam: [],
      photoCredit: "",
      cinematographer: "",
      structuralConsultant: "",
      otherConsultants: []
    },
    extended_info: {
      plotArea: "",
      facing: "",
      vastu: "",
      rooms: 0,
      parking: 0,
      floors: 0
    }
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!roleLoading && isAdmin === false) navigate("/dashboard");
  }, [isAdmin, roleLoading, navigate]);

  const resetForm = () => {
    setFormData(initialFormState);
    setEditingProject(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string = 'image_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setFormData((prev: any) => ({ ...prev, [field]: url }));
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

    // Merge existing project data with initial state to ensure new structure exists
    // Handle potential missing nested objects
    const episodes = project.episodes || [];
    const ebook = project.ebook || initialFormState.ebook;
    const products = project.products || [];
    const team = project.team || initialFormState.team;
    const extended_info = project.extended_info || initialFormState.extended_info;

    setFormData({
      ...initialFormState,
      ...project,
      amenities: project.amenities ? project.amenities.join(", ") : "",
      episodes,
      ebook,
      products,
      team,
      extended_info
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert amenities string to array
    const amenitiesArray = typeof formData.amenities === 'string'
      ? formData.amenities.split(",").map((item: string) => item.trim()).filter((item: string) => item !== "")
      : formData.amenities;

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


  // Helper Handlers for Arrays (Episodes, Products, etc.)
  const addEpisode = () => {
    setFormData({
      ...formData,
      episodes: [...formData.episodes, { title: "", duration: "", thumbnail: "", video_url: "", isPremium: false }]
    });
  };

  const updateEpisode = (index: number, field: string, value: any) => {
    const newEpisodes = [...formData.episodes];
    newEpisodes[index] = { ...newEpisodes[index], [field]: value };
    setFormData({ ...formData, episodes: newEpisodes });
  };

  const removeEpisode = (index: number) => {
    setFormData({ ...formData, episodes: formData.episodes.filter((_: any, i: number) => i !== index) });
  };

  const addProduct = () => {
    setFormData({
      ...formData,
      products: [...formData.products, { category: "", brand: "", items: [], isPremium: true }]
    });
  };

  const updateProduct = (index: number, field: string, value: any) => {
    const newProducts = [...formData.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setFormData({ ...formData, products: newProducts });
  };

  const removeProduct = (index: number) => {
    setFormData({ ...formData, products: formData.products.filter((_: any, i: number) => i !== index) });
  };


  if (authLoading || roleLoading) return <div className="min-h-screen flex items-center justify-center"><LuxuryLoader /></div>;
  if (!isAdmin) return null;

  return (
    <>
      <Helmet><title>Manage Projects | BRIXXSPACE Admin</title></Helmet>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground">Manage your construction projects & details</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
              <DialogTrigger asChild>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Plus className="h-4 w-4 mr-2" /> Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto w-full">
                <DialogHeader>
                  <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 mb-4">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="extended">Specs</TabsTrigger>
                      <TabsTrigger value="media">Media</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>

                    {/* --- TAB: OVERVIEW --- */}
                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Location</Label>
                          <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Short Description</Label>
                        <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Residential">Residential</SelectItem>
                              <SelectItem value="Commercial">Commercial</SelectItem>
                              <SelectItem value="Industrial">Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
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
                          <Label>Progress (%)</Label>
                          <Input type="number" min="0" max="100" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Total Units</Label>
                          <Input type="number" value={formData.total_units} onChange={(e) => setFormData({ ...formData, total_units: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Sold Units</Label>
                          <Input type="number" value={formData.sold_units} onChange={(e) => setFormData({ ...formData, sold_units: parseInt(e.target.value) || 0 })} />
                        </div>
                      </div>
                      <div className="space-y-2 pt-4 border-t">
                        <Label>Cover Image</Label>
                        <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image_url')} disabled={uploading} />
                        {formData.image_url && <img src={formData.image_url} alt="Preview" className="h-32 w-auto object-cover rounded mt-2" />}
                      </div>
                    </TabsContent>

                    {/* --- TAB: DETAILS --- */}
                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Built-up Area (sq ft)</Label>
                          <Input type="number" value={formData.area} onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) || 0 })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input type="date" value={formData.start_date ? new Date(formData.start_date).toISOString().split('T')[0] : ''} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Completion Year / Date</Label>
                          <Input type="date" value={formData.estimated_completion ? new Date(formData.estimated_completion).toISOString().split('T')[0] : ''} onChange={(e) => setFormData({ ...formData, estimated_completion: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Approx Cost</Label>
                          <Input value={formData.cost} onChange={(e) => setFormData({ ...formData, cost: e.target.value })} placeholder="e.g. 2.5 Cr" />
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t">
                        <h3 className="font-semibold">Team Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Principal Architect</Label>
                            <Input value={formData.team.principalArchitect} onChange={(e) => setFormData({ ...formData, team: { ...formData.team, principalArchitect: e.target.value } })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Firm Name</Label>
                            <Input value={formData.team.firm} onChange={(e) => setFormData({ ...formData, team: { ...formData.team, firm: e.target.value } })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Client Name</Label>
                            <Input value={formData.client} onChange={(e) => setFormData({ ...formData, client: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Photo Credit</Label>
                            <Input value={formData.team.photoCredit} onChange={(e) => setFormData({ ...formData, team: { ...formData.team, photoCredit: e.target.value } })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Cinematographer</Label>
                            <Input value={formData.team.cinematographer} onChange={(e) => setFormData({ ...formData, team: { ...formData.team, cinematographer: e.target.value } })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Architect Photo</Label>
                            <Input type="file" accept="image/*" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploading(true);
                              try {
                                const url = await uploadImageToCloudinary(file, 'image');
                                setFormData((prev: any) => ({ ...prev, team: { ...prev.team, architect_image: url } }));
                                toast.success("Architect photo uploaded!");
                              } catch (err: any) {
                                console.error(err);
                                toast.error(err.message || "Upload failed");
                              }
                              finally { setUploading(false); }
                            }} disabled={uploading} />
                            {formData.team.architect_image && <img src={formData.team.architect_image} className="h-20 w-20 rounded-full mt-2 object-cover" />}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* --- TAB: EXTENDED INFO --- */}
                    <TabsContent value="extended" className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Plot Area</Label>
                          <Input value={formData.extended_info.plotArea} onChange={(e) => setFormData({ ...formData, extended_info: { ...formData.extended_info, plotArea: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Facing</Label>
                          <Select value={formData.extended_info.facing} onValueChange={(v) => setFormData({ ...formData, extended_info: { ...formData.extended_info, facing: v } })}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="North">North</SelectItem>
                              <SelectItem value="South">South</SelectItem>
                              <SelectItem value="East">East</SelectItem>
                              <SelectItem value="West">West</SelectItem>
                              <SelectItem value="North-East">North-East</SelectItem>
                              <SelectItem value="North-West">North-West</SelectItem>
                              <SelectItem value="South-East">South-East</SelectItem>
                              <SelectItem value="South-West">South-West</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Vastu Compliant</Label>
                          <Select value={formData.extended_info.vastu} onValueChange={(v) => setFormData({ ...formData, extended_info: { ...formData.extended_info, vastu: v } })}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Yes">Yes</SelectItem>
                              <SelectItem value="No">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>No. of Rooms</Label>
                          <Input type="number" value={formData.extended_info.rooms} onChange={(e) => setFormData({ ...formData, extended_info: { ...formData.extended_info, rooms: parseInt(e.target.value) || 0 } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Car Parking</Label>
                          <Input type="number" value={formData.extended_info.parking} onChange={(e) => setFormData({ ...formData, extended_info: { ...formData.extended_info, parking: parseInt(e.target.value) || 0 } })} />
                        </div>
                        <div className="space-y-2">
                          <Label>Floors</Label>
                          <Input type="number" value={formData.extended_info.floors} onChange={(e) => setFormData({ ...formData, extended_info: { ...formData.extended_info, floors: parseInt(e.target.value) || 0 } })} />
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <Label>Detailed Amenities</Label>
                        <Textarea value={formData.amenities} onChange={(e) => setFormData({ ...formData, amenities: e.target.value })} placeholder="Swimming Pool, Gym, etc." />
                      </div>
                    </TabsContent>

                    {/* --- TAB: MEDIA --- */}
                    <TabsContent value="media" className="space-y-6">
                      <div className="space-y-2">
                        <Label>Gallery Images</Label>
                        <Input type="file" multiple accept="image/*" onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (!files.length) return;
                          setUploading(true);
                          try {
                            const urls = await Promise.all(files.map(f => uploadImageToCloudinary(f)));
                            setFormData((prev: any) => ({ ...prev, gallery: [...prev.gallery, ...urls].slice(0, 8) }));
                          } catch (err) { toast.error("Upload failed"); } finally { setUploading(false); }
                        }} disabled={uploading} />
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {formData.gallery.map((url: string, idx: number) => (
                            <div key={idx} className="relative aspect-square border rounded overflow-hidden group">
                              <img src={url} className="w-full h-full object-cover" />
                              <button type="button" onClick={() => setFormData((prev: any) => ({ ...prev, gallery: prev.gallery.filter((_: any, i: number) => i !== idx) }))} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100">
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <Label className="text-lg">Episodes (Videos)</Label>
                          <Button type="button" size="sm" onClick={addEpisode} variant="secondary"><Plus size={14} className="mr-1" /> Add Episode</Button>
                        </div>
                        {formData.episodes.map((ep: any, idx: number) => (
                          <div key={idx} className="grid grid-cols-12 gap-2 mb-4 items-end border p-3 rounded bg-muted/20">
                            <div className="col-span-12 md:col-span-3 space-y-1">
                              <Label className="text-xs">Title</Label>
                              <Input value={ep.title} onChange={(e) => updateEpisode(idx, 'title', e.target.value)} placeholder="Episode Title" />
                            </div>
                            <div className="col-span-6 md:col-span-2 space-y-1">
                              <Label className="text-xs">Duration</Label>
                              <Input value={ep.duration} onChange={(e) => updateEpisode(idx, 'duration', e.target.value)} placeholder="MM:SS" />
                            </div>
                            <div className="col-span-6 md:col-span-4 space-y-1">
                              <Label className="text-xs">Video Source</Label>
                              <div className="flex gap-2">
                                <Input value={ep.video_url} onChange={(e) => updateEpisode(idx, 'video_url', e.target.value)} placeholder="URL or Upload" />
                                <div className="relative">
                                  <Input
                                    type="file"
                                    accept="video/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={async (e) => {
                                      const file = e.target.files?.[0];
                                      if (!file) return;
                                      setUploading(true);
                                      try {
                                        const url = await uploadImageToCloudinary(file, 'video');
                                        updateEpisode(idx, 'video_url', url);
                                        toast.success("Video uploaded!");
                                      } catch (err: any) {
                                        console.error(err);
                                        toast.error(err.message || "Video upload failed");
                                      }
                                      finally { setUploading(false); }
                                    }}
                                    disabled={uploading}
                                  />
                                  <Button type="button" variant="outline" size="icon" disabled={uploading} title="Upload Video">
                                    <Download className="h-4 w-4 rotate-180" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-6 md:col-span-2 flex items-center justify-center pb-2">
                              <div className="flex flex-col items-center gap-1">
                                <Label className="text-[10px]">Premium</Label>
                                <Switch checked={ep.isPremium} onCheckedChange={(c) => updateEpisode(idx, 'isPremium', c)} />
                              </div>
                            </div>
                            <div className="col-span-1 pb-1">
                              <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeEpisode(idx)}><Trash2 size={16} /></Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    {/* --- TAB: CONTENT --- */}
                    <TabsContent value="content" className="space-y-6">
                      <div className="space-y-2">
                        <Label>Design Story (Main Content)</Label>
                        <Textarea className="min-h-[300px]" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} placeholder="Full project description..." />
                      </div>

                      <div className="border-t pt-4 space-y-4">
                        <h3 className="font-semibold text-lg">Products Used</h3>
                        <Button type="button" size="sm" onClick={addProduct} variant="secondary"><Plus size={14} className="mr-1" /> Add Product</Button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {formData.products.map((prod: any, idx: number) => (
                            <div key={idx} className="flex gap-2 items-center border p-2 rounded bg-muted/20">
                              <Input className="flex-1" placeholder="Category (e.g. Flooring)" value={prod.category} onChange={(e) => updateProduct(idx, 'category', e.target.value)} />
                              <Input className="flex-1" placeholder="Brand (e.g. Italian Marble)" value={prod.brand} onChange={(e) => updateProduct(idx, 'brand', e.target.value)} />
                              <Switch checked={prod.isPremium} onCheckedChange={(c) => updateProduct(idx, 'isPremium', c)} title="Premium Only?" />
                              <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeProduct(idx)}><Trash2 size={16} /></Button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border-t pt-4 space-y-4">
                        <h3 className="font-semibold text-lg">eBook Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>eBook Title</Label>
                            <Input value={formData.ebook.title} onChange={(e) => setFormData({ ...formData, ebook: { ...formData.ebook, title: e.target.value } })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Download URL / PDF</Label>
                            <div className="flex gap-2">
                              <Input value={formData.ebook.url} onChange={(e) => setFormData({ ...formData, ebook: { ...formData.ebook, url: e.target.value } })} placeholder="PDF URL" />
                              <div className="relative">
                                <Input
                                  type="file"
                                  accept="application/pdf"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    // Auto-calculate size
                                    const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + " MB";

                                    setUploading(true);
                                    try {
                                      const url = await uploadImageToCloudinary(file, 'auto'); // 'auto' for PDFs often works best, or 'raw'
                                      setFormData((prev: any) => ({
                                        ...prev,
                                        ebook: {
                                          ...prev.ebook,
                                          url: url,
                                          size: sizeMB
                                        }
                                      }));
                                      toast.success("PDF uploaded!");
                                    } catch (err) { toast.error("PDF upload failed"); }
                                    finally { setUploading(false); }
                                  }}
                                  disabled={uploading}
                                />
                                <Button type="button" variant="outline" size="icon" disabled={uploading} title="Upload PDF">
                                  <Download className="h-4 w-4 rotate-180" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-2 col-span-2">
                            <Input type="number" placeholder="Pages" value={formData.ebook.pages} onChange={(e) => setFormData({ ...formData, ebook: { ...formData.ebook, pages: parseInt(e.target.value) || 0 } })} />
                            <Input type="number" placeholder="Images" value={formData.ebook.images} onChange={(e) => setFormData({ ...formData, ebook: { ...formData.ebook, images: parseInt(e.target.value) || 0 } })} />
                            <Input type="number" placeholder="Drawings" value={formData.ebook.drawings} onChange={(e) => setFormData({ ...formData, ebook: { ...formData.ebook, drawings: parseInt(e.target.value) || 0 } })} />
                            <Input placeholder="Size (e.g. 25MB)" value={formData.ebook.size} onChange={(e) => setFormData({ ...formData, ebook: { ...formData.ebook, size: e.target.value } })} />
                          </div>
                          <div className="space-y-2 col-span-2">
                            <Label>eBook Cover Image</Label>
                            <Input type="file" accept="image/*" onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploading(true);
                              try {
                                const url = await uploadImageToCloudinary(file, 'image');
                                setFormData((prev: any) => ({ ...prev, ebook: { ...prev.ebook, image: url } }));
                                toast.success("Cover uploaded!");
                              } catch (err) { toast.error("Upload failed"); }
                              finally { setUploading(false); }
                            }} disabled={uploading} />
                            {formData.ebook.image && <img src={formData.ebook.image} className="h-40 w-auto rounded mt-2 object-cover" />}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* --- TAB: ADVANCED --- */}
                    <TabsContent value="advanced" className="space-y-4">
                      <div className="flex items-center justify-between border p-4 rounded">
                        <div className="space-y-0.5">
                          <Label>Featured on Home Page</Label>
                          <p className="text-sm text-muted-foreground">Pin this project to the home page featured section</p>
                        </div>
                        <Switch checked={formData.featured} onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })} />
                      </div>
                      {formData.featured && (
                        <div className="space-y-2">
                          <Label>Featured Image (Landscape)</Label>
                          <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'featured_image')} disabled={uploading} />
                          {formData.featured_image && <img src={formData.featured_image} className="h-40 w-auto rounded mt-2" />}
                        </div>
                      )}
                    </TabsContent>

                  </Tabs>

                  <div className="flex justify-end gap-2 pt-4 border-t">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button type="submit" className="bg-accent text-accent-foreground">{editingProject ? "Update Project" : "Create Project"}</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Project List Table */}
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              {projectsLoading ? <div className="p-8 text-center"><DotsLoader /></div> : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {projects?.map((project: Project) => (
                      <TableRow key={project.id}>
                        <TableCell className="font-medium">{project.title}</TableCell>
                        <TableCell>{project.location}</TableCell>
                        <TableCell><Badge variant="outline" className="capitalize">{project.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" onClick={() => handleEdit(project)}><Pencil className="h-4 w-4" /></Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild><Button size="icon" variant="ghost" className="text-destructive"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>Confirm Delete</AlertDialogTitle><AlertDialogDescription>Are you sure?</AlertDialogDescription></AlertDialogHeader>
                                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => deleteProject.mutate(project.id)} className="bg-destructive">Delete</AlertDialogAction></AlertDialogFooter>
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
