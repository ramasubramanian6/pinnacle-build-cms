const express = require('express');
const router = express.Router();
const {
    getSubcategories,
    getSubcategoriesByCategorySlug,
    getSubcategoryBySlug,
    getSubcategoryById,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    addImage,
    deleteImage
} = require('../controllers/serviceSubcategoryController');

// Public routes
router.get('/', getSubcategories);
router.get('/category/:categorySlug', getSubcategoriesByCategorySlug);
router.get('/:categorySlug/:subcategorySlug', getSubcategoryBySlug);

// Admin routes (add authentication middleware as needed)
router.get('/id/:id', getSubcategoryById);
router.post('/', createSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);
router.post('/:id/images', addImage);
router.delete('/:id/images/:index', deleteImage);

module.exports = router;
