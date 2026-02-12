const mongoose = require('mongoose');

const serviceSubcategorySchema = mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceCategory',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: [{
            url: {
                type: String,
                required: true,
            },
            caption: {
                type: String,
                default: '',
            },
            order: {
                type: Number,
                default: 0,
            }
        }],
        features: [String],
        featuresDescription: {
            type: String, // Introductory text for the features section
            default: ''
        },
        contentHeading: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: String,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        // Enhanced content structure
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

// Compound index for category + slug uniqueness
serviceSubcategorySchema.index({ category: 1, slug: 1 }, { unique: true });

serviceSubcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceSubcategorySchema.set('toJSON', {
    virtuals: true
});

const ServiceSubcategory = mongoose.model('ServiceSubcategory', serviceSubcategorySchema);

module.exports = ServiceSubcategory;
