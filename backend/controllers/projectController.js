const Project = require('../models/Project');
const mongoose = require('mongoose');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    const projects = await Project.find({});
    res.json(projects);
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const project = await Project.findById(req.params.id);

    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = async (req, res) => {
    const project = new Project({
        user_id: req.user._id,
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        category: req.body.category,
        status: req.body.status,
        image_url: req.body.image_url,
        progress: req.body.progress || 0,
        total_units: req.body.total_units || 0,
        sold_units: req.body.sold_units || 0,
        estimated_completion: req.body.estimated_completion,
        features: req.body.features || [],
        amenities: req.body.amenities || [],
        gallery: req.body.gallery || [],
        featured_image: req.body.featured_image,
        featured: req.body.featured || false
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        project.title = req.body.title || project.title;
        project.description = req.body.description || project.description;
        project.location = req.body.location || project.location;
        project.category = req.body.category || project.category;
        project.status = req.body.status || project.status;
        project.image_url = req.body.image_url || project.image_url;
        project.gallery = req.body.gallery || project.gallery;
        project.featured_image = req.body.featured_image || project.featured_image;
        project.featured = req.body.featured !== undefined ? req.body.featured : project.featured;
        project.progress = req.body.progress !== undefined ? req.body.progress : project.progress;
        project.total_units = req.body.total_units !== undefined ? req.body.total_units : project.total_units;
        project.sold_units = req.body.sold_units !== undefined ? req.body.sold_units : project.sold_units;
        project.estimated_completion = req.body.estimated_completion || project.estimated_completion;
        project.amenities = req.body.amenities || project.amenities;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        await project.deleteOne();
        res.json({ message: 'Project removed' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};
