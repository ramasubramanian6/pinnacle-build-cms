const express = require('express');
const router = express.Router();
const {
    getSubcategories,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
    getSubcategoryById
} = require('../controllers/projectSubcategoryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSubcategories)
    .post(protect, admin, createSubcategory);

router.route('/:id')
    .get(getSubcategoryById)
    .put(protect, admin, updateSubcategory)
    .delete(protect, admin, deleteSubcategory);

module.exports = router;
