const UserProject = require('../models/UserProject');
const Project = require('../models/Project');

// @desc    Get logged in user's projects
// @route   GET /api/user-projects
// @access  Private
const getUserProjects = async (req, res) => {
    try {
        const userProjects = await UserProject.find({ user_id: req.user._id })
            .populate('project_id'); // Populate project details

        // Transform to match frontend structure expectation: { ..., project: { ... } }
        const formatted = userProjects.map(up => ({
            _id: up._id,
            user_id: up.user_id,
            project: up.project_id, // Populated object
            status: up.status,
            next_milestone: up.next_milestone,
            next_milestone_date: up.next_milestone_date,
            documents_count: up.documents_count
        }));

        res.json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Assign user to project (Admin)
// @route   POST /api/user-projects
// @access  Private/Admin
const assignUserToProject = async (req, res) => {
    const { user_id, project_id, status, next_milestone, next_milestone_date } = req.body;

    const exists = await UserProject.findOne({ user_id, project_id });
    if (exists) {
        return res.status(400).json({ message: 'User already assigned to this project' });
    }

    const userProject = await UserProject.create({
        user_id,
        project_id,
        status,
        next_milestone,
        next_milestone_date
    });

    res.status(201).json(userProject);
};

module.exports = { getUserProjects, assignUserToProject };
