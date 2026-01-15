const Property = require('../models/Property');

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getProperties = async (req, res) => {
    const properties = await Property.find({}).populate('project_id', 'title');
    res.json(properties);
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
    const property = await Property.findById(req.params.id).populate('project_id', 'title');

    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Admin
const createProperty = async (req, res) => {
    const property = new Property(req.body);
    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Admin
const updateProperty = async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        Object.assign(property, req.body);
        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Admin
const deleteProperty = async (req, res) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        await property.deleteOne();
        res.json({ message: 'Property removed' });
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

module.exports = {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
};
