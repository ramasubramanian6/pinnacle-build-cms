const express = require('express');
const router = express.Router();
const {
    getContacts,
    getUserContacts,
    createContact,
    updateContactStatus,
    deleteContact,
} = require('../controllers/contactController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getContacts)
    .post(createContact);

router.route('/user')
    .get(protect, getUserContacts);

router.route('/:id')
    .put(protect, admin, updateContactStatus)
    .delete(protect, admin, deleteContact);

module.exports = router;
