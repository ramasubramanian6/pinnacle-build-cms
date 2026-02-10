const express = require('express');
const router = express.Router();
const {
    getCategories,
    getCategoryBySlug,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/serviceCategoryController');

// Public routes
router.get('/', getCategories);
router.get('/slug/:slug', getCategoryBySlug);

// Admin routes (add authentication middleware as needed)
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
