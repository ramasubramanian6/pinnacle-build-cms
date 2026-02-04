const SliderImage = require('../models/SliderImage');

// @desc    Get all slider images
// @route   GET /api/slider-images
// @access  Public
const getSliderImages = async (req, res, next) => {
    try {
        const sliderImages = await SliderImage.find({}).sort({ order: 1, createdAt: -1 });
        res.json(sliderImages);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Create a slider image
// @route   POST /api/slider-images
// @access  Private/Admin
const createSliderImage = async (req, res, next) => {
    try {
        const { title, description, image_url, order } = req.body;

        if (!image_url) {
            res.status(400);
            return next(new Error('Image URL is required'));
        }

        const sliderImage = new SliderImage({
            title,
            description,
            image_url,
            order,
        });

        const createdSliderImage = await sliderImage.save();
        res.status(201).json(createdSliderImage);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Delete a slider image
// @route   DELETE /api/slider-images/:id
// @access  Private/Admin
const deleteSliderImage = async (req, res, next) => {
    try {
        const sliderImage = await SliderImage.findById(req.params.id);

        if (sliderImage) {
            await sliderImage.deleteOne();
            res.json({ message: 'Slider image removed' });
        } else {
            res.status(404);
            return next(new Error('Slider image not found'));
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
};

module.exports = {
    getSliderImages,
    createSliderImage,
    deleteSliderImage,
};
