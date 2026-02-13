const mongoose = require('mongoose');

const projectCategorySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
        },
        order: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

projectCategorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectCategorySchema.set('toJSON', {
    virtuals: true
});

const ProjectCategory = mongoose.model('ProjectCategory', projectCategorySchema);

module.exports = ProjectCategory;
