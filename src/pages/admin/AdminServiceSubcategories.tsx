import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';
import {
    useServiceSubcategories,
    useCreateServiceSubcategory,
    useUpdateServiceSubcategory,
    useDeleteServiceSubcategory,
    ServiceSubcategory
} from '@/hooks/useServiceSubcategories';
import { useServiceCategories } from '@/hooks/useServiceCategories';
import { useToast } from '@/hooks/use-toast';

const AdminServiceSubcategories = () => {
    const { data: subcategories, isLoading } = useServiceSubcategories();
    const { data: categories } = useServiceCategories();
    const createMutation = useCreateServiceSubcategory();
    const updateMutation = useUpdateServiceSubcategory();
    const deleteMutation = useDeleteServiceSubcategory();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [editingSubcategory, setEditingSubcategory] = useState<Partial<ServiceSubcategory> | null>(null);

    const handleCreate = () => {
        setEditingSubcategory({
            category: '',
            title: '',
            slug: '',
            shortDescription: '',
            description: '',
            images: [],
            features: [],
            order: 0,
            isActive: true,
            // Enhanced Content
            featuresDescription: '',
            process: [],
            benefits: [],
            faqs: []
        });
        setIsEditing(true);
    };

    const handleEdit = (subcategory: ServiceSubcategory) => {
        setEditingSubcategory({
            ...subcategory,
            category: typeof subcategory.category === 'object' ? subcategory.category._id : subcategory.category
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!editingSubcategory) return;

        try {
            if (editingSubcategory._id) {
                await updateMutation.mutateAsync(editingSubcategory as ServiceSubcategory & { id: string });
                toast({ title: 'Subcategory updated successfully' });
            } else {
                await createMutation.mutateAsync(editingSubcategory);
                toast({ title: 'Subcategory created successfully' });
            }
            setIsEditing(false);
            setEditingSubcategory(null);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to save subcategory',
                variant: 'destructive'
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this subcategory?')) return;

        try {
            await deleteMutation.mutateAsync(id);
            toast({ title: 'Subcategory deleted successfully' });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to delete subcategory',
                variant: 'destructive'
            });
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };


    const addImage = () => {
        if (!editingSubcategory) return;

        // Open Cloudinary upload widget
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

        if (!cloudName || !uploadPreset) {
            toast({
                title: 'Configuration Error',
                description: 'Cloudinary settings are missing. Please check your .env file.',
                variant: 'destructive'
            });
            return;
        }

        // @ts-ignore - Cloudinary widget
        if (window.cloudinary) {
            // @ts-ignore
            const widget = window.cloudinary.createUploadWidget(
                {
                    cloudName: cloudName,
                    uploadPreset: uploadPreset,
                    sources: ['local', 'url', 'camera'],
                    multiple: false,
                    maxFiles: 1,
                    folder: 'service-subcategories',
                    clientAllowedFormats: ['jpg', 'jpeg', 'png', 'webp'],
                    maxFileSize: 5000000, // 5MB
                },
                (error: any, result: any) => {
                    if (error) {
                        toast({
                            title: 'Upload Error',
                            description: error.message || 'Failed to upload image',
                            variant: 'destructive'
                        });
                        return;
                    }

                    if (result.event === 'success') {
                        const caption = prompt('Enter image caption (optional):') || '';
                        setEditingSubcategory({
                            ...editingSubcategory,
                            images: [
                                ...(editingSubcategory.images || []),
                                {
                                    url: result.info.secure_url,
                                    caption,
                                    order: editingSubcategory.images?.length || 0
                                }
                            ]
                        });
                        toast({ title: 'Image uploaded successfully!' });
                    }
                }
            );
            widget.open();
        } else {
            toast({
                title: 'Error',
                description: 'Cloudinary widget not loaded. Please refresh the page.',
                variant: 'destructive'
            });
        }
    };

    const removeImage = (index: number) => {
        if (!editingSubcategory) return;
        const images = [...(editingSubcategory.images || [])];
        images.splice(index, 1);
        setEditingSubcategory({ ...editingSubcategory, images });
    };

    const addFeature = () => {
        if (!editingSubcategory) return;
        const feature = prompt('Enter feature:');
        if (!feature) return;

        setEditingSubcategory({
            ...editingSubcategory,
            features: [...(editingSubcategory.features || []), feature]
        });
    };

    const removeFeature = (index: number) => {
        if (!editingSubcategory) return;
        const features = [...(editingSubcategory.features || [])];
        features.splice(index, 1);
        setEditingSubcategory({ ...editingSubcategory, features });
    };

    // Helper for array fields (process, benefits, faqs)
    const addArrayItem = (field: 'process' | 'benefits' | 'faqs') => {
        if (!editingSubcategory) return;
        const current = editingSubcategory[field] || [];
        const newItem = field === 'faqs'
            ? { question: '', answer: '' }
            : { title: '', description: '' };

        setEditingSubcategory({
            ...editingSubcategory,
            [field]: [...current, newItem]
        });
    };

    const updateArrayItem = (field: 'process' | 'benefits' | 'faqs', index: number, key: string, value: string) => {
        if (!editingSubcategory) return;
        const current = [...(editingSubcategory[field] || [])];
        // @ts-ignore
        current[index] = { ...current[index], [key]: value };
        setEditingSubcategory({
            ...editingSubcategory,
            [field]: current
        });
    };

    const removeArrayItem = (field: 'process' | 'benefits' | 'faqs', index: number) => {
        if (!editingSubcategory) return;
        const current = [...(editingSubcategory[field] || [])];
        current.splice(index, 1);
        setEditingSubcategory({
            ...editingSubcategory,
            [field]: current
        });
    };

    if (isLoading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Service Subcategories</h1>
                    {!isEditing && (
                        <Button onClick={handleCreate}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Subcategory
                        </Button>
                    )}
                </div>

                {isEditing && editingSubcategory && (
                    <div className="bg-black text-white p-6 rounded-lg shadow-md mb-6 max-w-4xl border border-slate-700">
                        <h2 className="text-xl font-bold mb-6 text-white border-b border-slate-700 pb-3">
                            {editingSubcategory._id ? 'Edit Service' : 'New Service'}
                        </h2>
                        <div className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Category</label>
                                <select
                                    className="w-full border border-slate-700 bg-slate-900 text-white rounded-md p-2"
                                    value={editingSubcategory.category as string || ''}
                                    onChange={(e) => setEditingSubcategory({ ...editingSubcategory, category: e.target.value })}
                                >
                                    <option value="">Select a category</option>
                                    {categories?.map((cat) => (
                                        <option key={cat.id} value={cat._id}>{cat.title}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Title</label>
                                <Input
                                    value={editingSubcategory.title || ''}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        setEditingSubcategory({
                                            ...editingSubcategory,
                                            title,
                                            slug: generateSlug(title)
                                        });
                                    }}
                                    placeholder="Commercial"
                                    className="bg-slate-900 text-white border-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Slug</label>
                                <Input
                                    value={editingSubcategory.slug || ''}
                                    onChange={(e) => setEditingSubcategory({ ...editingSubcategory, slug: e.target.value })}
                                    placeholder="commercial"
                                    className="bg-slate-900 text-white border-slate-700"
                                />
                            </div>
                            {/* Basic Information */}
                            <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-semibold text-accent">Basic Information</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Service Name</label>
                                    <Input
                                        value={editingSubcategory.title || ''}
                                        onChange={(e) => {
                                            const title = e.target.value;
                                            setEditingSubcategory({
                                                ...editingSubcategory,
                                                title,
                                                slug: generateSlug(title)
                                            });
                                        }}
                                        placeholder="e.g., Commercial Construction"
                                        className="bg-slate-900 text-white border-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">URL Slug</label>
                                    <Input
                                        value={editingSubcategory.slug || ''}
                                        onChange={(e) => setEditingSubcategory({ ...editingSubcategory, slug: e.target.value })}
                                        placeholder="commercial-construction"
                                        className="bg-slate-900 text-white border-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Service Overview */}
                            <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-semibold text-accent">Service Overview</h3>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">Brief Summary (for cards)</label>
                                    <Textarea
                                        value={editingSubcategory.shortDescription || ''}
                                        onChange={(e) => setEditingSubcategory({ ...editingSubcategory, shortDescription: e.target.value })}
                                        placeholder="A short, compelling summary that appears on service cards..."
                                        rows={2}
                                        className="bg-slate-900 text-white border-slate-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-white">About This Service (Hero Section)</label>
                                    <Textarea
                                        value={editingSubcategory.description || ''}
                                        onChange={(e) => setEditingSubcategory({ ...editingSubcategory, description: e.target.value })}
                                        placeholder="Detailed description that appears at the top of the service page..."
                                        rows={3}
                                        className="bg-slate-900 text-white border-slate-700"
                                    />
                                </div>
                            </div>

                            {/* Service Photos */}
                            <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-semibold text-accent">Service Photos</h3>
                                <p className="text-sm text-slate-400">Upload 4-5 high-quality images showcasing this service</p>
                                <label className="block text-sm font-medium mb-2 text-white">Photo Gallery</label>
                                <div className="space-y-2">
                                    {editingSubcategory.images?.map((image, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 bg-slate-800 rounded border border-slate-700">
                                            <img
                                                src={image.url}
                                                alt={image.caption || 'Preview'}
                                                className="w-20 h-20 object-cover rounded border border-slate-600"
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/80?text=Error';
                                                }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-white font-medium truncate">{image.caption || 'No caption'}</p>
                                                <p className="text-xs text-slate-400 truncate">{image.url}</p>
                                            </div>
                                            <Button variant="ghost" size="sm" onClick={() => removeImage(index)} className="hover:bg-red-900/20">
                                                <X className="w-4 h-4 text-red-400" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={addImage}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Image
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* What We Offer */}
                        <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <h3 className="text-lg font-semibold text-accent">What We Offer</h3>
                            <p className="text-sm text-slate-400">Key features and benefits of this service</p>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Features Description</label>
                                <Textarea
                                    value={editingSubcategory.featuresDescription || ''}
                                    onChange={(e) => setEditingSubcategory({ ...editingSubcategory, featuresDescription: e.target.value })}
                                    placeholder="Brief intro to the features section..."
                                    className="bg-slate-900 text-white border-slate-700 mb-4"
                                />
                            </div>

                            <label className="block text-sm font-medium mb-2 text-white">Service Features List</label>
                            <div className="space-y-2 mb-6">
                                {editingSubcategory.features?.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 p-2 bg-slate-800 rounded">
                                        <span className="flex-1 text-sm">{feature}</span>
                                        <Button variant="ghost" size="sm" onClick={() => removeFeature(index)}>
                                            <X className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button variant="outline" size="sm" onClick={addFeature}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Feature
                                </Button>
                            </div>

                            {/* Process Section */}
                            <div className="border-t border-slate-700 pt-4">
                                <h4 className="text-md font-medium text-white mb-2">Our Process</h4>
                                <div className="space-y-4">
                                    {editingSubcategory.process?.map((item, index) => (
                                        <div key={index} className="p-3 bg-slate-800 rounded border border-slate-700 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">Step {index + 1}</span>
                                                <Button variant="ghost" size="sm" onClick={() => removeArrayItem('process', index)}>
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={item.title}
                                                onChange={(e) => updateArrayItem('process', index, 'title', e.target.value)}
                                                placeholder="Step Title"
                                                className="bg-slate-900 text-white border-slate-600"
                                            />
                                            <Textarea
                                                value={item.description}
                                                onChange={(e) => updateArrayItem('process', index, 'description', e.target.value)}
                                                placeholder="Step Description"
                                                rows={2}
                                                className="bg-slate-900 text-white border-slate-600"
                                            />
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => addArrayItem('process')}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Process Step
                                    </Button>
                                </div>
                            </div>

                            {/* Benefits Section */}
                            <div className="border-t border-slate-700 pt-4 mt-4">
                                <h4 className="text-md font-medium text-white mb-2">Why Choose Us (Benefits)</h4>
                                <div className="space-y-4">
                                    {editingSubcategory.benefits?.map((item, index) => (
                                        <div key={index} className="p-3 bg-slate-800 rounded border border-slate-700 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">Benefit {index + 1}</span>
                                                <Button variant="ghost" size="sm" onClick={() => removeArrayItem('benefits', index)}>
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={item.title}
                                                onChange={(e) => updateArrayItem('benefits', index, 'title', e.target.value)}
                                                placeholder="Benefit Title"
                                                className="bg-slate-900 text-white border-slate-600"
                                            />
                                            <Textarea
                                                value={item.description}
                                                onChange={(e) => updateArrayItem('benefits', index, 'description', e.target.value)}
                                                placeholder="Benefit Description"
                                                rows={2}
                                                className="bg-slate-900 text-white border-slate-600"
                                            />
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => addArrayItem('benefits')}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add Benefit
                                    </Button>
                                </div>
                            </div>

                            {/* FAQS Section */}
                            <div className="border-t border-slate-700 pt-4 mt-4">
                                <h4 className="text-md font-medium text-white mb-2">Frequently Asked Questions</h4>
                                <div className="space-y-4">
                                    {editingSubcategory.faqs?.map((item, index) => (
                                        <div key={index} className="p-3 bg-slate-800 rounded border border-slate-700 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">FAQ {index + 1}</span>
                                                <Button variant="ghost" size="sm" onClick={() => removeArrayItem('faqs', index)}>
                                                    <X className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <Input
                                                value={item.question}
                                                onChange={(e) => updateArrayItem('faqs', index, 'question', e.target.value)}
                                                placeholder="Question"
                                                className="bg-slate-900 text-white border-slate-600"
                                            />
                                            <Textarea
                                                value={item.answer}
                                                onChange={(e) => updateArrayItem('faqs', index, 'answer', e.target.value)}
                                                placeholder="Answer"
                                                rows={2}
                                                className="bg-slate-900 text-white border-slate-600"
                                            />
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={() => addArrayItem('faqs')}>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add FAQ
                                    </Button>
                                </div>
                            </div>

                        </div>

                        {/* Detailed Information */}
                        <div className="space-y-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <h3 className="text-lg font-semibold text-accent">Detailed Information</h3>
                            <p className="text-sm text-slate-400">Comprehensive content about this service</p>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Content Heading (Optional)</label>
                                <Input
                                    value={editingSubcategory.contentHeading || ''}
                                    onChange={(e) => setEditingSubcategory({ ...editingSubcategory, contentHeading: e.target.value })}
                                    placeholder="e.g., Why Choose Us?"
                                    className="bg-slate-900 text-white border-slate-700"
                                />
                            </div>
                            <label className="block text-sm font-medium mb-2 text-white">Full Service Description</label>
                            <Textarea
                                value={editingSubcategory.content || ''}
                                onChange={(e) => setEditingSubcategory({ ...editingSubcategory, content: e.target.value })}
                                placeholder="Enter detailed content about this service. You can use multiple paragraphs..."
                                rows={5}
                                className="bg-slate-900 text-white border-slate-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-white">Order</label>
                            <Input
                                type="number"
                                value={editingSubcategory.order || 0}
                                onChange={(e) => setEditingSubcategory({ ...editingSubcategory, order: parseInt(e.target.value) })}
                                className="bg-slate-900 text-white border-slate-700"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button
                                onClick={handleSave}
                                disabled={!editingSubcategory.title || !editingSubcategory.category || !editingSubcategory.shortDescription}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save
                            </Button>
                            <Button variant="outline" onClick={() => {
                                setIsEditing(false);
                                setEditingSubcategory(null);
                            }}>
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                )}

                <div className="bg-black border border-slate-700 rounded-lg shadow-md overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-900 border-b border-slate-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                    Images
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {subcategories && subcategories.length > 0 ? (
                                subcategories.map((subcategory) => (
                                    <tr key={subcategory.id} className="hover:bg-slate-900 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-white">{subcategory.title}</div>
                                            <div className="text-sm text-slate-400">{subcategory.slug}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {typeof subcategory.category === 'object' ? subcategory.category.title : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {subcategory.images?.length || 0} images
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${subcategory.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {subcategory.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(subcategory)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(subcategory._id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                                        No subcategories found. Create your first subcategory to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminServiceSubcategories;
