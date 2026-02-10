const ServiceSubcategory = require('../models/ServiceSubcategory');
const ServiceCategory = require('../models/ServiceCategory');

// Get all subcategories
const getSubcategories = async (req, res) => {
    try {
        const subcategories = await ServiceSubcategory.find({ isActive: true })
            .populate('category')
            .sort({ order: 1, createdAt: -1 });
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subcategories by category slug
const getSubcategoriesByCategorySlug = async (req, res) => {
    try {
        const category = await ServiceCategory.findOne({ slug: req.params.categorySlug });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subcategories = await ServiceSubcategory.find({
            category: category._id,
            isActive: true
        })
            .populate('category')
            .sort({ order: 1, createdAt: -1 });

        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subcategory by slug
const getSubcategoryBySlug = async (req, res) => {
    try {
        const { categorySlug, subcategorySlug } = req.params;

        const category = await ServiceCategory.findOne({ slug: categorySlug });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const subcategory = await ServiceSubcategory.findOne({
            category: category._id,
            slug: subcategorySlug,
            isActive: true
        }).populate('category');

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subcategory by ID
const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await ServiceSubcategory.findById(req.params.id)
            .populate('category');

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create subcategory
const createSubcategory = async (req, res) => {
    try {
        const {
            category,
            title,
            slug,
            shortDescription,
            description,
            images,
            features,
            content,
            metaTitle,
            metaDescription,
            order,
            isActive
        } = req.body;

        // Verify category exists
        const categoryExists = await ServiceCategory.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ message: 'Category not found' });
        }

        // Check if slug already exists for this category
        const existingSubcategory = await ServiceSubcategory.findOne({ category, slug });
        if (existingSubcategory) {
            return res.status(400).json({ message: 'Subcategory with this slug already exists in this category' });
        }

        const subcategory = new ServiceSubcategory({
            category,
            title,
            slug,
            shortDescription,
            description,
            images: images || [],
            features: features || [],
            content,
            metaTitle,
            metaDescription,
            order,
            isActive
        });

        const savedSubcategory = await subcategory.save();
        const populatedSubcategory = await ServiceSubcategory.findById(savedSubcategory._id)
            .populate('category');

        res.status(201).json(populatedSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update subcategory
const updateSubcategory = async (req, res) => {
    try {
        const {
            category,
            title,
            slug,
            shortDescription,
            description,
            images,
            features,
            content,
            metaTitle,
            metaDescription,
            order,
            isActive
        } = req.body;

        // If category is being changed, verify it exists
        if (category) {
            const categoryExists = await ServiceCategory.findById(category);
            if (!categoryExists) {
                return res.status(400).json({ message: 'Category not found' });
            }
        }

        // Check if slug is being changed and if it conflicts
        if (slug && category) {
            const existingSubcategory = await ServiceSubcategory.findOne({
                category,
                slug,
                _id: { $ne: req.params.id }
            });
            if (existingSubcategory) {
                return res.status(400).json({ message: 'Subcategory with this slug already exists in this category' });
            }
        }

        const subcategory = await ServiceSubcategory.findByIdAndUpdate(
            req.params.id,
            {
                category,
                title,
                slug,
                shortDescription,
                description,
                images,
                features,
                content,
                metaTitle,
                metaDescription,
                order,
                isActive
            },
            { new: true, runValidators: true }
        ).populate('category');

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json(subcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete subcategory
const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await ServiceSubcategory.findByIdAndDelete(req.params.id);

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.json({ message: 'Subcategory deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add image to subcategory
const addImage = async (req, res) => {
    try {
        const { url, caption, order } = req.body;

        const subcategory = await ServiceSubcategory.findById(req.params.id);

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        subcategory.images.push({ url, caption, order: order || subcategory.images.length });
        await subcategory.save();

        const updatedSubcategory = await ServiceSubcategory.findById(subcategory._id)
            .populate('category');

        res.json(updatedSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete image from subcategory
const deleteImage = async (req, res) => {
    try {
        const { index } = req.params;

        const subcategory = await ServiceSubcategory.findById(req.params.id);

        if (!subcategory) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        if (index < 0 || index >= subcategory.images.length) {
            return res.status(400).json({ message: 'Invalid image index' });
        }

        subcategory.images.splice(index, 1);
        await subcategory.save();

        const updatedSubcategory = await ServiceSubcategory.findById(subcategory._id)
            .populate('category');

        res.json(updatedSubcategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSubcategories,
    getSubcategoriesByCategorySlug,
    getSubcategoryBySlug,
    getSubcategoryById,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    addImage,
    deleteImage
};
