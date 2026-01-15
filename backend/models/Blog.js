const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
        },
        content: {
            type: String,
        },
        author: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        read_time: {
            type: String,
        },
        category: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        image_url: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

blogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

blogSchema.set('toJSON', {
    virtuals: true
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
