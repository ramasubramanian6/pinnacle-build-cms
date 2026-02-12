const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        features: [String],
        is_popular: {
            type: Boolean,
            default: false
        },
        cta_text: {
            type: String
        },
        cta_link: {
            type: String
        },
        order_index: {
            type: Number,
            default: 0
        },
        // Enhanced content fields
        status: {
            type: String, // e.g., "Under Construction", "Available"
            default: "Available"
        },
        details: {
            type: String, // Longer description/content
        },
        images: [String], // Array of image URLs
        // Rich content
        featuresDescription: { type: String, default: '' },
        process: [{
            title: { type: String, required: true },
            description: { type: String },
        }],
        benefits: [{
            title: { type: String, required: true },
            description: { type: String },
        }],
        faqs: [{
            question: { type: String, required: true },
            answer: { type: String, required: true },
        }]
    },
    {
        timestamps: true,
    }
);

packageSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

packageSchema.set('toJSON', {
    virtuals: true
});

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
