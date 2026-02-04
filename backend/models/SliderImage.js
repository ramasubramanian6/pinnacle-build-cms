const mongoose = require('mongoose');

const sliderImageSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        image_url: {
            type: String,
            required: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

sliderImageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

sliderImageSchema.set('toJSON', {
    virtuals: true,
});

const SliderImage = mongoose.model('SliderImage', sliderImageSchema);

module.exports = SliderImage;
