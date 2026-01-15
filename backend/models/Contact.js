const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        subject: {
            type: String,
        },
        message: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['new', 'in_progress', 'resolved', 'closed'],
            default: 'new',
        },
    },
    {
        timestamps: true,
    }
);

contactSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

contactSchema.set('toJSON', {
    virtuals: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
