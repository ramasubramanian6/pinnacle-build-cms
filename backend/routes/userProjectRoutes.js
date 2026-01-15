const express = require('express');
const router = express.Router();
const { getUserProjects, assignUserToProject } = require('../controllers/userProjectController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getUserProjects)
    .post(protect, admin, assignUserToProject);

module.exports = router;
