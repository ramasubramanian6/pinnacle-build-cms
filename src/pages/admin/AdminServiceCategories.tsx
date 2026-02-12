import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import {
    useServiceCategories,
    useCreateServiceCategory,
    useUpdateServiceCategory,
    useDeleteServiceCategory,
    ServiceCategory
} from '@/hooks/useServiceCategories';
import { useToast } from '@/hooks/use-toast';

const AdminServiceCategories = () => {
    const { data: categories, isLoading } = useServiceCategories();
    const createMutation = useCreateServiceCategory();
    const updateMutation = useUpdateServiceCategory();
    const deleteMutation = useDeleteServiceCategory();
    const { toast } = useToast();

    const [isEditing, setIsEditing] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Partial<ServiceCategory> | null>(null);

    const handleCreate = () => {
        setEditingCategory({
            title: '',
            slug: '',
            description: '',
            order: 0,
            isActive: true
        });
        setIsEditing(true);
    };

    const handleEdit = (category: ServiceCategory) => {
        setEditingCategory(category);
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!editingCategory) return;

        try {
            if (editingCategory._id) {
                await updateMutation.mutateAsync(editingCategory as ServiceCategory & { id: string });
                toast({ title: 'Category updated successfully' });
            } else {
                await createMutation.mutateAsync(editingCategory);
                toast({ title: 'Category created successfully' });
            }
            setIsEditing(false);
            setEditingCategory(null);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to save category',
                variant: 'destructive'
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category?')) return;

        try {
            await deleteMutation.mutateAsync(id);
            toast({ title: 'Category deleted successfully' });
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to delete category',
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
                    <h1 className="text-3xl font-bold">Service Categories</h1>
                    {!isEditing && (
                        <Button onClick={handleCreate}>
                            <Plus className="w-4 h-4 mr-2" />
                            Add Category
                        </Button>
                    )}
                </div>

                {isEditing && editingCategory && (
                    <div className="bg-black text-white p-6 rounded-lg shadow-md mb-6 border border-slate-700">
                        <h2 className="text-xl font-bold mb-4 text-white">
                            {editingCategory._id ? 'Edit Category' : 'New Category'}
                        </h2>
                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Title</label>
                                <Input
                                    value={editingCategory.title || ''}
                                    onChange={(e) => {
                                        const title = e.target.value;
                                        setEditingCategory({
                                            ...editingCategory,
                                            title,
                                            slug: generateSlug(title)
                                        });
                                    }}
                                    placeholder="Building Construction"
                                    className="bg-slate-900 text-white border-slate-700 placeholder:text-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Slug</label>
                                <Input
                                    value={editingCategory.slug || ''}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })}
                                    placeholder="building-construction"
                                    className="bg-slate-900 text-white border-slate-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Description</label>
                                <Textarea
                                    value={editingCategory.description || ''}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                    placeholder="Comprehensive construction services..."
                                    rows={3}
                                    className="bg-slate-900 text-white border-slate-700"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2 text-white">Order</label>
                                <Input
                                    type="number"
                                    value={editingCategory.order || 0}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, order: parseInt(e.target.value) })}
                                    className="bg-slate-900 text-white border-slate-700"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSave} disabled={!editingCategory.title || !editingCategory.slug}>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                                <Button variant="outline" onClick={() => {
                                    setIsEditing(false);
                                    setEditingCategory(null);
                                }}>
                                    <X className="w-4 h-4 mr-2" />
                                    Cancel
                                </Button>
                            </div>
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
                                    Slug
                                </th>

                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                                    Order
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
                            {categories && categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-slate-900 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-white">{category.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {category.slug}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {category.order}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs rounded-full ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {category.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(category._id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                                        No categories found. Create your first category to get started.
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

export default AdminServiceCategories;
