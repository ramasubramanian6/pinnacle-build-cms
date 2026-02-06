const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = require('express-async-handler')(async (req, res) => {
    const { email, password } = req.body;

    console.log(`Login attempt for: ${email}`);

    const user = await User.findOne({ email });

    if (!user) {
        console.log(`Login failed for: ${email} - User not found`);
        res.status(401);
        throw new Error('Invalid email or password');
    }

    if (await user.matchPassword(password)) {
        console.log(`Login success for: ${email}, Role: ${user.role}`);
        // Set cookie
        res.cookie('jwt', generateToken(user._id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            avatarUrl: user.avatarUrl,
            token: generateToken(user._id),
        });
    } else {
        console.log(`Login failed for: ${email} - Password mismatch`);
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = require('express-async-handler')(async (req, res) => {
    const { fullName, email, password, otp, phone } = req.body;

    console.log(`Registering user: ${email}, ${fullName}, Phone: ${phone}`);

    if (!fullName || !email || !password || !otp) {
        res.status(400);
        throw new Error('Please add all fields including OTP');
    }

    // Verify OTP
    const Otp = require('../models/Otp');
    const otpRecord = await Otp.findOne({ email, otp });

    if (!otpRecord) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Check if phone already exists
    if (phone) {
        const phoneExists = await User.findOne({ phone });
        if (phoneExists) {
            res.status(400);
            throw new Error('Phone number already in use');
        }
    }

    // Check if it's the specific admin email
    const role = email === 'admin@brixxspace.com' ? 'admin' : 'user';

    const user = await User.create({
        fullName,
        email,
        password,
        role,
        phone
    });

    if (user) {
        // Delete OTP after successful registration
        await Otp.deleteMany({ email });

        console.log(`User created: ${user._id}`);
        // Set cookie
        res.cookie('jwt', generateToken(user._id), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
            phone: user.phone,
            company: user.company,
            avatarUrl: user.avatarUrl,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.fullName = req.body.fullName || user.fullName;
        user.phone = req.body.phone || user.phone;
        user.company = req.body.company || user.company;
        user.avatarUrl = req.body.avatarUrl || user.avatarUrl;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            email: updatedUser.email,
            role: updatedUser.role,
            phone: updatedUser.phone,
            company: updatedUser.company,
            avatarUrl: updatedUser.avatarUrl,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = require('express-async-handler')(async (req, res) => {
    const { email, otp, password } = req.body;

    if (!email || !otp || !password) {
        res.status(400);
        throw new Error('Please provide email, OTP, and new password');
    }

    // Verify OTP again (SECURITY)
    const Otp = require('../models/Otp');
    const record = await Otp.findOne({ email, otp });

    if (!record) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Update password
    user.password = password;
    await user.save();

    // Clear OTP
    await Otp.deleteMany({ email });

    res.status(200).json({ message: 'Password reset successfully' });
});

module.exports = { authUser, registerUser, getUserProfile, updateUserProfile, logoutUser, resetPassword };
