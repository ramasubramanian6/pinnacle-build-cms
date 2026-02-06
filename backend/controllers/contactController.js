const Contact = require('../models/Contact');

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Private/Admin
const asyncHandler = require('express-async-handler');

// @desc    Get all contact submissions
// @route   GET /api/contacts
// @access  Private/Admin
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
});

// @desc    Get user's contact submissions
// @route   GET /api/contacts/user
// @access  Private
const getUserContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json(contacts);
});

// @desc    Create a contact submission
// @route   POST /api/contacts
// @access  Public
const createContact = asyncHandler(async (req, res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        subject: req.body.subject,
        message: req.body.message
    });
    const createdContact = await contact.save();
    res.status(201).json(createdContact);
});

// @desc    Update contact status
// @route   PUT /api/contacts/:id
// @access  Private/Admin
const updateContactStatus = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        contact.status = req.body.status || contact.status;
        const updatedContact = await contact.save();
        res.json(updatedContact);
    } else {
        res.status(404);
        throw new Error('Contact submission not found');
    }
});

// @desc    Delete a contact submission
// @route   DELETE /api/contacts/:id
// @access  Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (contact) {
        await contact.deleteOne();
        res.json({ message: 'Contact submission removed' });
    } else {
        res.status(404);
        throw new Error('Contact submission not found');
    }
});

module.exports = {
    getContacts,
    getUserContacts,
    createContact,
    updateContactStatus,
    deleteContact,
};
