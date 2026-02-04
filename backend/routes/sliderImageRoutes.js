const express = require('express');
const router = express.Router();
const {
    getSliderImages,
    createSliderImage,
    deleteSliderImage,
} = require('../controllers/sliderImageController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSliderImages)
    .post(protect, admin, createSliderImage);

router.route('/:id')
    .delete(protect, admin, deleteSliderImage);

module.exports = router;
