const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        image_url: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
        },
        original_price: {
            type: Number,
        },
        discount: {
            type: String, // e.g. "20% off"
        },
        link: {
            type: String,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

promotionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

promotionSchema.set('toJSON', {
    virtuals: true,
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
