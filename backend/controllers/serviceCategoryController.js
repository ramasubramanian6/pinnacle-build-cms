const ServiceCategory = require('../models/ServiceCategory');

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await ServiceCategory.find({ isActive: true })
            .sort({ order: 1, createdAt: -1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by slug
const getCategoryBySlug = async (req, res) => {
    try {
        const category = await ServiceCategory.findOne({
            slug: req.params.slug,
            isActive: true
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await ServiceCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create category
const createCategory = async (req, res) => {
    try {
        const { title, slug, description, icon, image_url, order, isActive } = req.body;

        // Check if slug already exists
        const existingCategory = await ServiceCategory.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category with this slug already exists' });
        }

        const category = new ServiceCategory({
            title,
            slug,
            description,
            icon,
            image_url,
            order,
            isActive
        });

        const savedCategory = await category.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update category
const updateCategory = async (req, res) => {
    try {
        const { title, slug, description, icon, image_url, order, isActive } = req.body;

        // Check if slug is being changed and if it conflicts
        if (slug) {
            const existingCategory = await ServiceCategory.findOne({
                slug,
                _id: { $ne: req.params.id }
            });
            if (existingCategory) {
                return res.status(400).json({ message: 'Category with this slug already exists' });
            }
        }

        const category = await ServiceCategory.findByIdAndUpdate(
            req.params.id,
            { title, slug, description, icon, image_url, order, isActive },
            { new: true, runValidators: true }
        );

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete category
const deleteCategory = async (req, res) => {
    try {
        const category = await ServiceCategory.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryBySlug,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
