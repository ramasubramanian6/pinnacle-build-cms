const express = require('express');
const router = express.Router();
const {
    getWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
} = require('../controllers/workerController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getWorkers)
    .post(protect, admin, createWorker);

router.route('/:id')
    .put(protect, admin, updateWorker)
    .delete(protect, admin, deleteWorker);

module.exports = router;
