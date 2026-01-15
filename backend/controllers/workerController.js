const Worker = require('../models/Worker');

// @desc    Get all workers
// @route   GET /api/workers
// @access  Public
const getWorkers = async (req, res) => {
    const workers = await Worker.find({}).sort({ order_index: 1 });
    res.json(workers);
};

// @desc    Create a worker
// @route   POST /api/workers
// @access  Private/Admin
const createWorker = async (req, res) => {
    const worker = new Worker(req.body);
    const createdWorker = await worker.save();
    res.status(201).json(createdWorker);
};

// @desc    Update a worker
// @route   PUT /api/workers/:id
// @access  Private/Admin
const updateWorker = async (req, res) => {
    const worker = await Worker.findById(req.params.id);

    if (worker) {
        Object.assign(worker, req.body);
        const updatedWorker = await worker.save();
        res.json(updatedWorker);
    } else {
        res.status(404).json({ message: 'Worker not found' });
    }
};

// @desc    Delete a worker
// @route   DELETE /api/workers/:id
// @access  Private/Admin
const deleteWorker = async (req, res) => {
    const worker = await Worker.findById(req.params.id);

    if (worker) {
        await worker.deleteOne();
        res.json({ message: 'Worker removed' });
    } else {
        res.status(404).json({ message: 'Worker not found' });
    }
};

module.exports = {
    getWorkers,
    createWorker,
    updateWorker,
    deleteWorker,
};
