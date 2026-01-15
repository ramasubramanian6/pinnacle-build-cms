const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            default: 5,
        },
        avatar_url: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
);

testimonialSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

testimonialSchema.set('toJSON', {
    virtuals: true
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
