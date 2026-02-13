const ProjectCategory = require('../models/ProjectCategory');

// @desc    Get all project categories
// @route   GET /api/project-categories
// @access  Public
const getCategories = async (req, res) => {
    try {
        const categories = await ProjectCategory.find({}).sort({ order: 1, createdAt: 1 });
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project category
// @route   GET /api/project-categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
    try {
        const category = await ProjectCategory.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project category
// @route   POST /api/project-categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    try {
        const category = new ProjectCategory(req.body);
        const createdCategory = await category.save();
        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a project category
// @route   PUT /api/project-categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
    try {
        const category = await ProjectCategory.findById(req.params.id);

        if (category) {
            Object.assign(category, req.body);
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project category
// @route   DELETE /api/project-categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
    try {
        const category = await ProjectCategory.findById(req.params.id);

        if (category) {
            await category.deleteOne();
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};
