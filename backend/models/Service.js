const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
        features: [String],
        image_url: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

serviceSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

serviceSchema.set('toJSON', {
    virtuals: true
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
