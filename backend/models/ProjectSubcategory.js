const mongoose = require('mongoose');

const projectSubcategorySchema = mongoose.Schema(
    {
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProjectCategory',
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
            type: String, // Brief summary for cards
            required: true,
        },
        description: {
            type: String, // Full detailed description
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
        // Enhanced content structure (mirrors Project model capabilities if needed)
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
projectSubcategorySchema.index({ category: 1, slug: 1 }, { unique: true });

projectSubcategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectSubcategorySchema.set('toJSON', {
    virtuals: true
});

const ProjectSubcategory = mongoose.model('ProjectSubcategory', projectSubcategorySchema);

module.exports = ProjectSubcategory;
