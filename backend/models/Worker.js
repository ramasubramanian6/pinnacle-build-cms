const mongoose = require('mongoose');

const workerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        image_url: {
            type: String,
        },
        bio: {
            type: String,
        },
        social_links: {
            type: Map,
            of: String
        },
        order_index: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

workerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

workerSchema.set('toJSON', {
    virtuals: true
});

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;
