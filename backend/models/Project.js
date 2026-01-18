const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['ongoing', 'completed', 'upcoming'],
            default: 'ongoing',
        },
        image_url: {
            type: String,
        },
        progress: {
            type: Number,
            default: 0,
        },
        total_units: {
            type: Number,
        },
        sold_units: {
            type: Number,
        },
        estimated_completion: {
            type: Date,
        },
        start_date: {
            type: Date,
        },
        features: [String],
        amenities: [String],
        documents_count: {
            type: Number,
            default: 0
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
);

// Virtual for id to match frontend expectation
projectSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

projectSchema.set('toJSON', {
    virtuals: true
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
