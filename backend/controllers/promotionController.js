const Promotion = require('../models/Promotion');

// @desc    Get all promotions
// @route   GET /api/promotions
// @access  Public
const getPromotions = async (req, res, next) => {
    try {
        const promotions = await Promotion.find({ active: true }).sort({ createdAt: -1 });
        res.json(promotions);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Create a promotion
// @route   POST /api/promotions
// @access  Private/Admin
const createPromotion = async (req, res, next) => {
    try {
        const { title, image_url, price, original_price, discount, link, active } = req.body;

        if (!image_url) {
            res.status(400);
            return next(new Error('Image URL is required'));
        }

        const promotion = new Promotion({
            title,
            image_url,
            price,
            original_price,
            discount,
            link,
            active: active !== undefined ? active : true,
        });

        const createdPromotion = await promotion.save();
        res.status(201).json(createdPromotion);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Delete a promotion
// @route   DELETE /api/promotions/:id
// @access  Private/Admin
const deletePromotion = async (req, res, next) => {
    try {
        const promotion = await Promotion.findById(req.params.id);

        if (promotion) {
            await promotion.deleteOne();
            res.json({ message: 'Promotion removed' });
        } else {
            res.status(404);
            return next(new Error('Promotion not found'));
        }
    } catch (error) {
        res.status(500);
        next(error);
    }
};

module.exports = {
    getPromotions,
    createPromotion,
    deletePromotion,
};
