const mongoose = require('mongoose');

const propertySchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        property_type: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            default: 'Available',
        },
        price: {
            type: Number,
            required: true,
        },
        area_sqft: {
            type: Number,
            required: true,
        },
        bedrooms: {
            type: Number,
        },
        bathrooms: {
            type: Number,
        },
        location: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        image_url: {
            type: String,
        },
        dimensions: {
            type: String,
        },
        facing: {
            type: String,
        },
        zoning: {
            type: String,
        },
        amenities: [String],
        featured: {
            type: Boolean,
            default: false,
        },
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }
    },
    {
        timestamps: true,
    }
);

propertySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

propertySchema.set('toJSON', {
    virtuals: true
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
