const mongoose = require('mongoose');

const userProjectSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        project_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true,
        },
        status: {
            type: String,
            default: 'ongoing'
        },
        next_milestone: {
            type: String
        },
        next_milestone_date: {
            type: Date
        },
        documents_count: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

const UserProject = mongoose.model('UserProject', userProjectSchema);

module.exports = UserProject;
