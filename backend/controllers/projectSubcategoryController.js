const ProjectSubcategory = require('../models/ProjectSubcategory');

// @desc    Get all project subcategories
// @route   GET /api/project-subcategories
// @access  Public
const getSubcategories = async (req, res) => {
    try {
        const query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }

        const subcategories = await ProjectSubcategory.find(query)
            .populate('category', 'title slug')
            .sort({ order: 1, createdAt: 1 });
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single project subcategory
// @route   GET /api/project-subcategories/:id
// @access  Public
const getSubcategoryById = async (req, res) => {
    try {
        const subcategory = await ProjectSubcategory.findById(req.params.id).populate('category');
        if (subcategory) {
            res.json(subcategory);
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project subcategory
// @route   POST /api/project-subcategories
// @access  Private/Admin
const createSubcategory = async (req, res) => {
    try {
        const subcategory = new ProjectSubcategory(req.body);
        const createdSubcategory = await subcategory.save();
        res.status(201).json(createdSubcategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a project subcategory
// @route   PUT /api/project-subcategories/:id
// @access  Private/Admin
const updateSubcategory = async (req, res) => {
    try {
        const subcategory = await ProjectSubcategory.findById(req.params.id);

        if (subcategory) {
            Object.assign(subcategory, req.body);
            const updatedSubcategory = await subcategory.save();
            res.json(updatedSubcategory);
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a project subcategory
// @route   DELETE /api/project-subcategories/:id
// @access  Private/Admin
const deleteSubcategory = async (req, res) => {
    try {
        const subcategory = await ProjectSubcategory.findById(req.params.id);

        if (subcategory) {
            await subcategory.deleteOne();
            res.json({ message: 'Subcategory removed' });
        } else {
            res.status(404).json({ message: 'Subcategory not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSubcategories,
    getSubcategoryById,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
};
