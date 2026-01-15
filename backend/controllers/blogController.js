const Blog = require('../models/Blog');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
};

// @desc    Get single blog by slug or id
// @route   GET /api/blogs/:id
// @access  Public
const getBlog = async (req, res) => {
    let blog;
    // Check if valid ObjectId
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        blog = await Blog.findById(req.params.id);
    }

    if (!blog) {
        // Try finding by slug
        blog = await Blog.findOne({ slug: req.params.id });
    }

    if (blog) {
        res.json(blog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
    const blog = new Blog(req.body);
    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        Object.assign(blog, req.body);
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404).json({ message: 'Blog not found' });
    }
};

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
};
