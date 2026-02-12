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
        client: {
            type: String,
        },
        architect: {
            type: String,
        },
        area: {
            type: Number,
        },
        year: {
            type: Number,
        },
        cost: {
            type: String,
        },
        content: {
            type: String,
        },
        embedded_video: {
            type: String,
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
        gallery: [String],
        featured_image: {
            type: String,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        documents_count: {
            type: Number,
            default: 0
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        // --- New Fields for "Sharada" Style Redesign ---
        episodes: [{
            title: String,
            duration: String,
            thumbnail: String,
            video_url: String, // Full video URL (Youtube/Vimeo)
            isPremium: { type: Boolean, default: false }
        }],
        ebook: {
            title: String,
            pages: Number,
            images: Number,
            drawings: Number,
            size: String,
            url: String,
            image: String // Cover image for the eBook
        },
        products: [{
            category: String,
            brand: String,
            items: [String],
            isPremium: { type: Boolean, default: true }
        }],
        team: {
            principalArchitect: String,
            firm: String,
            architect_image: String,
            designTeam: [String],
            photoCredit: String,
            cinematographer: String,
            structuralConsultant: String,
            otherConsultants: [String]
        },
        extended_info: {
            plotArea: String,
            facing: String,
            vastu: String,
            rooms: Number,
            parking: Number,
            floors: Number
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
